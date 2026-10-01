import { overlay } from "./corrections.ts";
import { apply, emptySnapshot, type Snapshot } from "./fold.ts";
import { normalize } from "./normalize.ts";
import { attentionOf, authorOf, openPrs, phaseOf } from "./rules.ts";
import { humanizeBranch, parseTicketKey } from "./text.ts";
import type { Correction, EngineConfig, Phase, Signal, StreamState } from "./types.ts";

/** Bump when rules change; the worker replays every stream on a new version. */
export const ENGINE_VERSION = 1;

function titleOf(snap: Snapshot): string {
  const prs = [...snap.prs.values()];
  const pool = prs.some((p) => p.open) ? prs.filter((p) => p.open) : prs;
  const newest = pool.reduce<(typeof prs)[number] | null>(
    (best, pr) => (!best || pr.openedAt.getTime() >= best.openedAt.getTime() ? pr : best),
    null,
  );
  if (newest?.title) return newest.title;
  return snap.branch ? humanizeBranch(snap.branch) : "Untitled work";
}

function prNumbersOf(snap: Snapshot): number[] {
  const open = openPrs(snap).map((p) => p.number);
  if (open.length > 0) return open.sort((a, b) => a - b);
  const closed = [...snap.prs.values()].filter((p) => p.closedAt);
  if (closed.length === 0) return [];
  const last = closed.reduce((a, b) =>
    (b.closedAt?.getTime() ?? 0) >= (a.closedAt?.getTime() ?? 0) ? b : a,
  );
  return [last.number];
}

/**
 * Pure projection: the state of one work stream from its signals.
 * Deterministic for any input order; no clock, randomness or I/O.
 */
export function infer(
  signals: readonly Signal[],
  corrections: readonly Correction[],
  config: EngineConfig,
  now: Date,
): StreamState {
  const ordered = normalize(signals);
  const first = ordered[0];
  if (!first) throw new Error("infer requires at least one signal");

  const snap = emptySnapshot(first);
  let phase: Phase | null = null;
  let phaseSince = first.occurredAt;
  for (const s of ordered) {
    apply(snap, s);
    const next = phaseOf(snap).phase;
    if (next !== phase) {
      phase = next;
      phaseSince = s.occurredAt;
    }
  }

  const phaseResult = phaseOf(snap);
  const att = attentionOf(snap, phaseResult.phase, config, now);
  const evidence = att.evidence.length > 0 ? att.evidence : phaseResult.evidence;
  const stateSince =
    att.since && att.since.getTime() > phaseSince.getTime() ? att.since : phaseSince;

  const branch = snap.branch ?? "";
  const title = titleOf(snap);
  const base: StreamState = {
    phase: phaseResult.phase,
    attention: att.attention,
    waitingOn: att.waitingOn,
    reasonCode: att.reasonCode,
    reasonText: att.reasonText,
    evidenceIds: evidence,
    stateSince,
    revalidateAt: att.revalidateAt,
    lastActivityAt: snap.lastActivity.at,
    title,
    ticketKey: parseTicketKey(title) ?? parseTicketKey(branch),
    author: authorOf(snap),
    prNumbers: prNumbersOf(snap),
    hidden: false,
    correctedBy: null,
  };

  const lastReceivedAt = ordered.reduce(
    (max, s) => (s.receivedAt.getTime() > max.getTime() ? s.receivedAt : max),
    first.receivedAt,
  );
  const o = overlay(corrections, lastReceivedAt);
  const state: StreamState = { ...base, hidden: o.hidden };
  if (!o.phase && !o.attention) return state;

  const newest = [o.phase, o.attention]
    .filter((c) => c !== null)
    .reduce((a, b) => (b.createdAt.getTime() >= a.createdAt.getTime() ? b : a));
  const correctedPhase = o.phase?.value ?? state.phase;
  const terminal = correctedPhase === "merged" || correctedPhase === "closed";
  const correctedAttention = o.attention?.value ?? (terminal ? "none" : state.attention);
  return {
    ...state,
    phase: correctedPhase,
    attention: correctedAttention,
    waitingOn: correctedAttention === base.attention ? base.waitingOn : [],
    reasonCode: "corrected",
    reasonText: "Corrected manually",
    stateSince: newest.createdAt,
    revalidateAt: null,
    correctedBy: newest.id,
  };
}
