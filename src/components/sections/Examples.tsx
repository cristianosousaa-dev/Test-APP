"use client";

import { Check } from "lucide-react";
import { type KeyboardEvent, useLayoutEffect, useRef, useState } from "react";
import { BrandIcon, ToolChip } from "@/components/brand/BrandIcon";
import { bookings } from "@/components/previews/Bookings";
import { leads } from "@/components/previews/Leads";
import { payments } from "@/components/previews/Payments";
import { quotes } from "@/components/previews/Quotes";
import type { Example } from "@/components/previews/types";
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
  const [thumb, setThumb] = useState<{ x: number; w: number } | null>(null);

  // Slide one dark thumb under the active tab (transform + width, measured once per change).
  useLayoutEffect(() => {
    const i = EXAMPLES.findIndex((e) => e.id === activeId);
    const el = tabs.current[i];
    if (!el) return;
    const measure = () => setThumb({ x: el.offsetLeft, w: el.offsetWidth });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeId]);

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
    <section id="exemplos" aria-labelledby="exemplos-title" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-[700px] bg-[radial-gradient(45%_50%_at_70%_50%,rgb(110_123_255/0.09),transparent)]"
      />
      <Container>
        <SectionHead
          index="05"
          kicker="Casos de uso"
          id="exemplos-title"
          title="Quatro processos, do início ao fim."
        >
          Selecione um caso para ver o processo atual, o processo automatizado e cada etapa da
          execução.
        </SectionHead>

        <div
          role="tablist"
          aria-label="Exemplos de automações"
          onKeyDown={onKeyDown}
          data-reveal
          className="relative -mx-5 mt-12 flex w-auto gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:inline-flex sm:rounded-full sm:bg-white/[0.04] sm:p-1.5 sm:shadow-[inset_0_0_0_1px_var(--color-hair)]"
        >
          {thumb && (
            <span
              aria-hidden
              className="absolute top-0 left-0 h-12 rounded-full bg-white/[0.1] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14),inset_0_1px_0_rgb(255_255_255/0.12)] transition-[transform,width] duration-500 ease-out-soft motion-reduce:transition-none sm:top-1.5"
              style={{ width: thumb.w, transform: `translateX(${thumb.x}px)` }}
            />
          )}
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
                  "relative flex h-12 shrink-0 items-center gap-2.5 rounded-full pr-5 pl-1.5 text-[15px] font-medium transition-[background-color,color] duration-300",
                  selected ? "text-fg" : "text-fg-2 hover:text-fg",
                  selected && !thumb && "bg-white/10",
                )}
              >
                <Mark mark={ex.mark} />
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
      className="mt-6 grid animate-feed-in gap-4 rounded-[32px] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-6"
    >
      <div className="surface flex flex-col p-6 sm:p-7">
        <p className="kicker !text-[10.5px] !text-fg-3">{example.sector}</p>
        <h3 className="mt-2.5 text-[23px] leading-tight font-semibold tracking-[-0.025em] [font-stretch:106%]">
          {example.title}
        </h3>

        <div className="mt-5 grid gap-2 text-[14.5px] leading-snug">
          <p className="rounded-2xl bg-white/[0.03] px-4 py-3 shadow-[inset_0_0_0_1px_var(--color-hair)]">
            <span className="mb-1 flex items-center gap-2 font-mono text-[10.5px] tracking-wider text-[#ff8a8a] uppercase">
              <span className="size-1.5 rounded-full bg-[#ff8a8a]" />
              Processo atual
            </span>
            <span className="text-fg-2">{example.before}</span>
          </p>
          <p className="rounded-2xl bg-accent/[0.07] px-4 py-3 shadow-[inset_0_0_0_1px_rgb(61_224_160/0.22)]">
            <span className="mb-1 flex items-center gap-2 font-mono text-[10.5px] tracking-wider text-accent uppercase">
              <span className="size-1.5 rounded-full bg-accent" />
              Processo automatizado
            </span>
            <span className="font-medium text-fg">{example.after}</span>
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
                  state === "now" && "bg-white/[0.06] shadow-[inset_0_0_0_1px_var(--color-hair)]",
                )}
              >
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full text-[11.5px] font-semibold transition-colors duration-300",
                    state === "done" && "bg-accent text-accent-ink",
                    state === "now" && "bg-white text-base",
                    state === "next" && "text-fg-3 ring-1 ring-hair-2",
                  )}
                >
                  {state === "done" ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
                </span>
                <span className={state === "next" ? "text-fg-3" : "text-fg"}>{s}</span>
              </li>
            );
          })}
        </ol>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <span className="font-mono text-[10.5px] tracking-wider text-fg-3 uppercase">
            Integrações
          </span>
          {example.tools.map((t) => (
            <ToolChip key={t} tool={t} />
          ))}
        </div>
      </div>

      <div>
        <div className="glass rounded-[32px] p-2">
          <Preview step={step} />
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[10.5px] tracking-wide text-fg-3 uppercase">
          <span>Exemplo ilustrativo · nomes e valores fictícios</span>
          {!reduced && (
            <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} tone="dark" />
          )}
        </div>
      </div>
    </div>
  );
}

/** Tab mark: the tool's official logo, or a generic icon on a neutral tile. */
function Mark({ mark }: { mark: Example["mark"] }) {
  if (typeof mark === "string") {
    return (
      <span className="grid size-9 place-items-center rounded-full bg-white shadow-[0_0_0_1px_rgb(17_19_21/0.08)]">
        <BrandIcon brand={mark} className="size-5" />
      </span>
    );
  }
  const Icon = mark;
  return (
    <span className="grid size-9 place-items-center rounded-full bg-accent/15 text-accent">
      <Icon className="size-[18px]" />
    </span>
  );
}
