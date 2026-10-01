import { z } from "zod";

/**
 * Domain contracts for the inference engine. The zod schemas are the source of
 * truth: integration mappers validate their output against `signalSchema`, and
 * the TypeScript types are inferred from them.
 */

export const PHASES = ["building", "review", "merged", "closed"] as const;
export type Phase = (typeof PHASES)[number];

/** Who must act next, in the engine's priority order (first match wins). */
export const ATTENTIONS = [
  "ci_failing",
  "changes_requested",
  "awaiting_review",
  "stale",
  "none",
] as const;
export type Attention = (typeof ATTENTIONS)[number];

export const REVIEW_STATES = ["approved", "changes_requested", "commented", "dismissed"] as const;
export type ReviewState = (typeof REVIEW_STATES)[number];

export const CHECK_CONCLUSIONS = [
  "success",
  "failure",
  "neutral",
  "cancelled",
  "skipped",
  "timed_out",
  "action_required",
  "stale",
  "pending",
] as const;
export type CheckConclusion = (typeof CHECK_CONCLUSIONS)[number];

const login = z.string().min(1);
const sha = z.string().regex(/^[0-9a-f]{7,40}$/);

export const signalRefsSchema = z.object({
  prNumber: z.number().int().positive().optional(),
  branch: z.string().min(1).optional(),
  sha: sha.optional(),
  baseRef: z.string().min(1).optional(),
  headRepoId: z.number().int().positive().optional(),
});
export type SignalRefs = z.infer<typeof signalRefsSchema>;

const base = {
  id: z.string().min(1),
  externalId: z.string().min(1),
  occurredAt: z.date(),
  receivedAt: z.date(),
  actor: login.nullable(),
  refs: signalRefsSchema,
};

export const signalSchema = z.discriminatedUnion("kind", [
  z.object({
    ...base,
    kind: z.literal("branch_pushed"),
    data: z.object({ headSha: sha, forced: z.boolean(), commitCount: z.number().int().min(0) }),
  }),
  z.object({ ...base, kind: z.literal("branch_deleted"), data: z.object({}) }),
  z.object({
    ...base,
    kind: z.literal("pr_opened"),
    data: z.object({
      title: z.string(),
      draft: z.boolean(),
      author: login,
      headSha: sha,
      baseRef: z.string().min(1),
    }),
  }),
  z.object({ ...base, kind: z.literal("pr_edited"), data: z.object({ title: z.string() }) }),
  z.object({ ...base, kind: z.literal("pr_synchronized"), data: z.object({ headSha: sha }) }),
  z.object({ ...base, kind: z.literal("pr_ready_for_review"), data: z.object({}) }),
  z.object({ ...base, kind: z.literal("pr_converted_to_draft"), data: z.object({}) }),
  z.object({ ...base, kind: z.literal("pr_reopened"), data: z.object({}) }),
  z.object({ ...base, kind: z.literal("pr_closed"), data: z.object({}) }),
  z.object({ ...base, kind: z.literal("pr_merged"), data: z.object({}) }),
  z.object({
    ...base,
    kind: z.literal("pr_review_requested"),
    data: z.object({ reviewer: login }),
  }),
  z.object({
    ...base,
    kind: z.literal("pr_review_request_removed"),
    data: z.object({ reviewer: login }),
  }),
  z.object({
    ...base,
    kind: z.literal("pr_review_submitted"),
    data: z.object({ reviewer: login, state: z.enum(REVIEW_STATES), commitSha: sha.optional() }),
  }),
  z.object({
    ...base,
    kind: z.literal("check_completed"),
    data: z.object({ context: z.string().min(1), conclusion: z.enum(CHECK_CONCLUSIONS) }),
  }),
]);

export type Signal = z.infer<typeof signalSchema>;
export type SignalKind = Signal["kind"];
export type SignalOf<K extends SignalKind> = Extract<Signal, { kind: K }>;

export const SIGNAL_KINDS = signalSchema.options.map((o) => o.shape.kind.value) as SignalKind[];

export type Correction =
  | CorrectionBase<"phase", Phase>
  | CorrectionBase<"attention", Attention>
  | CorrectionBase<"not_work", boolean>
  | CorrectionBase<"merge_into", string>;

interface CorrectionBase<F extends string, V> {
  id: string;
  createdAt: Date;
  field: F;
  value: V;
}

export interface EngineConfig {
  /** IANA timezone of the workspace, e.g. "Europe/Lisbon". */
  timezone: string;
  /** A stream with no activity for this many business days (Mon–Fri) is stale. */
  staleAfterBusinessDays: number;
}

export const REASON_CODES = [
  "ci_failing",
  "changes_requested",
  "awaiting_requested_review",
  "awaiting_any_review",
  "stale",
  "approved",
  "in_review",
  "in_progress",
  "draft",
  "merged",
  "closed",
  "corrected",
] as const;
export type ReasonCode = (typeof REASON_CODES)[number];

export interface StreamState {
  phase: Phase;
  attention: Attention;
  /** GitHub logins who must act next. Empty when nobody specific is waited on. */
  waitingOn: string[];
  reasonCode: ReasonCode;
  /** Stable, time-independent explanation. Durations are rendered by the UI from `stateSince`. */
  reasonText: string;
  /** Signal ids that justify this state. Never empty. */
  evidenceIds: string[];
  /** When the current phase + attention began. */
  stateSince: Date;
  /** When the state would change with no new signal (e.g. becoming stale), or null. */
  revalidateAt: Date | null;
  lastActivityAt: Date;
  title: string;
  ticketKey: string | null;
  author: string | null;
  /** Open PR numbers, or the most recent PR when none are open. */
  prNumbers: number[];
  /** Sticky `not_work` correction. */
  hidden: boolean;
  /** Id of the correction overriding phase/attention, if any. */
  correctedBy: string | null;
}
