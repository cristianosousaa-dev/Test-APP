"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { instant, springSlow } from "@/lib/motion";
import { useMotionPreference } from "@/lib/motion-preference";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Set when this element scrolls (so layout animations inside measure correctly). */
  layoutScroll?: boolean;
}

/** Quiet entrance on scroll: 10px rise + fade, once. `reveal` class = no-JS fallback. */
export function Reveal({ children, className, delay = 0, layoutScroll }: RevealProps) {
  const { reduced } = useMotionPreference();
  return (
    <motion.div
      className={className ? `reveal ${className}` : "reveal"}
      layoutScroll={layoutScroll}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={reduced ? instant : { ...springSlow, delay }}
    >
      {children}
    </motion.div>
  );
}
