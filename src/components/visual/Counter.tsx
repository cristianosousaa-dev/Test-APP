"use client";

import { animate as animateValue, useMotionValue, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";

const euro = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" });

/** Number that glides to its new value. Formats as euros by default. */
export function Counter({
  value,
  animate,
  format = (n) => euro.format(n),
}: {
  value: number;
  animate: boolean;
  format?: (n: number) => string;
}) {
  const mv = useMotionValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  // React only ever renders the first value; later values are written by the motion value,
  // so a new `value` never flashes before the glide starts.
  const [initialText] = useState(() => format(value));

  useMotionValueEvent(mv, "change", (v) => {
    if (ref.current) ref.current.textContent = format(v);
  });

  useEffect(() => {
    // Glide only upwards; a loop restart resets instantly instead of counting money back down.
    if (!animate || value < mv.get()) {
      mv.set(value);
      return;
    }
    const controls = animateValue(mv, value, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [value, animate, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      {initialText}
    </span>
  );
}
