import { describe, expect, it } from "vitest";
import { infer } from "../src/index.ts";
import {
  branchDeleted,
  closed,
  config,
  edited,
  merged,
  prOpened,
  push,
  ready,
  reopened,
  t,
  toDraft,
} from "./builders.ts";

const now = t(60);

describe("phase", () => {
  it("a pushed branch without a PR is building, with the push as evidence", () => {
    const p = push(t(0), "aaaaaaa");
    const s = infer([p], [], config, now);
    expect(s.phase).toBe("building");
    expect(s.attention).toBe("none");
    expect(s.reasonCode).toBe("in_progress");
    expect(s.evidenceIds).toEqual([p.id]);
    expect(s.author).toBe("alice");
    expect(s.prNumbers).toEqual([]);
  });

  it("a draft PR is building with reason draft", () => {
    const o = prOpened(t(0), 1, { draft: true });
    const s = infer([push(t(-5), "aaaaaaa"), o], [], config, now);
    expect(s.phase).toBe("building");
    expect(s.reasonCode).toBe("draft");
    expect(s.evidenceIds).toContain(o.id);
    expect(s.prNumbers).toEqual([1]);
  });

  it("a ready PR is in review", () => {
    const s = infer([prOpened(t(0), 1)], [], config, now);
    expect(s.phase).toBe("review");
  });

  it("follows draft → ready → draft transitions", () => {
    const signals = [prOpened(t(0), 1, { draft: true }), ready(t(10), 1)];
    expect(infer(signals, [], config, now).phase).toBe("review");
    expect(infer([...signals, toDraft(t(20), 1)], [], config, now).phase).toBe("building");
  });

  it("a merged PR is merged, cites the merge, and needs no attention", () => {
    const m = merged(t(30), 1);
    const s = infer([prOpened(t(0), 1), m], [], config, now);
    expect(s.phase).toBe("merged");
    expect(s.attention).toBe("none");
    expect(s.reasonCode).toBe("merged");
    expect(s.evidenceIds).toEqual([m.id]);
    expect(s.prNumbers).toEqual([1]);
    expect(s.revalidateAt).toBeNull();
  });

  it("a closed PR is closed; reopening returns it to review", () => {
    const signals = [prOpened(t(0), 1), closed(t(10), 1)];
    expect(infer(signals, [], config, now).phase).toBe("closed");
    expect(infer([...signals, reopened(t(20), 1)], [], config, now).phase).toBe("review");
  });

  it("a new PR on the same branch after a merge is in review", () => {
    const s = infer(
      [prOpened(t(0), 1), merged(t(10), 1), push(t(20), "bbbbbbb"), prOpened(t(30), 2)],
      [],
      config,
      now,
    );
    expect(s.phase).toBe("review");
    expect(s.prNumbers).toEqual([2]);
  });

  it("a push after a merge without a new PR is building again", () => {
    const s = infer([prOpened(t(0), 1), merged(t(10), 1), push(t(20), "bbbbbbb")], [], config, now);
    expect(s.phase).toBe("building");
  });

  it("two open PRs from one branch: review wins over draft, both are listed", () => {
    const s = infer(
      [prOpened(t(0), 2, { draft: true, baseRef: "release" }), prOpened(t(5), 1)],
      [],
      config,
      now,
    );
    expect(s.phase).toBe("review");
    expect(s.prNumbers).toEqual([1, 2]);
  });

  it("a deleted branch with no PR is closed", () => {
    const s = infer([push(t(0), "aaaaaaa"), branchDeleted(t(10))], [], config, now);
    expect(s.phase).toBe("closed");
  });
});

describe("title, ticket key and author", () => {
  it("humanizes the branch when there is no PR and extracts the ticket key", () => {
    const s = infer([push(t(0), "aaaaaaa")], [], config, now);
    expect(s.title).toBe("Login");
    expect(s.ticketKey).toBe("ABC-123");
  });

  it("uses the latest PR title, including edits", () => {
    const s = infer(
      [prOpened(t(0), 1, { title: "WIP" }), edited(t(5), 1, "Sign in with GitHub")],
      [],
      config,
      now,
    );
    expect(s.title).toBe("Sign in with GitHub");
  });

  it("the author is the PR author, not the last pusher", () => {
    const s = infer(
      [prOpened(t(0), 1, { author: "carol" }), push(t(5), "bbbbbbb", "dave")],
      [],
      config,
      now,
    );
    expect(s.author).toBe("carol");
  });
});

describe("input validation", () => {
  it("throws on an empty signal list (a stream always has signals)", () => {
    expect(() => infer([], [], config, now)).toThrow(/at least one signal/);
  });
});
