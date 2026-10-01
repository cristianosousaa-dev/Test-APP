"use client";

import { animate as animateValue, useMotionValue, useMotionValueEvent } from "motion/react";
import { useEffect, useRef } from "react";

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

  useMotionValueEvent(mv, "change", (v) => {
    if (ref.current) ref.current.textContent = format(v);
  });

  useEffect(() => {
    if (!animate) {
      mv.set(value);
      return;
    }
    const controls = animateValue(mv, value, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [value, animate, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(value)}
    </span>
  );
}
