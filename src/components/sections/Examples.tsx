"use client";

import { AnimatePresence, motion } from "motion/react";
import { type KeyboardEvent, useRef, useState } from "react";
import { bookings } from "@/components/previews/Bookings";
import { leads } from "@/components/previews/Leads";
import { payments } from "@/components/previews/Payments";
import { quotes } from "@/components/previews/Quotes";
import type { PreviewConfig } from "@/components/previews/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "@/components/visual/Bits";
import { cn } from "@/lib/cn";
import { fade, instant, spring } from "@/lib/motion";
import { useMotionPreference } from "@/lib/motion-preference";
import { useLoop } from "@/lib/useLoop";

const PREVIEWS: PreviewConfig[] = [bookings, quotes, leads, payments];

export function Examples() {
  const [activeId, setActiveId] = useState(PREVIEWS[0]?.id ?? "");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { reduced } = useMotionPreference();
  const active = PREVIEWS.find((p) => p.id === activeId) ?? PREVIEWS[0];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = PREVIEWS.findIndex((p) => p.id === activeId);
    const last = PREVIEWS.length - 1;
    const target = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (target === undefined) return;
    e.preventDefault();
    const next = PREVIEWS[target];
    if (next) {
      setActiveId(next.id);
      tabRefs.current[target]?.focus();
    }
  }

  if (!active) return null;

  return (
    <section id="exemplos" className="py-24 sm:py-32">
      <Container>
        <Reveal className="max-w-[40rem]">
          <p className="text-[14px] text-mute">Exemplos</p>
          <h2 className="mt-3 text-[34px] leading-[1.1] font-medium tracking-[-0.028em] sm:text-[44px]">
            Veja como fica no seu dia a dia.
          </h2>
          <p className="mt-4 text-[17px] leading-[1.6] text-ink-2">
            Quatro automações que construímos à medida. Os nomes e valores são ilustrativos; os
            fluxos são reais.
          </p>
        </Reveal>

        <Reveal layoutScroll className="mt-10 -mx-6 overflow-x-auto px-6 pb-1 sm:mx-0 sm:px-0">
          <div
            role="tablist"
            aria-label="Exemplos de automações"
            onKeyDown={onKeyDown}
            className="glass inline-flex gap-0.5 rounded-full p-1"
          >
            {PREVIEWS.map((p, i) => {
              const selected = p.id === activeId;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${p.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(p.id)}
                  className={cn(
                    "relative h-10 rounded-full px-4 text-[14px] font-medium whitespace-nowrap transition-colors duration-200 sm:px-5",
                    selected ? "text-ink" : "text-ink-2 hover:text-ink",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="tab-thumb"
                      className="absolute inset-0 rounded-full bg-paper shadow-[0_1px_2px_rgb(15_16_18/0.08),0_4px_12px_-4px_rgb(15_16_18/0.16)]"
                      transition={reduced ? instant : spring}
                    />
                  )}
                  <span className="relative">{p.tab}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: APG tabs pattern, the panel has no focusable content so it must be focusable itself.
          tabIndex={0}
          className="mt-8 rounded-[28px]"
        >
          {/* No initial={false} here: it would propagate to every motion element mounted
              later inside the first panel and skip their entrances (e.g. the step bar). */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, transition: fade }}
              transition={reduced ? instant : spring}
            >
              <PreviewPanel preview={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

function PreviewPanel({ preview }: { preview: PreviewConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const { step, cycle, animate, running } = useLoop(ref, preview.durations);
  const { Stage } = preview;

  return (
    <div
      ref={ref}
      className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12"
    >
      <div className="flex flex-col">
        <p className="text-[13.5px] text-mute">{preview.sector}</p>
        <h3 className="mt-2 text-[22px] leading-[1.2] font-medium tracking-[-0.02em] sm:text-[26px]">
          {preview.title}
        </h3>
        <p className="mt-3 text-[15.5px] leading-[1.6] text-ink-2">{preview.description}</p>

        <ol className="mt-8 flex flex-col">
          {preview.steps.map((label, i) => {
            const state = i < step ? "done" : i === step ? "current" : "next";
            return (
              <li
                key={label}
                className="border-t border-hair py-3"
                aria-current={state === "current" ? "step" : undefined}
              >
                <div className="flex items-center gap-3 text-[15px]">
                  <span
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-full text-[11px] tabular-nums transition-colors duration-300",
                      state === "done" && "bg-ink text-white",
                      state === "current" && "bg-ink text-white",
                      state === "next" && "text-mute ring-1 ring-hair-2",
                    )}
                  >
                    {state === "done" ? <Check className="size-3" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "transition-colors duration-300",
                      state === "current"
                        ? "font-medium text-ink"
                        : state === "done"
                          ? "text-ink-2"
                          : "text-mute",
                    )}
                  >
                    {label}
                  </span>
                </div>
                {state === "current" && (
                  <div className="mt-2.5 ml-8 h-[2px] overflow-hidden rounded-full bg-hair">
                    <motion.div
                      key={`${cycle}-${step}-${running}`}
                      className="h-full bg-ink"
                      initial={{ width: animate ? "0%" : "100%" }}
                      animate={{ width: running || !animate ? "100%" : "0%" }}
                      transition={
                        running
                          ? { duration: (preview.durations[step] ?? 2000) / 1000, ease: "linear" }
                          : instant
                      }
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <ul className="mt-6 flex flex-col gap-2 text-[14.5px] text-ink-2">
          {preview.outcomes.map((o) => (
            <li key={o} className="flex items-center gap-2.5">
              <Check className="text-go" />
              {o}
            </li>
          ))}
        </ul>
      </div>

      <Stage step={step} cycle={cycle} animate={animate} running={running} />
    </div>
  );
}
