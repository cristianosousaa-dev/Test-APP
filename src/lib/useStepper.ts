"use client";

import { type RefObject, useEffect, useState, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(cb: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/**
 * Steps 0 … durations.length - 1 and loops, holding each step for its duration.
 * Runs only while the element is on screen, the tab is visible and it is not paused.
 * With reduced motion it rests on the last step, which every preview designs as complete.
 */
export function useStepper(
  ref: RefObject<Element | null>,
  durations: readonly number[],
  paused = false,
) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const last = durations.length - 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const running = !reduced && !paused && visible && pageVisible;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => {
      if (step >= last) {
        setStep(0);
        setCycle((c) => c + 1);
      } else {
        setStep(step + 1);
      }
    }, durations[step] ?? 2000);
    return () => window.clearTimeout(id);
  }, [running, step, last, durations]);

  return { step: reduced ? last : step, cycle, running, reduced };
}
