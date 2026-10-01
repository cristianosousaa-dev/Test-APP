"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const STORAGE_KEY = "motion-paused";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/**
 * Live OS reduced-motion preference. The server snapshot is `false`, so the first client
 * render matches the HTML; React re-renders with the real value right after hydration.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

interface MotionPreference {
  /** True when ambient/looping animation may run (no OS reduce, not paused by the user). */
  enabled: boolean;
  paused: boolean;
  reduced: boolean;
  togglePaused: () => void;
}

const MotionPreferenceContext = createContext<MotionPreference>({
  enabled: true,
  paused: false,
  reduced: false,
  togglePaused: () => {},
});

/* The user's pause choice lives in localStorage; this tiny store lets React read it
   during render (server snapshot `false`) and keeps tabs in sync via the storage event. */
const pauseListeners = new Set<() => void>();
/** In-memory copy, so the toggle still works when storage is blocked. */
let memoryPaused: boolean | null = null;

function readPaused(): boolean {
  if (memoryPaused !== null) return memoryPaused;
  try {
    memoryPaused = window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // Storage can be unavailable (private mode, blocked site data): keep the default.
    memoryPaused = false;
  }
  return memoryPaused;
}

function subscribePaused(callback: () => void) {
  pauseListeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    pauseListeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function writePaused(next: boolean) {
  memoryPaused = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  } catch {
    // Ignore storage failures; the toggle still works until the next read.
  }
  for (const listener of pauseListeners) listener();
}

export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const paused = useSyncExternalStore(subscribePaused, readPaused, () => false);
  const enabled = !reduced && !paused;

  // CSS-only loops (marquee, flow lines) read this attribute.
  useEffect(() => {
    document.documentElement.toggleAttribute("data-paused", paused);
  }, [paused]);

  const togglePaused = useCallback(() => writePaused(!readPaused()), []);

  const value = useMemo(
    () => ({ enabled, paused, reduced, togglePaused }),
    [enabled, paused, reduced, togglePaused],
  );
  return (
    <MotionPreferenceContext.Provider value={value}>{children}</MotionPreferenceContext.Provider>
  );
}

export function useMotionPreference(): MotionPreference {
  return useContext(MotionPreferenceContext);
}
