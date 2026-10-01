import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { infer } from "../src/index.ts";
import { type Signal, signalSchema } from "../src/types.ts";
import {
  check,
  closed,
  config,
  merged,
  prOpened,
  push,
  ready,
  reopened,
  review,
  reviewRequested,
  synchronized,
  t,
  toDraft,
} from "./builders.ts";

const SHAS = ["aaaaaaa", "bbbbbbb", "ccccccc"] as const;

/** Generates plausible event histories for one stream (PR #1 and #2 on the same branch). */
const historyArb = fc
  .array(
    fc.tuple(
      fc.integer({ min: 0, max: 7_000 }),
      fc.integer({ min: 0, max: 11 }),
      fc.constantFrom(...SHAS),
      fc.constantFrom(1, 2),
      fc.constantFrom("bob", "carol"),
    ),
    { minLength: 1, maxLength: 25 },
  )
  .map((steps) =>
    steps.map(([minute, k, sha, n, who]): Signal => {
      const when = t(minute);
      switch (k) {
        case 0:
          return push(when, sha);
        case 1:
          return prOpened(when, n, { headSha: sha, draft: minute % 2 === 0 });
        case 2:
          return ready(when, n);
        case 3:
          return toDraft(when, n);
        case 4:
          return reviewRequested(when, n, who);
        case 5:
          return review(when, n, who, "approved");
        case 6:
          return review(when, n, who, "changes_requested");
        case 7:
          return check(when, sha, minute % 3 === 0 ? "failure" : "success");
        case 8:
          return synchronized(when, n, sha);
        case 9:
          return merged(when, n);
        case 10:
          return closed(when, n);
        default:
          return reopened(when, n);
      }
    }),
  );

const now = t(20_000);
const withoutEvidence = ({ evidenceIds: _, ...rest }: ReturnType<typeof infer>) => rest;

describe("engine properties", () => {
  it("is invariant to input order", () => {
    fc.assert(
      fc.property(historyArb, fc.integer(), (signals, seed) => {
        const shuffled = fc.sample(fc.shuffledSubarray(signals, { minLength: signals.length }), {
          numRuns: 1,
          seed,
        })[0] as Signal[];
        expect(infer(shuffled, [], config, now)).toEqual(infer(signals, [], config, now));
      }),
      { numRuns: 500 },
    );
  });

  it("is invariant to redelivered duplicates (same external id)", () => {
    fc.assert(
      fc.property(historyArb, (signals) => {
        const dupes = signals.map((s) => ({ ...s, id: `${s.id}-dup` }));
        const a = infer(signals, [], config, now);
        const b = infer([...signals, ...dupes], [], config, now);
        expect(withoutEvidence(b)).toEqual(withoutEvidence(a));
      }),
      { numRuns: 500 },
    );
  });

  it("always cites evidence drawn from its input", () => {
    fc.assert(
      fc.property(historyArb, (signals) => {
        const s = infer(signals, [], config, now);
        const ids = new Set(signals.map((x) => x.id));
        expect(s.evidenceIds.length).toBeGreaterThan(0);
        for (const id of s.evidenceIds) expect(ids.has(id)).toBe(true);
      }),
      { numRuns: 500 },
    );
  });

  it("builder signals satisfy the public schema", () => {
    fc.assert(
      fc.property(historyArb, (signals) => {
        for (const s of signals) expect(signalSchema.safeParse(s).success).toBe(true);
      }),
      { numRuns: 100 },
    );
  });

  it("treats a push and a PR synchronize of the same commit as one fact", () => {
    const a = infer([prOpened(t(0), 1), push(t(10), "bbbbbbb")], [], config, now);
    const b = infer(
      [prOpened(t(0), 1), push(t(10), "bbbbbbb"), synchronized(t(10), 1, "bbbbbbb")],
      [],
      config,
      now,
    );
    expect(withoutEvidence(b)).toEqual(withoutEvidence(a));
  });
});
