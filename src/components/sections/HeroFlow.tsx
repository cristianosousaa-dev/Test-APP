"use client";

import { useEffect, useRef, useState } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { FlowCanvas } from "@/components/flows/FlowCanvas";
import { HERO_FLOWS } from "@/components/flows/hero";
import { PauseButton } from "@/components/ui/PauseButton";
import { cn } from "@/lib/cn";
import { useStepper } from "@/lib/useStepper";

/* Every hero flow has four nodes: trigger, three actions, then hold the finished run and reset. */
const DURATIONS = [1100, 1300, 1300, 1300, 2600, 800] as const;
const NODES = 4;

/** Hero preview: an automation editor that runs one flow after another. */
export function HeroFlow() {
  // A pick bumps `run`, so even re-picking the current flow restarts it from the first node.
  // Pause lives here so a pick never undoes the visitor's choice to stop the motion.
  const [pick, setPick] = useState({ start: 0, run: 0, focus: -1 });
  const [paused, setPaused] = useState(false);
  return (
    <Run
      key={pick.run}
      start={pick.start}
      focus={pick.focus}
      paused={paused}
      onPause={() => setPaused((v) => !v)}
      onPick={(i) => setPick((p) => ({ start: i, run: p.run + 1, focus: i }))}
    />
  );
}

function Run({
  start,
  focus,
  paused,
  onPause,
  onPick,
}: {
  start: number;
  focus: number;
  paused: boolean;
  onPause: () => void;
  onPick: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const picks = useRef<(HTMLButtonElement | null)[]>([]);
  const scroller = useRef<HTMLDivElement>(null);
  const { step, cycle, reduced } = useStepper(ref, DURATIONS, paused);
  const index = (start + cycle) % HERO_FLOWS.length;
  const flow = HERO_FLOWS[index];

  // After a pick remounts the run, give focus back to the button that was pressed.
  useEffect(() => {
    if (focus >= 0) picks.current[focus]?.focus();
  }, [focus]);

  const canvasStep = reduced ? NODES : step > NODES ? -1 : step;
  const runningX = flow?.nodes.find((n) => n.id === flow.order[canvasStep])?.x;
  const stageW = flow?.stage?.[0] ?? 600;

  // On phones the stage is wider than the frame: follow the node that is running.
  useEffect(() => {
    const el = scroller.current;
    if (!el || runningX === undefined || el.scrollWidth <= el.clientWidth) return;
    const x = (runningX / stageW) * el.scrollWidth - el.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, x), behavior: "smooth" });
  }, [runningX, stageW]);

  if (!flow) return null;
  const done = canvasStep === NODES;

  return (
    <div ref={ref} className="tile window-lift overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-hair px-4 py-3">
        <span className="flex min-w-0 items-center gap-2.5 text-[13px]">
          <span aria-hidden className="flex shrink-0 gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="truncate text-fg">{flow.name}</span>
        </span>
        <span
          className={cn(
            "flex shrink-0 items-center gap-2 font-mono text-[10px] tracking-wider uppercase",
            done ? "text-[#1f9d68]" : "text-fg-3",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "size-1.5 rounded-full",
              done ? "bg-[#1f9d68]" : "animate-pulse bg-accent",
            )}
          />
          {done ? `Concluída · ${flow.runtime}` : "A executar"}
        </span>
      </div>

      <div ref={scroller} className="flow-scroll">
        <div key={flow.id} className="flow-frame is-fit animate-feed-in">
          <FlowCanvas flow={flow} step={canvasStep} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-hair p-2">
        <fieldset className="flex min-w-0 gap-[2px]">
          <legend className="sr-only">Escolher exemplo</legend>
          {HERO_FLOWS.map((f, i) => {
            const active = i === index;
            return (
              <button
                key={f.id}
                ref={(el) => {
                  picks.current[i] = el;
                }}
                type="button"
                onClick={() => onPick(i)}
                aria-current={active || undefined}
                className={cn(
                  "flex h-11 items-center gap-2 px-2.5 text-[12.5px] transition-colors duration-300",
                  active ? "bg-fg text-white" : "bg-chip text-fg hover:bg-[rgb(120_142_170/0.5)]",
                )}
              >
                <span className="grid size-6 shrink-0 place-items-center bg-white">
                  <BrandIcon brand={f.mark} className="size-4" />
                </span>
                <span className={active ? "pr-1 max-sm:sr-only" : "sr-only"}>{f.tab}</span>
              </button>
            );
          })}
        </fieldset>
        {!reduced && <PauseButton paused={paused} onToggle={onPause} tone="light" />}
      </div>

      <p className="sr-only" aria-live="off">
        {`Exemplo: ${flow.name}. ${flow.order
          .map((id) => flow.nodes.find((n) => n.id === id))
          .map((n) => (n ? `${n.app}, ${n.title}` : ""))
          .join("; ")}.`}
      </p>
    </div>
  );
}
