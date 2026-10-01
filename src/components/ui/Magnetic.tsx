"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useMotionPreference } from "@/lib/motion-preference";

/** Pulls its child a few pixels towards a fine pointer, then springs back. */
export function Magnetic({
  children,
  strength = 0.22,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const { enabled } = useMotionPreference();
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 22, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 22, mass: 0.6 });

  function onMove(e: PointerEvent<HTMLSpanElement>) {
    if (!enabled || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      className={className ?? "inline-flex"}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
