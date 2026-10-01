import { addBusinessDays } from "./calendar.ts";
import type { Mark, PrSnapshot, Snapshot } from "./fold.ts";
import { mentionList } from "./text.ts";
import type { Attention, CheckConclusion, EngineConfig, Phase, ReasonCode } from "./types.ts";

export interface PhaseResult {
  phase: Phase;
  evidence: string[];
}

export interface AttentionResult {
  attention: Attention;
  waitingOn: string[];
  reasonCode: ReasonCode;
  reasonText: string;
  evidence: string[];
  /** When this attention began (null: use the phase start). */
  since: Date | null;
  revalidateAt: Date | null;
}

const FAILING: ReadonlySet<CheckConclusion> = new Set(["failure", "timed_out"]);

const later = (a: Date, b: Date) => (a.getTime() >= b.getTime() ? a : b);
const earliest = (dates: Date[]) =>
  dates.reduce((min, d) => (d.getTime() < min.getTime() ? d : min));
const latest = (dates: Date[]) => dates.reduce((max, d) => (d.getTime() > max.getTime() ? d : max));

export function openPrs(snap: Snapshot): PrSnapshot[] {
  return [...snap.prs.values()].filter((pr) => pr.open);
}

function latestClosed(snap: Snapshot): PrSnapshot | null {
  let best: PrSnapshot | null = null;
  for (const pr of snap.prs.values()) {
    if (pr.open || !pr.closedAt) continue;
    if (!best || (best.closedAt && pr.closedAt.getTime() >= best.closedAt.getTime())) best = pr;
  }
  return best;
}

export function phaseOf(snap: Snapshot): PhaseResult {
  const open = openPrs(snap);
  const readyPrs = open.filter((pr) => !pr.draft);
  if (readyPrs.length > 0)
    return { phase: "review", evidence: readyPrs.map((p) => p.stateMark.id) };
  if (open.length > 0) return { phase: "building", evidence: open.map((p) => p.stateMark.id) };

  const lastPushAt = snap.lastPush?.at.getTime() ?? Number.NEGATIVE_INFINITY;
  const closedPr = latestClosed(snap);
  if (closedPr?.closedAt) {
    if (snap.lastPush && lastPushAt > closedPr.closedAt.getTime()) {
      return { phase: "building", evidence: [snap.lastPush.id] };
    }
    return { phase: closedPr.merged ? "merged" : "closed", evidence: [closedPr.stateMark.id] };
  }
  if (snap.branchDeleted && snap.branchDeleted.at.getTime() >= lastPushAt) {
    return { phase: "closed", evidence: [snap.branchDeleted.id] };
  }
  return { phase: "building", evidence: [(snap.lastPush ?? snap.lastActivity).id] };
}

export function authorOf(snap: Snapshot): string | null {
  const prs = [...snap.prs.values()];
  const pool = prs.some((p) => p.open) ? prs.filter((p) => p.open) : prs;
  const newest = pool.reduce<PrSnapshot | null>(
    (best, pr) => (!best || pr.openedAt.getTime() >= best.openedAt.getTime() ? pr : best),
    null,
  );
  return newest?.author ?? snap.firstPusher;
}

function ciFailing(snap: Snapshot): Mark[] {
  if (!snap.head) return [];
  const byContext = snap.checks.get(snap.head.sha);
  if (!byContext) return [];
  return [...byContext.entries()]
    .filter(([, r]) => FAILING.has(r.conclusion))
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([context, r]) => ({ at: r.at, id: r.id, context }) as Mark & { context: string });
}

export function attentionOf(
  snap: Snapshot,
  phase: Phase,
  config: EngineConfig,
  now: Date,
): AttentionResult {
  const author = authorOf(snap);
  const authorList = author ? [author] : [];
  const none = (reasonCode: ReasonCode, reasonText: string, evidence: string[] = []) => ({
    attention: "none" as const,
    waitingOn: [],
    reasonCode,
    reasonText,
    evidence,
    since: null,
    revalidateAt: null,
  });

  if (phase === "merged") return none("merged", "Merged");
  if (phase === "closed") return none("closed", "Closed without merging");

  // 1. CI failing on the current head commit.
  const failing = ciFailing(snap) as (Mark & { context: string })[];
  if (failing.length > 0) {
    return {
      attention: "ci_failing",
      waitingOn: authorList,
      reasonCode: "ci_failing",
      reasonText: `CI failing: ${failing.map((f) => f.context).join(", ")}`,
      evidence: failing.map((f) => f.id),
      since: earliest(failing.map((f) => f.at)),
      revalidateAt: null,
    };
  }

  const open = openPrs(snap);
  const lastPushAt = snap.lastPush?.at ?? null;
  const pushedAfter = (at: Date) => lastPushAt !== null && lastPushAt.getTime() > at.getTime();

  // 2. Changes requested and not yet addressed by a push.
  const blocking = open.flatMap((pr) =>
    [...pr.verdicts.entries()]
      .filter(([, v]) => v.state === "changes_requested" && !pushedAfter(v.at))
      .map(([reviewer, v]) => ({ reviewer, ...v })),
  );
  if (blocking.length > 0) {
    const reviewers = [...new Set(blocking.map((b) => b.reviewer))].sort();
    return {
      attention: "changes_requested",
      waitingOn: authorList,
      reasonCode: "changes_requested",
      reasonText: `${mentionList(reviewers)} requested changes`,
      evidence: blocking.map((b) => b.id),
      since: earliest(blocking.map((b) => b.at)),
      revalidateAt: null,
    };
  }

  // 3. Awaiting review (only PRs ready for review).
  const readyPrs = open.filter((pr) => !pr.draft);
  if (phase === "review" && readyPrs.length > 0) {
    const pending = new Map<string, Mark>();
    for (const pr of readyPrs) {
      for (const [reviewer, m] of pr.requested) pending.set(reviewer, m);
      for (const [reviewer, v] of pr.verdicts) {
        if (v.state === "changes_requested" && pushedAfter(v.at) && snap.lastPush) {
          pending.set(reviewer, snap.lastPush);
        }
      }
    }
    const readySince = latest(readyPrs.map((pr) => pr.readyAt ?? pr.openedAt));
    if (pending.size > 0) {
      const reviewers = [...pending.keys()].sort();
      const marks = reviewers.map((r) => pending.get(r) as Mark);
      return {
        attention: "awaiting_review",
        waitingOn: reviewers,
        reasonCode: "awaiting_requested_review",
        reasonText: `Waiting on ${mentionList(reviewers)} for review`,
        evidence: [...new Set(marks.map((m) => m.id))],
        since: later(readySince, earliest(marks.map((m) => m.at))),
        revalidateAt: null,
      };
    }
    const approvals = readyPrs.flatMap((pr) =>
      [...pr.verdicts.entries()]
        .filter(([, v]) => v.state === "approved")
        .map(([reviewer, v]) => ({ reviewer, ...v })),
    );
    if (approvals.length === 0) {
      return {
        attention: "awaiting_review",
        waitingOn: [],
        reasonCode: "awaiting_any_review",
        reasonText: "Waiting for a reviewer",
        evidence: readyPrs.map((pr) => pr.stateMark.id),
        since: lastPushAt ? later(readySince, lastPushAt) : readySince,
        revalidateAt: null,
      };
    }
    return staleOr(
      none(
        "approved",
        `Approved by ${mentionList([...new Set(approvals.map((a) => a.reviewer))].sort())}`,
        approvals.map((a) => a.id),
      ),
    );
  }

  const drafts = open.filter((pr) => pr.draft);
  return staleOr(
    drafts.length > 0 ? none("draft", "Draft pull request") : none("in_progress", "In progress"),
  );

  // 4. Stale: nobody specific owes action and nothing happened for N business days.
  function staleOr(fallback: AttentionResult): AttentionResult {
    const staleAt = addBusinessDays(
      snap.lastActivity.at,
      config.staleAfterBusinessDays,
      config.timezone,
    );
    if (now.getTime() >= staleAt.getTime()) {
      return {
        attention: "stale",
        waitingOn: authorList,
        reasonCode: "stale",
        reasonText: `No activity for ${config.staleAfterBusinessDays} business days`,
        evidence: [snap.lastActivity.id],
        since: staleAt,
        revalidateAt: null,
      };
    }
    return { ...fallback, revalidateAt: staleAt };
  }
}
