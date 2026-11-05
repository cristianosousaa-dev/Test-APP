"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const subscribe = (notify: () => void) => {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
const snapshot = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

/** The active theme. The server and the first client render say "light"; an inline script in the
 *  document head has already set the real one, so the page never flashes. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, snapshot, () => "light");
}

/**
 * Switches theme with a soft cross-fade (View Transitions; see globals.css). Without them, or with
 * reduced motion, it switches at once. The choice is stored, so the next visit starts in it.
 */
export function setTheme(next: Theme) {
  const root = document.documentElement;
  const apply = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#0b0f0e" : "#fbfcfb");
  };

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduced) {
    apply();
    return;
  }
  document.startViewTransition(apply);
}
