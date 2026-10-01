"use client";

import { useSyncExternalStore } from "react";

/** Live context shown inside the header island (e.g. the step an example is on). */
let detail: string | null = null;
const listeners = new Set<() => void>();

export function setIslandDetail(next: string | null) {
  if (next === detail) return;
  detail = next;
  for (const l of listeners) l();
}

export function useIslandDetail(): string | null {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => detail,
    () => null,
  );
}
