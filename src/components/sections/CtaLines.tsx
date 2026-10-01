"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { useMotionPreference } from "@/lib/motion-preference";

const lines = [
  "M -10 70 C 40 70, 60 30, 110 30",
  "M -10 50 C 30 50, 70 75, 110 75",
  "M -10 85 C 50 85, 55 55, 110 55",
];

/** Decorative flowing lines behind the final CTA; only animate while visible. */
export function CtaLines() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref);
  const { enabled } = useMotionPreference();
  const running = enabled && inView;
  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 size-full opacity-40"
      aria-hidden
      role="presentation"
    >
      <defs>
        <linearGradient id="cta-gradient" x1="0" x2="1">
          <stop offset="0%" stopColor="#5b5bf0" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      {lines.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="url(#cta-gradient)"
          strokeWidth="0.35"
          strokeDasharray="2 1.5"
          className={running ? "animate-dash" : undefined}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
