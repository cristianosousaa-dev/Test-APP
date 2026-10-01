import type { CheckConclusion, Signal } from "./types.ts";

export interface Mark {
  at: Date;
  id: string;
}

export interface Verdict extends Mark {
  state: "approved" | "changes_requested";
}

export interface PrSnapshot {
  number: number;
  title: string;
  author: string | null;
  open: boolean;
  draft: boolean;
  merged: boolean;
  openedAt: Date;
  closedAt: Date | null;
  /** The signal that last changed open/draft/merged state. */
  stateMark: Mark;
  /** When the PR last became ready for review. */
  readyAt: Date | null;
  requested: Map<string, Mark>;
  verdicts: Map<string, Verdict>;
}

export interface CheckResult extends Mark {
  conclusion: CheckConclusion;
}

export interface Snapshot {
  branch: string | null;
  prs: Map<number, PrSnapshot>;
  head: { sha: string; at: Date } | null;
  /** Latest push or PR synchronize. */
  lastPush: Mark | null;
  firstPusher: string | null;
  /** checks[sha][context] = latest result. */
  checks: Map<string, Map<string, CheckResult>>;
  branchDeleted: Mark | null;
  /** Latest human activity (everything except CI results). */
  lastActivity: Mark;
}

function stubPr(n: number, s: Signal, draft: boolean): PrSnapshot {
  const mark = { at: s.occurredAt, id: s.id };
  return {
    number: n,
    title: "",
    author: s.actor,
    open: true,
    draft,
    merged: false,
    openedAt: s.occurredAt,
    closedAt: null,
    stateMark: mark,
    readyAt: draft ? null : s.occurredAt,
    requested: new Map(),
    verdicts: new Map(),
  };
}

export function emptySnapshot(first: Signal): Snapshot {
  return {
    branch: null,
    prs: new Map(),
    head: null,
    lastPush: null,
    firstPusher: null,
    checks: new Map(),
    branchDeleted: null,
    lastActivity: { at: first.occurredAt, id: first.id },
  };
}

function prFor(snap: Snapshot, s: Signal, draftIfNew: boolean): PrSnapshot | null {
  const n = s.refs.prNumber;
  if (n === undefined) return null;
  let pr = snap.prs.get(n);
  if (!pr) {
    // Events for a PR whose opening we never saw (e.g. outside the backfill window).
    pr = stubPr(n, s, draftIfNew);
    snap.prs.set(n, pr);
  }
  return pr;
}

function moveHead(snap: Snapshot, sha: string, s: Signal): void {
  snap.head = { sha, at: s.occurredAt };
  snap.lastPush = { at: s.occurredAt, id: s.id };
  if (snap.firstPusher === null) snap.firstPusher = s.actor;
}

/** Applies one signal (in normalized order) to the snapshot. Mutates `snap`. */
export function apply(snap: Snapshot, s: Signal): void {
  const mark: Mark = { at: s.occurredAt, id: s.id };
  if (snap.branch === null && s.refs.branch) snap.branch = s.refs.branch;
  if (s.kind !== "check_completed") snap.lastActivity = mark;

  switch (s.kind) {
    case "branch_pushed":
      moveHead(snap, s.data.headSha, s);
      return;
    case "pr_synchronized": {
      prFor(snap, s, false);
      moveHead(snap, s.data.headSha, s);
      return;
    }
    case "branch_deleted":
      snap.branchDeleted = mark;
      return;
    case "pr_opened": {
      const n = s.refs.prNumber;
      if (n === undefined) return;
      const pr = snap.prs.get(n) ?? stubPr(n, s, s.data.draft);
      pr.title = s.data.title;
      pr.author = s.data.author;
      pr.open = true;
      pr.draft = s.data.draft;
      pr.openedAt = s.occurredAt;
      pr.stateMark = mark;
      pr.readyAt = s.data.draft ? null : s.occurredAt;
      snap.prs.set(n, pr);
      if (snap.head === null) snap.head = { sha: s.data.headSha, at: s.occurredAt };
      if (snap.firstPusher === null) snap.firstPusher = s.data.author;
      return;
    }
    case "pr_edited": {
      const pr = prFor(snap, s, false);
      if (pr) pr.title = s.data.title;
      return;
    }
    case "pr_ready_for_review": {
      const pr = prFor(snap, s, false);
      if (!pr) return;
      pr.draft = false;
      pr.readyAt = s.occurredAt;
      pr.stateMark = mark;
      return;
    }
    case "pr_converted_to_draft": {
      const pr = prFor(snap, s, true);
      if (!pr) return;
      pr.draft = true;
      pr.readyAt = null;
      pr.stateMark = mark;
      return;
    }
    case "pr_reopened": {
      const pr = prFor(snap, s, false);
      if (!pr) return;
      pr.open = true;
      pr.merged = false;
      pr.closedAt = null;
      pr.stateMark = mark;
      if (!pr.draft) pr.readyAt = s.occurredAt;
      return;
    }
    case "pr_closed":
    case "pr_merged": {
      const pr = prFor(snap, s, false);
      if (!pr) return;
      pr.open = false;
      pr.merged = s.kind === "pr_merged";
      pr.closedAt = s.occurredAt;
      pr.stateMark = mark;
      return;
    }
    case "pr_review_requested": {
      const pr = prFor(snap, s, false);
      pr?.requested.set(s.data.reviewer, mark);
      return;
    }
    case "pr_review_request_removed": {
      const pr = prFor(snap, s, false);
      pr?.requested.delete(s.data.reviewer);
      return;
    }
    case "pr_review_submitted": {
      const pr = prFor(snap, s, false);
      if (!pr) return;
      const { reviewer, state } = s.data;
      // Submitting any review fulfils the request (GitHub semantics).
      pr.requested.delete(reviewer);
      if (state === "approved" || state === "changes_requested") {
        pr.verdicts.set(reviewer, { ...mark, state });
      } else if (state === "dismissed") {
        pr.verdicts.delete(reviewer);
      }
      // "commented" never changes a verdict.
      return;
    }
    case "check_completed": {
      const sha = s.refs.sha;
      if (!sha) return;
      let byContext = snap.checks.get(sha);
      if (!byContext) {
        byContext = new Map();
        snap.checks.set(sha, byContext);
      }
      byContext.set(s.data.context, { ...mark, conclusion: s.data.conclusion });
      return;
    }
  }
}
