"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to CSS (--px / --py on <html>) so every glass surface can catch
 * the same moving light. One listener, throttled to animation frames; mouse only.
 */
export function PointerLight() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        root.style.setProperty("--px", `${x}px`);
        root.style.setProperty("--py", `${y}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
