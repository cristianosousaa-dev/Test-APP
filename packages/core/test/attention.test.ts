import { describe, expect, it } from "vitest";
import { infer } from "../src/index.ts";
import {
  at,
  check,
  config,
  prOpened,
  push,
  ready,
  requestRemoved,
  review,
  reviewRequested,
  synchronized,
  t,
} from "./builders.ts";

const now = t(120);

describe("awaiting review", () => {
  it("waits on requested reviewers and cites the request", () => {
    const r = reviewRequested(t(10), 1, "bob");
    const s = infer([prOpened(t(0), 1), r], [], config, now);
    expect(s.attention).toBe("awaiting_review");
    expect(s.waitingOn).toEqual(["bob"]);
    expect(s.reasonCode).toBe("awaiting_requested_review");
    expect(s.reasonText).toBe("Waiting on @bob for review");
    expect(s.evidenceIds).toContain(r.id);
    expect(s.stateSince).toEqual(t(10));
  });

  it("a reviewer who approves is no longer waited on; an approved PR needs no attention", () => {
    const s = infer(
      [prOpened(t(0), 1), reviewRequested(t(10), 1, "bob"), review(t(20), 1, "bob", "approved")],
      [],
      config,
      now,
    );
    expect(s.attention).toBe("none");
    expect(s.reasonCode).toBe("approved");
    expect(s.waitingOn).toEqual([]);
  });

  it("with no reviewer requested and no review, waits for anyone", () => {
    const s = infer(
      [prOpened(t(0), 1), reviewRequested(t(10), 1, "bob"), requestRemoved(t(15), 1, "bob")],
      [],
      config,
      now,
    );
    expect(s.attention).toBe("awaiting_review");
    expect(s.reasonCode).toBe("awaiting_any_review");
    expect(s.waitingOn).toEqual([]);
  });

  it("a draft PR never awaits review", () => {
    const s = infer([prOpened(t(0), 1, { draft: true })], [], config, now);
    expect(s.attention).toBe("none");
  });

  it("stateSince is when the PR became ready, if later than the request", () => {
    const s = infer(
      [prOpened(t(0), 1, { draft: true }), reviewRequested(t(5), 1, "bob"), ready(t(30), 1)],
      [],
      config,
      now,
    );
    expect(s.attention).toBe("awaiting_review");
    expect(s.stateSince).toEqual(t(30));
  });
});

describe("changes requested", () => {
  it("waits on the author and cites the review", () => {
    const rv = review(t(20), 1, "bob", "changes_requested");
    const s = infer([prOpened(t(0), 1), rv], [], config, now);
    expect(s.attention).toBe("changes_requested");
    expect(s.waitingOn).toEqual(["alice"]);
    expect(s.evidenceIds).toEqual([rv.id]);
    expect(s.reasonText).toBe("@bob requested changes");
  });

  it("after the author pushes, the ball returns to the reviewer", () => {
    const s = infer(
      [
        prOpened(t(0), 1),
        review(t(20), 1, "bob", "changes_requested"),
        synchronized(t(40), 1, "bbbbbbb"),
      ],
      [],
      config,
      now,
    );
    expect(s.attention).toBe("awaiting_review");
    expect(s.waitingOn).toEqual(["bob"]);
  });

  it("a later comment does not clear the verdict", () => {
    const s = infer(
      [
        prOpened(t(0), 1),
        review(t(20), 1, "bob", "changes_requested"),
        review(t(25), 1, "bob", "commented"),
      ],
      [],
      config,
      now,
    );
    expect(s.attention).toBe("changes_requested");
  });

  it("a dismissed review clears the verdict", () => {
    const s = infer(
      [
        prOpened(t(0), 1),
        review(t(20), 1, "bob", "changes_requested"),
        review(t(25), 1, "bob", "dismissed"),
      ],
      [],
      config,
      now,
    );
    expect(s.attention).toBe("awaiting_review");
    expect(s.reasonCode).toBe("awaiting_any_review");
  });
});

describe("CI", () => {
  it("a failing check on the head commit waits on the author, above changes requested", () => {
    const c = check(t(30), "aaaaaaa", "failure");
    const s = infer(
      [prOpened(t(0), 1), review(t(20), 1, "bob", "changes_requested"), c],
      [],
      config,
      now,
    );
    expect(s.attention).toBe("ci_failing");
    expect(s.waitingOn).toEqual(["alice"]);
    expect(s.evidenceIds).toEqual([c.id]);
    expect(s.reasonText).toBe("CI failing: ci");
  });

  it("ignores failures on a commit that is no longer the head (force-push)", () => {
    const s = infer(
      [
        prOpened(t(0), 1),
        check(t(10), "aaaaaaa", "failure"),
        push(t(20), "bbbbbbb", "alice", true),
      ],
      [],
      config,
      now,
    );
    expect(s.attention).not.toBe("ci_failing");
  });

  it("a re-run that succeeds clears the failure for that context", () => {
    const s = infer(
      [prOpened(t(0), 1), check(t(10), "aaaaaaa", "failure"), check(t(20), "aaaaaaa", "success")],
      [],
      config,
      now,
    );
    expect(s.attention).not.toBe("ci_failing");
  });

  it("reports only failing contexts as evidence", () => {
    const bad = check(t(10), "aaaaaaa", "failure", "lint");
    const s = infer(
      [prOpened(t(0), 1), bad, check(t(11), "aaaaaaa", "success", "test")],
      [],
      config,
      now,
    );
    expect(s.evidenceIds).toEqual([bad.id]);
    expect(s.reasonText).toBe("CI failing: lint");
  });

  it("treats timed_out as failing and cancelled/pending as not failing", () => {
    const base = [prOpened(t(0), 1)];
    expect(infer([...base, check(t(5), "aaaaaaa", "timed_out")], [], config, now).attention).toBe(
      "ci_failing",
    );
    expect(
      infer([...base, check(t(5), "aaaaaaa", "cancelled")], [], config, now).attention,
    ).not.toBe("ci_failing");
    expect(infer([...base, check(t(5), "aaaaaaa", "pending")], [], config, now).attention).not.toBe(
      "ci_failing",
    );
  });

  it("matches a check to its commit even when it occurred before the push", () => {
    const s = infer(
      [push(t(0), "aaaaaaa"), check(t(5), "bbbbbbb", "failure"), push(t(10), "bbbbbbb")],
      [],
      config,
      now,
    );
    expect(s.attention).toBe("ci_failing");
  });
});

describe("staleness (business days, workspace timezone)", () => {
  // MONDAY = 2026-09-28 09:00 Lisbon. 3 business days later = Thursday 09:00.
  it("becomes stale exactly after N business days and says when", () => {
    const signals = [push(t(0), "aaaaaaa")];
    const before = infer(signals, [], config, at("2026-10-01T07:59:00Z"));
    expect(before.attention).toBe("none");
    expect(before.revalidateAt).toEqual(at("2026-10-01T08:00:00Z"));

    const after = infer(signals, [], config, at("2026-10-01T08:00:00Z"));
    expect(after.attention).toBe("stale");
    expect(after.waitingOn).toEqual(["alice"]);
    expect(after.stateSince).toEqual(at("2026-10-01T08:00:00Z"));
    expect(after.revalidateAt).toBeNull();
  });

  it("skips weekends: Friday activity becomes stale on Wednesday", () => {
    const friday = at("2026-10-02T09:00:00Z"); // 10:00 Lisbon
    const s = infer([push(friday, "aaaaaaa")], [], config, at("2026-10-06T09:00:00Z"));
    expect(s.attention).toBe("none");
    expect(s.revalidateAt).toEqual(at("2026-10-07T09:00:00Z"));
  });

  it("keeps local time across the DST change (Lisbon, 25 Oct 2026)", () => {
    const friday = at("2026-10-23T09:00:00Z"); // 10:00 WEST
    const s = infer([push(friday, "aaaaaaa")], [], config, at("2026-10-23T12:00:00Z"));
    expect(s.revalidateAt).toEqual(at("2026-10-28T10:00:00Z")); // 10:00 WET
  });

  it("an old review request stays awaiting_review instead of stale", () => {
    const s = infer(
      [prOpened(t(0), 1), reviewRequested(t(1), 1, "bob")],
      [],
      config,
      at("2026-10-09T08:00:00Z"),
    );
    expect(s.attention).toBe("awaiting_review");
    expect(s.revalidateAt).toBeNull();
  });
});
