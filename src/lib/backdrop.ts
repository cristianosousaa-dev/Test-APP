"use client";

import { type RefObject, useEffect, useSyncExternalStore } from "react";

/** Colour moods for the page backdrop. Each section (or preview chapter) picks one. */
export type BackdropTheme =
  | "hero"
  | "bookings"
  | "quotes"
  | "leads"
  | "payments"
  | "services"
  | "process"
  | "faq";

let current: BackdropTheme = "hero";
const listeners = new Set<() => void>();

export function setBackdropTheme(theme: BackdropTheme) {
  if (theme === current) return;
  current = theme;
  for (const l of listeners) l();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useBackdropTheme(): BackdropTheme {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => "hero" as BackdropTheme,
  );
}

/** Switch the backdrop when this element crosses the middle of the viewport. */
export function useBackdropOnView(ref: RefObject<Element | null>, theme: BackdropTheme) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setBackdropTheme(theme);
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, theme]);
}
