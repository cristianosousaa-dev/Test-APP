"use client";

import { Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import type { FlowNode } from "./data";

/** Canvas uses a 160×100 coordinate space; the container keeps the same 16:10 ratio. */
const W = 160;
const H = 100;

function layout(count: number): { x: number; y: number }[] {
  const span = 114;
  return Array.from({ length: count }, (_, i) => ({
    x: 23 + (count === 1 ? 0 : (i * span) / (count - 1)),
    y: i % 2 === 0 ? 26 : 74,
  }));
}

function edgePath(a: { x: number; y: number }, b: { x: number; y: number }): string {
  const midY = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
}

export type NodeState = "idle" | "active" | "done";

export function nodeState(index: number, step: number): NodeState {
  if (index < step) return "done";
  if (index === step) return "active";
  return "idle";
}

interface FlowCanvasProps {
  nodes: FlowNode[];
  step: number;
  cycle: number;
  animate: boolean;
}

export function FlowCanvas({ nodes, step, cycle, animate }: FlowCanvasProps) {
  const gradientId = useId();
  const points = layout(nodes.length);
  const edges = points.slice(1).map((p, i) => {
    const from = points[i] ?? p;
    return { d: edgePath(from, p), to: i + 1 };
  });

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="bg-dots absolute inset-0 opacity-60" aria-hidden />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 size-full"
        aria-hidden
        role="presentation"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-flow)" />
          </linearGradient>
        </defs>
        {edges.map((e) => {
          const lit = step >= e.to;
          return (
            <g key={e.d}>
              <path d={e.d} fill="none" stroke="#e4e4e7" strokeWidth={0.5} />
              <path
                d={e.d}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={0.6}
                strokeLinecap="round"
                strokeDasharray="2 1.5"
                className={cn(
                  "transition-opacity duration-500",
                  lit ? "opacity-100" : "opacity-0",
                  lit && animate && "animate-dash",
                )}
              />
              {animate && step === e.to && (
                <circle key={`${cycle}-${e.to}`} r={1.5} fill="var(--color-accent)">
                  <animateMotion
                    dur="0.75s"
                    fill="freeze"
                    path={e.d}
                    calcMode="spline"
                    keySplines="0.22 1 0.36 1"
                    keyTimes="0;1"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.8;1"
                    dur="0.75s"
                    fill="freeze"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {nodes.map((node, i) => {
        const p = points[i] ?? { x: 0, y: 0 };
        return (
          <div
            key={node.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
          >
            <NodeCard node={node} index={i} state={nodeState(i, step)} animate={animate} />
          </div>
        );
      })}
    </div>
  );
}

function NodeCard({
  node,
  index,
  state,
  animate,
}: {
  node: FlowNode;
  index: number;
  state: NodeState;
  animate: boolean;
}) {
  const Icon = node.icon;
  const active = state === "active";
  const done = state === "done";
  return (
    <motion.div
      className="relative"
      animate={{ scale: active ? 1.045 : 1, y: active ? -2 : 0 }}
      transition={{ duration: duration.base, ease }}
    >
      {active && animate && (
        <span
          className="animate-breathe absolute -inset-2 rounded-[18px] bg-accent/10"
          aria-hidden
        />
      )}
      <div
        className={cn(
          "relative flex w-[150px] items-center gap-2.5 rounded-xl border bg-surface px-2.5 py-2",
          "transition-[border-color,box-shadow] duration-500 ease-premium",
          active
            ? "border-accent/40 shadow-float ring-4 ring-accent/10"
            : "border-line shadow-card",
        )}
      >
        <span
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-lg transition-colors duration-500 ease-premium",
            active && "bg-accent text-white",
            done && "bg-accent-soft text-accent",
            state === "idle" && "bg-page text-muted",
          )}
        >
          <Icon className="size-4" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block font-mono text-[10px] text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "block text-[12.5px] leading-[1.2] font-medium",
              state === "idle" ? "text-ink-2" : "text-ink",
            )}
          >
            {node.label}
          </span>
          <span className="flex items-center gap-1 truncate text-[11px] text-muted">
            {node.ai && <Sparkles className="size-3 text-accent-2" aria-hidden />}
            {node.sub}
          </span>
        </span>
        {done && (
          <motion.span
            initial={animate ? { scale: 0.4, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: duration.quick, ease }}
            className="absolute -top-1.5 -right-1.5 grid size-4.5 place-items-center rounded-full bg-ok text-white ring-2 ring-surface"
          >
            <Check className="size-3" strokeWidth={3} aria-hidden />
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
