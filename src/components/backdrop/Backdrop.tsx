"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { type BackdropTheme, useBackdropTheme } from "@/lib/backdrop";
import { cn } from "@/lib/cn";
import { useMotionPreference } from "@/lib/motion-preference";

type Field = { c: string; x: number; y: number; s: number };

/* Soft light fields per mood. Low-saturation pastels so text on canvas keeps its contrast. */
const C = {
  sky: "rgb(160 196 242 / 0.55)",
  lilac: "rgb(196 184 246 / 0.5)",
  sand: "rgb(246 214 168 / 0.55)",
  sage: "rgb(170 218 190 / 0.5)",
  rose: "rgb(246 190 198 / 0.45)",
};

const THEMES: Record<BackdropTheme, [Field, Field, Field]> = {
  hero: [
    { c: C.sky, x: 12, y: 12, s: 70 },
    { c: C.lilac, x: 88, y: 22, s: 62 },
    { c: C.sand, x: 58, y: 92, s: 66 },
  ],
  bookings: [
    { c: C.lilac, x: 82, y: 24, s: 72 },
    { c: C.sky, x: 12, y: 72, s: 64 },
    { c: C.rose, x: 56, y: 98, s: 56 },
  ],
  quotes: [
    { c: C.sand, x: 78, y: 18, s: 72 },
    { c: C.rose, x: 16, y: 78, s: 62 },
    { c: C.lilac, x: 92, y: 88, s: 52 },
  ],
  leads: [
    { c: C.sky, x: 80, y: 28, s: 74 },
    { c: C.sage, x: 18, y: 74, s: 62 },
    { c: C.lilac, x: 60, y: 100, s: 54 },
  ],
  payments: [
    { c: C.sage, x: 76, y: 24, s: 72 },
    { c: C.sand, x: 14, y: 70, s: 62 },
    { c: C.sky, x: 86, y: 92, s: 54 },
  ],
  services: [
    { c: C.sky, x: 8, y: 30, s: 66 },
    { c: C.sand, x: 92, y: 58, s: 62 },
    { c: C.sage, x: 48, y: 104, s: 58 },
  ],
  process: [
    { c: C.sage, x: 86, y: 18, s: 64 },
    { c: C.sky, x: 14, y: 82, s: 66 },
    { c: C.sand, x: 62, y: 60, s: 46 },
  ],
  faq: [
    { c: C.lilac, x: 14, y: 24, s: 62 },
    { c: C.sky, x: 86, y: 70, s: 64 },
    { c: C.rose, x: 50, y: 108, s: 50 },
  ],
};

const DRIFT = ["animate-drift-a", "animate-drift-b", "animate-drift-c"] as const;

/**
 * Fixed, light, slowly drifting colour fields behind the page. The mood crossfades as
 * sections pass the middle of the viewport, and the whole field turns and rises with scroll.
 * Only opacity and transform change, so it stays on the compositor.
 */
export function Backdrop() {
  const theme = useBackdropTheme();
  const { enabled } = useMotionPreference();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 14]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas">
      <motion.div
        className="absolute -inset-x-[10%] -top-[10%] h-[140%]"
        style={enabled ? { y, rotate } : undefined}
      >
        {(Object.keys(THEMES) as BackdropTheme[]).map((name) => {
          const active = name === theme;
          return (
            <div
              key={name}
              className={cn(
                "absolute inset-0 transition-[opacity,visibility] duration-[1400ms] ease-out-soft",
                active ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              {THEMES[name].map((f, i) => (
                <div
                  key={f.c + f.x}
                  className="absolute"
                  style={{
                    left: `${f.x}%`,
                    top: `${f.y * 0.72}%`,
                    width: `${f.s}vmax`,
                    height: `${f.s}vmax`,
                  }}
                >
                  <div
                    className={cn(
                      "size-full -translate-x-1/2 -translate-y-1/2 rounded-full",
                      DRIFT[i],
                      !(active && enabled) && "[animation-play-state:paused]",
                    )}
                    style={{ background: `radial-gradient(closest-side, ${f.c}, transparent)` }}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </motion.div>
      {/* Keeps the top of the page bright and the fields from reading as "blobs". */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(244_245_247/0.35),rgb(244_245_247/0)_30%,rgb(244_245_247/0.25))]" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
