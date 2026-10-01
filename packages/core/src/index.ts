export * from "./types.ts";

import type { Correction, EngineConfig, Signal, StreamState } from "./types.ts";

export const ENGINE_VERSION = 1;

export function infer(
  _signals: readonly Signal[],
  _corrections: readonly Correction[],
  _config: EngineConfig,
  _now: Date,
): StreamState {
  throw new Error("not implemented");
}

export function parseTicketKey(_text: string): string | null {
  throw new Error("not implemented");
}

export function humanizeBranch(_branch: string): string {
  throw new Error("not implemented");
}
