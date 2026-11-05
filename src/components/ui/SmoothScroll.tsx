"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";

/**
 * Inertial page scroll on GSAP's ticker: Lenis and ScrollTrigger share one clock, so scroll-driven
 * motion never drifts from the page. The window still scrolls (IntersectionObserver, scroll-driven
 * CSS and the header keep working); Lenis only smooths the input. In-page links glide to their
 * section, clear of the floating header. Reduced motion: Lenis falls back to native 1:1.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: false,
      anchors: { offset: -84 },
      stopInertiaOnNavigate: true,
    });
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
