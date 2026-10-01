import type { Correction, EngineConfig, Signal, SignalKind, SignalOf } from "../src/types.ts";

/** Monday 2026-09-28 09:00 in Lisbon (08:00 UTC). */
export const MONDAY = "2026-09-28T08:00:00Z";
export const BRANCH = "feat/abc-123-login";
export const config: EngineConfig = { timezone: "Europe/Lisbon", staleAfterBusinessDays: 3 };

let seq = 0;

export function at(iso: string): Date {
  return new Date(iso);
}

/** Minutes after MONDAY. */
export function t(minutes: number): Date {
  return new Date(Date.parse(MONDAY) + minutes * 60_000);
}

export function sig<K extends SignalKind>(
  kind: K,
  occurredAt: Date,
  data: SignalOf<K>["data"],
  opts: {
    actor?: string | null;
    refs?: Signal["refs"];
    receivedAt?: Date;
    externalId?: string;
  } = {},
): SignalOf<K> {
  seq += 1;
  return {
    id: `s${seq}`,
    externalId: opts.externalId ?? `${kind}:${seq}`,
    kind,
    occurredAt,
    receivedAt: opts.receivedAt ?? occurredAt,
    actor: opts.actor === undefined ? "alice" : opts.actor,
    refs: { branch: BRANCH, ...opts.refs },
    data,
  } as SignalOf<K>;
}

export const push = (when: Date, headSha: string, actor = "alice", forced = false) =>
  sig(
    "branch_pushed",
    when,
    { headSha, forced, commitCount: 1 },
    { actor, refs: { sha: headSha } },
  );

export const prOpened = (
  when: Date,
  n: number,
  o: { draft?: boolean; title?: string; author?: string; headSha?: string; baseRef?: string } = {},
) =>
  sig(
    "pr_opened",
    when,
    {
      title: o.title ?? "Add login",
      draft: o.draft ?? false,
      author: o.author ?? "alice",
      headSha: o.headSha ?? "aaaaaaa",
      baseRef: o.baseRef ?? "main",
    },
    { actor: o.author ?? "alice", refs: { prNumber: n, baseRef: o.baseRef ?? "main" } },
  );

const prEvent =
  <
    K extends
      | "pr_ready_for_review"
      | "pr_converted_to_draft"
      | "pr_reopened"
      | "pr_closed"
      | "pr_merged",
  >(
    kind: K,
  ) =>
  (when: Date, n: number, actor = "alice") =>
    sig(kind, when, {} as SignalOf<K>["data"], { actor, refs: { prNumber: n } });

export const ready = prEvent("pr_ready_for_review");
export const toDraft = prEvent("pr_converted_to_draft");
export const reopened = prEvent("pr_reopened");
export const closed = prEvent("pr_closed");
export const merged = prEvent("pr_merged");

export const edited = (when: Date, n: number, title: string) =>
  sig("pr_edited", when, { title }, { refs: { prNumber: n } });

export const synchronized = (when: Date, n: number, headSha: string) =>
  sig("pr_synchronized", when, { headSha }, { refs: { prNumber: n, sha: headSha } });

export const reviewRequested = (when: Date, n: number, reviewer: string) =>
  sig("pr_review_requested", when, { reviewer }, { refs: { prNumber: n } });

export const requestRemoved = (when: Date, n: number, reviewer: string) =>
  sig("pr_review_request_removed", when, { reviewer }, { refs: { prNumber: n } });

export const review = (
  when: Date,
  n: number,
  reviewer: string,
  state: "approved" | "changes_requested" | "commented" | "dismissed",
) =>
  sig("pr_review_submitted", when, { reviewer, state }, { actor: reviewer, refs: { prNumber: n } });

export const check = (
  when: Date,
  headSha: string,
  conclusion: SignalOf<"check_completed">["data"]["conclusion"],
  context = "ci",
) => sig("check_completed", when, { context, conclusion }, { actor: null, refs: { sha: headSha } });

export const branchDeleted = (when: Date) => sig("branch_deleted", when, {});

let cseq = 0;
export function correction<C extends Correction>(c: Omit<C, "id">): C {
  cseq += 1;
  return { id: `c${cseq}`, ...c } as C;
}
