import { useInView } from "motion/react";
import { type RefObject, useEffect, useState } from "react";
import { useMotionPreference } from "./motion-preference";

/**
 * Steps through 0 … durations.length-1, holding step i for durations[i] ms, then loops.
 * Pauses off-screen / in hidden tabs. With motion disabled (OS reduced motion or the
 * pause toggle) it rests on the last step, which every preview designs as a complete state.
 */
export function useLoop(ref: RefObject<Element | null>, durations: readonly number[]) {
  const { enabled } = useMotionPreference();
  const inView = useInView(ref, { amount: 0.3 });
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const running = enabled && inView && pageVisible;
  const last = durations.length - 1;

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

  return { step: enabled ? step : last, cycle, animate: enabled, running };
}
