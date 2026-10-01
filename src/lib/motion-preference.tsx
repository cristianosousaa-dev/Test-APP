"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
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

export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);

  // Read the saved choice after mount so the first render matches the server HTML.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") setPaused(true);
    } catch {
      // Storage can be unavailable (private mode, blocked site data): keep the default.
    }
  }, []);

  const enabled = !reduced && !paused;

  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
  }, [enabled]);

  const togglePaused = useCallback(() => {
    setPaused((p) => {
      const next = !p;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        // Ignore storage failures; the toggle still works for this visit.
      }
      return next;
    });
  }, []);

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
