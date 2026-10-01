"use client";

import { CircleCheck, FileText, MessageCircle, MoveDown, Wrench } from "lucide-react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useMotionPreference } from "@/lib/motion-preference";

interface ConnectorProps {
  /** Start x as a fraction of the content width (desktop). */
  from: number;
  /** Start x on small screens. */
  fromMobile?: number;
  /** What travels from the previous section into the next one. */
  label: string;
  icon: keyof typeof ICONS;
}

/* Icons by name: the page is a server component and cannot pass components down. */
const ICONS = {
  message: MessageCircle,
  check: CircleCheck,
  wrench: Wrench,
  file: FileText,
  down: MoveDown,
};

const NODE_X = 6; // centre of the section label node

/**
 * The wire between two sections. It draws itself as you scroll, carrying a small packet that
 * names what moves from one part of the story to the next, and docks into the next section's
 * node. The page reads as one connected flow, like the automations it describes.
 */
export function Connector({ from, fromMobile = 0.5, label, icon }: ConnectorProps) {
  const Icon = ICONS[icon];
  const box = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const { enabled } = useMotionPreference();
  const [size, setSize] = useState({ w: 0, h: 0, mobile: false });
  const { scrollYProgress } = useScroll({ target: box, offset: ["start 88%", "end 42%"] });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const packetOpacity = useTransform(scrollYProgress, [0, 0.06, 0.9, 1], [0, 1, 1, 0]);
  const packetScale = useTransform(scrollYProgress, [0.9, 1], [1, 0.6]);
  const endScale = useTransform(scrollYProgress, [0.92, 1], [0, 1]);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry?.contentRect;
      if (r) setSize({ w: r.width, h: r.height, mobile: window.innerWidth < 1024 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h, mobile } = size;
  const sx = Math.max(NODE_X, w * (mobile ? fromMobile : from));
  const d = w ? `M ${sx} 0 C ${sx} ${h * 0.55}, ${NODE_X} ${h * 0.45}, ${NODE_X} ${h + 10}` : "";

  function place(p: number) {
    const el = path.current;
    if (!el || !d) return;
    const total = el.getTotalLength();
    const pt = el.getPointAtLength(Math.min(Math.max(p, 0), 1) * total);
    x.set(pt.x);
    y.set(pt.y);
  }
  useMotionValueEvent(scrollYProgress, "change", place);
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-place when the path changes.
  useLayoutEffect(() => place(scrollYProgress.get()), [d]);

  return (
    <Container>
      <div ref={box} aria-hidden className="relative h-[140px] sm:h-[200px]">
        {w > 0 && (
          <svg className="absolute inset-0 size-full overflow-visible" fill="none" aria-hidden>
            <path
              d={d}
              stroke="currentColor"
              strokeWidth="1.25"
              strokeDasharray="2 6"
              className="text-ink/20"
            />
            <motion.path
              ref={path}
              d={d}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-ink"
              style={{ pathLength: enabled ? scrollYProgress : 1 }}
            />
            <circle cx={sx} cy={0} r={3.5} className="fill-ink" />
            <motion.circle
              cx={NODE_X}
              cy={h + 10}
              r={9}
              className="fill-none stroke-ink/30"
              strokeWidth={1}
              style={{ scale: enabled ? endScale : 1, transformOrigin: `${NODE_X}px ${h + 10}px` }}
            />
          </svg>
        )}
        {enabled && w > 0 && (
          <motion.div
            className="pointer-events-none absolute top-0 left-0"
            style={{ x, y, opacity: packetOpacity, scale: packetScale }}
          >
            <span className="glass -translate-x-[18px] -translate-y-1/2 flex h-9 items-center gap-2 rounded-full pr-3.5 pl-1.5 text-[12.5px] font-medium whitespace-nowrap text-ink">
              <span className="grid size-6 place-items-center rounded-full bg-ink text-white">
                <Icon className="size-3.5" strokeWidth={2} />
              </span>
              {label}
            </span>
          </motion.div>
        )}
      </div>
    </Container>
  );
}
