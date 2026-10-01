"use client";

import { motion, useInView } from "motion/react";
import { type ReactNode, useRef } from "react";
import { useMotionPreference } from "@/lib/motion-preference";

/** Section kicker with the node the connectors dock into. Lights up when it arrives. */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { enabled } = useMotionPreference();
  const lit = useInView(ref, { margin: "0px 0px -35% 0px" });
  const on = lit || !enabled;
  return (
    <p ref={ref} className="flex items-center gap-3 text-[14px] text-ink-2">
      <span className="relative grid size-3 place-items-center">
        {enabled && on && (
          <motion.span
            className="absolute inset-0 rounded-full bg-ink/25"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
        <span
          className={`size-3 rounded-full ring-1 transition-[background-color,box-shadow] duration-500 ${
            on ? "bg-ink ring-ink" : "bg-canvas ring-ink/30"
          }`}
        />
      </span>
      <span className="text-mute tabular-nums">{index}</span>
      <span>{children}</span>
    </p>
  );
}
