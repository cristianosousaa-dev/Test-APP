"use client";

import { useEffect } from "react";

/**
 * Page-wide, lightweight effects:
 * - `[data-reveal]` gets `.is-in` the first time it scrolls into view (fallback for browsers
 *   without scroll-driven animations, and the trigger for one-shot `.seq` sequences);
 * - `[data-loop]` gets `.is-playing` while visible, so CSS loops pause off-screen;
 * - `[data-spot]` cards receive the pointer position (--sx/--sy) for the spotlight hover.
 *   One delegated listener, throttled to animation frames, touching only the hovered card.
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
    for (const el of document.querySelectorAll("[data-reveal]")) reveal.observe(el);
    for (const el of document.querySelectorAll("[data-loop]")) loops.observe(el);

    let frame = 0;
    let last: { el: HTMLElement; x: number; y: number } | null = null;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-spot]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      last = { el, x: e.clientX - r.left, y: e.clientY - r.top };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!last) return;
        last.el.style.setProperty("--sx", `${last.x}px`);
        last.el.style.setProperty("--sy", `${last.y}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      reveal.disconnect();
      loops.disconnect();
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
