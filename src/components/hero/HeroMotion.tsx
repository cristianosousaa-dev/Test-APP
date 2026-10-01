"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { type PointerEvent, type ReactNode, useRef } from "react";
import { useBackdropOnView } from "@/lib/backdrop";
import { useMotionPreference } from "@/lib/motion-preference";

/**
 * Hero layout with scroll handoff: as the hero leaves, the copy rises faster than the
 * stage and fades, so the page reads as one continuous move into the examples.
 */
export function HeroMotion({ copy, stage }: { copy: ReactNode; stage: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useMotionPreference();
  useBackdropOnView(ref, "hero");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <div
      ref={ref}
      className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14"
    >
      <motion.div
        className="max-w-[38rem]"
        style={enabled ? { y: copyY, opacity: copyOpacity } : undefined}
      >
        {copy}
      </motion.div>
      <motion.div style={enabled ? { y: stageY, scale: stageScale } : undefined}>
        <Tilt>{stage}</Tilt>
      </motion.div>
    </div>
  );
}

/** Leans gently towards a mouse pointer, like a sheet of glass catching light. */
function Tilt({ children }: { children: ReactNode }) {
  const { enabled } = useMotionPreference();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const cfg = { stiffness: 140, damping: 20, mass: 0.8 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), cfg);
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), cfg);
  const glareX = useTransform(px, [0, 1], ["20%", "80%"]);
  const glareY = useTransform(py, [0, 1], ["10%", "90%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x} ${y}, rgb(255 255 255 / 0.55), transparent 45%)`,
  );

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (!enabled || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className="[perspective:1400px]" onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={enabled ? { rotateX, rotateY } : undefined}
      >
        {children}
        {enabled && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[28px] mix-blend-soft-light"
            style={{ background: glare }}
          />
        )}
      </motion.div>
    </div>
  );
}
