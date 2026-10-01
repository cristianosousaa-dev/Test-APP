"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { duration, ease, entrance } from "@/lib/motion";
import { useMotionPreference } from "@/lib/motion-preference";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}

/**
 * Signature entrance: fade + 16px rise, once, when scrolled into view.
 * The `reveal` class lets the <noscript> rule in the layout show content without JS.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const { reduced } = useMotionPreference();
  const Component = motion[as];
  return (
    <Component
      className={className ? `reveal ${className}` : "reveal"}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      variants={entrance}
      transition={reduced ? { duration: 0 } : { duration: duration.slow, ease, delay }}
    >
      {children}
    </Component>
  );
}
