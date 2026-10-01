"use client";

import { useInView, useReducedMotion } from "motion/react";
import { type RefObject, useEffect, useState } from "react";

interface SequenceOptions {
  stepMs?: number;
  holdMs?: number;
  startMs?: number;
}

/**
 * Drives a looping demo: -1 (empty) → 0 … length-1 (one step at a time) → hold → restart.
 * Pauses while off-screen or when the tab is hidden. With reduced motion, shows the final state.
 * Returns the active step and a cycle counter (useful as a React key to restart effects).
 */
export function useSequence(
  ref: RefObject<Element | null>,
  length: number,
  { stepMs = 1800, holdMs = 2800, startMs = 500 }: SequenceOptions = {},
) {
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.35 });
  const [step, setStep] = useState(-1);
  const [cycle, setCycle] = useState(0);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const onChange = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  const running = !reduced && inView && pageVisible;

  useEffect(() => {
    if (!running) return;
    const last = length - 1;
    const delay = step === -1 ? startMs : step === last ? holdMs : stepMs;
    const id = window.setTimeout(() => {
      if (step === last) {
        setStep(-1);
        setCycle((c) => c + 1);
      } else {
        setStep(step + 1);
      }
    }, delay);
    return () => window.clearTimeout(id);
  }, [running, step, length, stepMs, holdMs, startMs]);

  return { step: reduced ? length - 1 : step, cycle, animate: !reduced };
}
