"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMotionPreference } from "@/lib/motion-preference";

/** Card wrapper that leans a few degrees towards a mouse pointer and lifts slightly. */
export function TiltCard({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const { enabled } = useMotionPreference();
  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (!enabled || e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ty", `${nx * max * 2}deg`);
    el.style.setProperty("--tx", `${-ny * max * 2}deg`);
    el.style.setProperty("--lift", "-3px");
  }
  function reset(e: PointerEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    el.style.setProperty("--tx", "0deg");
    el.style.setProperty("--ty", "0deg");
    el.style.setProperty("--lift", "0px");
  }
  return (
    <div className={cn("tilt", className)} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </div>
  );
}
