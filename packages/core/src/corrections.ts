import type { Attention, Correction, Phase } from "./types.ts";

type Field = Correction["field"];
type Of<F extends Field> = Extract<Correction, { field: F }>;

function latestOf<F extends Field>(corrections: readonly Correction[], field: F): Of<F> | null {
  let best: Of<F> | null = null;
  for (const c of corrections) {
    if (c.field !== field) continue;
    const candidate = c as Of<F>;
    if (
      !best ||
      candidate.createdAt.getTime() > best.createdAt.getTime() ||
      (candidate.createdAt.getTime() === best.createdAt.getTime() && candidate.id > best.id)
    ) {
      best = candidate;
    }
  }
  return best;
}

export interface CorrectionOverlay {
  phase: Of<"phase"> | null;
  attention: Of<"attention"> | null;
  hidden: boolean;
}

/**
 * Phase/attention corrections hold only while no signal was received after them
 * (both timestamps are our server clock). `not_work` is sticky.
 * `merge_into` is applied by the pipeline (stream membership), not here.
 */
export function overlay(
  corrections: readonly Correction[],
  lastReceivedAt: Date,
): CorrectionOverlay {
  const active = <C extends { createdAt: Date }>(c: C | null) =>
    c && c.createdAt.getTime() >= lastReceivedAt.getTime() ? c : null;
  return {
    phase: active(latestOf(corrections, "phase")),
    attention: active(latestOf(corrections, "attention")),
    hidden: latestOf(corrections, "not_work")?.value ?? false,
  };
}

export type { Attention, Phase };
