"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/**
 * Inertial page scroll. The window still scrolls (so IntersectionObserver, scroll-driven CSS
 * and the header keep working); Lenis only smooths the input. In-page links glide to their
 * section, clear of the floating header. Reduced motion: Lenis falls back to native 1:1.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: true,
      anchors: { offset: -84 },
      stopInertiaOnNavigate: true,
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
