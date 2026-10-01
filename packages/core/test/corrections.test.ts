import { describe, expect, it } from "vitest";
import { infer } from "../src/index.ts";
import type { Correction } from "../src/types.ts";
import { config, correction, prOpened, push, reviewRequested, t } from "./builders.ts";

const now = t(600);
const awaiting = () => [prOpened(t(0), 1), reviewRequested(t(10), 1, "bob")];

describe("corrections", () => {
  it("an attention correction overrides inference while no newer signal exists", () => {
    const c = correction<Correction>({ field: "attention", value: "none", createdAt: t(30) });
    const s = infer(awaiting(), [c], config, now);
    expect(s.attention).toBe("none");
    expect(s.correctedBy).toBe(c.id);
    expect(s.reasonCode).toBe("corrected");
    expect(s.evidenceIds.length).toBeGreaterThan(0);
  });

  it("a signal received after the correction resumes inference", () => {
    const c = correction<Correction>({ field: "attention", value: "none", createdAt: t(30) });
    const s = infer([...awaiting(), push(t(40), "bbbbbbb")], [c], config, now);
    expect(s.correctedBy).toBeNull();
    expect(s.attention).toBe("awaiting_review");
  });

  it("uses our receive time, not the source time: a late delivery also resumes inference", () => {
    const c = correction<Correction>({ field: "attention", value: "none", createdAt: t(30) });
    const late = push(t(20), "bbbbbbb");
    late.receivedAt = t(45);
    const s = infer([...awaiting(), late], [c], config, now);
    expect(s.correctedBy).toBeNull();
  });

  it("a phase correction overrides the phase", () => {
    const c = correction<Correction>({ field: "phase", value: "merged", createdAt: t(30) });
    const s = infer(awaiting(), [c], config, now);
    expect(s.phase).toBe("merged");
    expect(s.correctedBy).toBe(c.id);
  });

  it("the latest correction per field wins", () => {
    const first = correction<Correction>({ field: "attention", value: "none", createdAt: t(30) });
    const second = correction<Correction>({ field: "attention", value: "stale", createdAt: t(31) });
    const s = infer(awaiting(), [second, first], config, now);
    expect(s.attention).toBe("stale");
    expect(s.correctedBy).toBe(second.id);
  });

  it("not_work is sticky across new activity and can be undone", () => {
    const hide = correction<Correction>({ field: "not_work", value: true, createdAt: t(30) });
    const signals = [...awaiting(), push(t(40), "bbbbbbb")];
    expect(infer(signals, [hide], config, now).hidden).toBe(true);

    const unhide = correction<Correction>({ field: "not_work", value: false, createdAt: t(50) });
    expect(infer(signals, [hide, unhide], config, now).hidden).toBe(false);
  });

  it("merge_into does not change the computed state (handled by the pipeline)", () => {
    const m = correction<Correction>({ field: "merge_into", value: "stream-2", createdAt: t(30) });
    const signals = awaiting();
    const without = infer(signals, [], config, now);
    const withMerge = infer(signals, [m], config, now);
    expect(withMerge).toEqual(without);
  });
});
