"use client";

import { useEffect } from "react";

/**
 * One observer for the whole page:
 * - `[data-reveal]` elements get `.is-in` once, the first time they scroll into view;
 * - `[data-loop]` sections get `.is-playing` while visible, so their CSS loops pause off-screen.
 */
export function RevealObserver() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    const loops = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle("is-playing", e.isIntersecting);
    });
    for (const el of document.querySelectorAll("[data-reveal]")) reveal.observe(el);
    for (const el of document.querySelectorAll("[data-loop]")) loops.observe(el);
    return () => {
      reveal.disconnect();
      loops.disconnect();
    };
  }, []);
  return null;
}
