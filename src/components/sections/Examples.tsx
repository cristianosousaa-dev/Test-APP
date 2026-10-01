"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type KeyboardEvent, useRef, useState } from "react";
import { AutomationDemo } from "@/components/demos/AutomationDemo";
import { demos } from "@/components/demos/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";

export function Examples() {
  const [activeId, setActiveId] = useState(demos[0]?.id ?? "");
  const reduced = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = demos.find((d) => d.id === activeId) ?? demos[0];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = demos.findIndex((d) => d.id === activeId);
    const next = (i + (e.key === "ArrowRight" ? 1 : demos.length - 1)) % demos.length;
    const demo = demos[next];
    if (demo) {
      setActiveId(demo.id);
      tabRefs.current[next]?.focus();
    }
  }

  if (!active) return null;

  return (
    <section id="exemplos" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Exemplos"
          title="Veja automações a trabalhar"
          description="Seis exemplos de automações que construímos à medida de cada negócio. Escolha um setor e veja o fluxo a acontecer."
        />

        <Reveal className="mt-12">
          <div
            role="tablist"
            aria-label="Setores"
            onKeyDown={onKeyDown}
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
          >
            {demos.map((d, i) => {
              const selected = d.id === activeId;
              const Icon = d.sectorIcon;
              return (
                <button
                  key={d.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${d.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${d.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(d.id)}
                  className={cn(
                    "relative flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-[14px] font-medium whitespace-nowrap",
                    "transition-colors duration-200",
                    selected ? "text-white" : "text-ink-2 hover:text-ink",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="sector-pill"
                      className="absolute inset-0 rounded-full bg-ink shadow-card"
                      transition={reduced ? { duration: 0 } : { duration: duration.base, ease }}
                    />
                  )}
                  {!selected && (
                    <span className="absolute inset-0 rounded-full border border-line bg-page" />
                  )}
                  <Icon className="relative size-4" aria-hidden />
                  <span className="relative">{d.sector}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
            className="rounded-[28px] border border-line bg-page p-4 sm:p-6 lg:p-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduced
                    ? undefined
                    : { opacity: 0, y: -6, transition: { duration: duration.quick } }
                }
                transition={{ duration: duration.base, ease }}
              >
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div className="max-w-xl">
                    <h3 className="text-[22px] leading-tight font-semibold tracking-[-0.025em] text-ink sm:text-[26px]">
                      {active.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{active.summary}</p>
                  </div>
                  <span className="self-start rounded-full border border-line bg-surface px-3 py-1 text-[12px] text-muted sm:self-auto">
                    Exemplo ilustrativo
                  </span>
                </div>

                <AutomationDemo demo={active} />

                <ul className="mt-6 grid gap-3 border-t border-line pt-6 sm:grid-cols-3">
                  {active.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2.5 text-[14.5px] text-ink-2">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ok-soft text-ok">
                        <Check className="size-3" strokeWidth={3} aria-hidden />
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-[13px] text-muted">
          Cada automação é desenhada para os seus processos e ferramentas. Estes são apenas pontos
          de partida.
        </p>
      </div>
    </section>
  );
}
