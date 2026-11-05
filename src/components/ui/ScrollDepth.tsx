"use client";

import { type ReactNode, useEffect, useRef } from "react";
import type { Pose } from "@/lib/depth";
import { gsap } from "@/lib/motion";

/**
 * Scroll-driven depth: the block moves between two 3D poses in step with the scroll (scrub), on the
 * same clock as Lenis. Only transform and opacity change, so the compositor does the work and the
 * main thread stays free. Reduced motion: nothing moves.
 */
export function ScrollDepth({
  children,
  from,
  to,
  trigger,
  start = "top 95%",
  end = "top 50%",
  origin = "50% 0%",
  className,
}: {
  children: ReactNode;
  from: Pose;
  to: Pose;
  /** CSS selector of another element to track (default: the block itself). */
  trigger?: string;
  start?: string;
  end?: string;
  origin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { transformPerspective: 1100, transformOrigin: origin, ...from },
        {
          ...to,
          ease: "none",
          scrollTrigger: {
            trigger: (trigger && document.querySelector(trigger)) || el,
            start,
            end,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });
    return () => mm.revert();
  }, [from, to, trigger, start, end, origin]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
