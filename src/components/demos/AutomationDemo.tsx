"use client";

import { Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import type { Demo } from "./data";
import { Feed } from "./Feed";
import { FlowCanvas, nodeState } from "./FlowCanvas";
import { useSequence } from "./useSequence";

export function AutomationDemo({ demo }: { demo: Demo }) {
  const ref = useRef<HTMLDivElement>(null);
  const { step, cycle, animate, running } = useSequence(ref, demo.nodes.length);
  const total = demo.nodes.length;
  const current = demo.nodes[Math.max(step, 0)];
  const progress = step < 0 ? 0 : (step + 1) / total;

  return (
    <div ref={ref}>
      {/* Screen readers get the steps once, instead of a looping live animation. */}
      <ol className="sr-only">
        {demo.nodes.map((node, i) => (
          <li key={node.label}>
            Passo {i + 1}: {node.label} ({node.sub})
          </li>
        ))}
      </ol>
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr] lg:gap-5" aria-hidden>
        <div className="flex flex-col gap-3">
          <div className="hidden sm:block">
            <FlowCanvas
              nodes={demo.nodes}
              step={step}
              cycle={cycle}
              animate={animate}
              running={running}
            />
          </div>
          <MobileSteps demo={demo} step={step} />
          <div className="flex items-center gap-3 px-1">
            <span className="text-[12px] text-muted tabular-nums">
              Passo {Math.max(step + 1, 0)} de {total}
              {current && step >= 0 && <span className="text-ink-2"> · {current.label}</span>}
            </span>
            <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-line">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-flow"
                animate={{ width: `${progress * 100}%` }}
                transition={
                  animate
                    ? { duration: step < 0 ? duration.quick : duration.slow, ease }
                    : { duration: 0 }
                }
              />
            </span>
          </div>
        </div>
        <Feed demo={demo} step={step} animate={animate} running={running} />
      </div>
    </div>
  );
}

function MobileSteps({ demo, step }: { demo: Demo; step: number }) {
  return (
    <ol className="flex flex-col rounded-2xl border border-line bg-surface p-2 sm:hidden">
      {demo.nodes.map((node, i) => {
        const state = nodeState(i, step);
        const Icon = node.icon;
        return (
          <li
            key={node.label}
            className={cn(
              "flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors duration-500",
              state === "active" && "bg-accent-soft",
            )}
          >
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-lg transition-colors duration-500",
                state === "active" && "bg-accent text-white",
                state === "done" && "bg-accent-soft text-accent",
                state === "idle" && "bg-page text-muted",
              )}
            >
              {state === "done" ? <Check className="size-4" /> : <Icon className="size-4" />}
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-medium text-ink">{node.label}</span>
              <span className="flex items-center gap-1 text-[11.5px] text-muted">
                {node.ai && <Sparkles className="size-3 text-accent-2" />}
                {node.sub}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
