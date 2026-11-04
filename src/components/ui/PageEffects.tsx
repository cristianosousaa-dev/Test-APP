"use client";

import { useEffect } from "react";

/**
 * Page-wide, lightweight effects:
 * - `[data-reveal]` gets `.is-in` the first time it scrolls into view (fallback for browsers
 *   without scroll-driven animations, and the trigger for one-shot `.seq` sequences);
 * - `[data-loop]` gets `.is-playing` while visible, so CSS loops pause off-screen.
 */
export function PageEffects() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    const loops = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle("is-playing", e.isIntersecting);
    });
    for (const el of document.querySelectorAll("[data-reveal], [data-pop], [data-draw]"))
      reveal.observe(el);
    for (const el of document.querySelectorAll("[data-loop]")) loops.observe(el);

    return () => {
      reveal.disconnect();
      loops.disconnect();
    };
  }, []);
  return null;
}
