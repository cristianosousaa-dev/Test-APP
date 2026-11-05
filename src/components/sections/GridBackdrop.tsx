"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useTheme } from "@/lib/theme";

/* WebGL grid from React Bits. Loaded on demand; it pauses off-screen and when the tab is hidden,
   listens to the pointer on the window, and shows a still frame under reduced motion. */
const RippleGrid = dynamic(() => import("@/components/react-bits/RippleGrid"), { ssr: false });

/**
 * The spreadsheet's grid as a quiet surface: flat, thin and dim, so it reads as texture, not as
 * effect. At rest nothing moves; the lines only ripple where the pointer passes. The CSS lines
 * (.grid-fallback) are what first paints, what stays when data-saver is on, and what shows if
 * WebGL is unavailable. Position and fade are decided by the caller through `className`.
 */
export function GridBackdrop({ className }: { className?: string }) {
  const dark = useTheme() === "dark";
  const [gl, setGl] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    setGl(!saver);
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      <div className="grid-fallback absolute inset-0" />
      {gl && (
        <RippleGrid
          className="absolute inset-0"
          color={dark ? "#6f93ff" : "#2f5e50"}
          lightMode={!dark}
          variant="lines"
          cellSize={coarse ? 56 : 72}
          lineWidth={1}
          glow={0.18}
          tilt={0}
          fade={0.9}
          opacity={coarse ? 0.35 : 0.5}
          rippleStrength={0.8}
          autoRipple="none"
          mouseInteraction={!coarse}
          clickRipple={false}
          dpr={coarse ? 1 : 1.5}
        />
      )}
    </div>
  );
}
