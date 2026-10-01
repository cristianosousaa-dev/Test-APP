"use client";

import { Check } from "lucide-react";
import { type KeyboardEvent, useRef, useState } from "react";
import { bookings } from "@/components/previews/Bookings";
import { leads } from "@/components/previews/Leads";
import { payments } from "@/components/previews/Payments";
import { quotes } from "@/components/previews/Quotes";
import type { Example } from "@/components/previews/types";
import { AppIcon } from "@/components/ui/AppIcon";
import { Container } from "@/components/ui/Container";
import { PauseButton } from "@/components/ui/PauseButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";
import { useStepper } from "@/lib/useStepper";

const EXAMPLES: Example[] = [bookings, quotes, leads, payments];

export function Examples() {
  const [activeId, setActiveId] = useState(EXAMPLES[0]?.id ?? "");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = EXAMPLES.find((e) => e.id === activeId) ?? EXAMPLES[0];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = EXAMPLES.findIndex((x) => x.id === activeId);
    const last = EXAMPLES.length - 1;
    const next = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const ex = EXAMPLES[next];
    if (!ex) return;
    setActiveId(ex.id);
    tabs.current[next]?.focus();
  }

  if (!active) return null;

  return (
    <section id="exemplos" aria-labelledby="exemplos-title" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHead kicker="Exemplos" id="exemplos-title" title="Veja automações a trabalhar.">
          Escolha um exemplo. Cada um mostra como é hoje, como fica com a automação e o que acontece
          passo a passo.
        </SectionHead>

        <div
          role="tablist"
          aria-label="Exemplos de automações"
          onKeyDown={onKeyDown}
          data-reveal
          className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0"
        >
          {EXAMPLES.map((ex, i) => {
            const selected = ex.id === activeId;
            return (
              <button
                key={ex.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${ex.id}`}
                aria-selected={selected}
                aria-controls={`panel-${ex.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(ex.id)}
                className={cn(
                  "flex h-12 shrink-0 items-center gap-2.5 rounded-full pr-5 pl-1.5 text-[15px] font-medium transition-[background-color,color,box-shadow] duration-200",
                  selected
                    ? "bg-ink text-white"
                    : "bg-paper text-ink-2 ring-1 ring-line hover:bg-white hover:text-ink hover:ring-line-2",
                )}
              >
                <AppIcon app={ex.app} className="size-9 rounded-full" />
                {ex.tab}
              </button>
            );
          })}
        </div>

        <ExamplePanel key={active.id} example={active} />
      </Container>
    </section>
  );
}

function ExamplePanel({ example }: { example: Example }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const { step, reduced } = useStepper(ref, example.durations, paused);
  const { Preview } = example;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`panel-${example.id}`}
      aria-labelledby={`tab-${example.id}`}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: APG tabs; the panel itself takes focus.
      tabIndex={0}
      className="mt-6 grid animate-feed-in gap-6 rounded-[32px] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8"
    >
      <div className="flex flex-col rounded-[28px] bg-paper p-6 sm:p-7">
        <p className="text-[13.5px] text-mute">{example.sector}</p>
        <h3 className="mt-1.5 text-[24px] leading-tight font-semibold tracking-[-0.025em]">
          {example.title}
        </h3>

        <div className="mt-5 grid gap-2 text-[14.5px] leading-snug">
          <p className="rounded-2xl bg-white px-4 py-3 ring-1 ring-line">
            <span className="mb-0.5 flex items-center gap-2 text-[12px] font-semibold text-rose-ink uppercase">
              <span className="size-2 rounded-full bg-rose-ink" />
              Hoje, à mão
            </span>
            <span className="text-ink-2">{example.before}</span>
          </p>
          <p className="rounded-2xl bg-lime-soft px-4 py-3 ring-1 ring-lime-2/50">
            <span className="mb-0.5 flex items-center gap-2 text-[12px] font-semibold text-lime-ink uppercase">
              <span className="size-2 rounded-full bg-lime-ink" />
              Com a automação
            </span>
            <span className="font-medium text-ink">{example.after}</span>
          </p>
        </div>

        <ol className="mt-6 flex flex-col gap-1" aria-label="Passos">
          {example.steps.map((s, i) => {
            const state = i < step ? "done" : i === step ? "now" : "next";
            return (
              <li
                key={s}
                aria-current={state === "now" ? "step" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-2 py-1.5 text-[14.5px] transition-colors duration-300",
                  state === "now" && "bg-white shadow-[0_0_0_1px_var(--color-line)]",
                )}
              >
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full text-[11.5px] font-semibold transition-colors duration-300",
                    state === "done" && "bg-ink text-lime",
                    state === "now" && "bg-lime text-ink",
                    state === "next" && "text-mute ring-1 ring-line-2",
                  )}
                >
                  {state === "done" ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
                </span>
                <span className={state === "next" ? "text-mute" : "text-ink"}>{s}</span>
              </li>
            );
          })}
        </ol>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <span className="text-[12.5px] text-mute">Ligado a</span>
          {example.tools.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white px-3 py-1 text-[12.5px] font-medium ring-1 ring-line"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div>
        <Preview step={step} />
        <div className="mt-3 flex items-center justify-between text-[12.5px] text-mute">
          <span>Exemplo ilustrativo · nomes e valores fictícios</span>
          {!reduced && <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} />}
        </div>
      </div>
    </div>
  );
}
