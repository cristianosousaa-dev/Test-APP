"use client";

import { Check } from "lucide-react";
import { type KeyboardEvent, useLayoutEffect, useMemo, useRef, useState } from "react";
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

  // Slide one ink tile under the active tab (transform + width, measured once per change).
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
    <section id="exemplos" aria-labelledby="exemplos-title" className="relative py-28 sm:py-40">
      <Container>
        <SectionHead
          index="04"
          kicker="Casos de uso"
          id="exemplos-title"
          title={
            <>
              Veja quatro automações <span className="text-accent">a funcionar.</span>
            </>
          }
        >
          Escolha um exemplo para comparar a forma como o processo é feito hoje com a versão
          automatizada, passo a passo.
        </SectionHead>

        <div
          role="tablist"
          aria-label="Exemplos de automações"
          onKeyDown={onKeyDown}
          data-reveal
          className="relative -mx-5 mt-14 flex w-auto gap-[2px] overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:inline-flex sm:px-0"
        >
          {thumb && (
            <span
              aria-hidden
              className="absolute top-0 left-0 h-12 bg-fg transition-[transform,width] duration-500 ease-out-soft motion-reduce:transition-none"
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
                  "label relative flex h-12 shrink-0 items-center gap-2.5 pr-5 pl-1.5 text-[11.5px] transition-[background-color,color] duration-300",
                  selected ? "text-white" : "bg-chip text-fg hover:bg-[rgb(120_142_170/0.5)]",
                  selected && !thumb && "bg-fg",
                )}
              >
                <Mark mark={ex.mark} />
                {ex.tab}
              </button>
            );
          })}
        </div>

        <div className="tilt-in">
          <ExamplePanel key={active.id} example={active} />
        </div>
      </Container>
    </section>
  );
}

function ExamplePanel({ example }: { example: Example }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  // One extra phase at the end of each run: the preview fades out before it starts again.
  const durations = useMemo(() => [...example.durations, 900], [example]);
  const { step, reduced, running } = useStepper(ref, durations, paused);
  const fading = !reduced && step === example.steps.length;
  const { Preview } = example;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`panel-${example.id}`}
      aria-labelledby={`tab-${example.id}`}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: APG tabs; the panel itself takes focus.
      tabIndex={0}
      className="mt-[2px] grid animate-feed-in gap-[2px] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
    >
      <div className="tile flex flex-col p-6 sm:p-7">
        <p className="label text-[10.5px] text-fg-3">{example.sector}</p>
        <h3 className="mt-3 text-[26px] leading-[1.15] tracking-[-0.03em]">{example.title}</h3>

        <div className="mt-6 grid gap-[2px] text-[14.5px] leading-snug">
          <p className="bg-white/40 px-4 py-3">
            <span className="label mb-1.5 flex items-center gap-2 text-[10px] text-rose-ink">
              <span className="size-1.5 bg-rose-ink" />
              Processo atual
            </span>
            <span className="text-fg-2">{example.before}</span>
          </p>
          <p className="bg-white/80 px-4 py-3 shadow-[inset_2px_0_0_var(--color-accent)]">
            <span className="label mb-1.5 flex items-center gap-2 text-[10px] text-accent">
              <span className="size-1.5 bg-accent" />
              Processo automatizado
            </span>
            <span className="text-fg">{example.after}</span>
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
                  "flex items-center gap-3 px-2 py-1.5 text-[14.5px] transition-colors duration-300",
                  state === "now" && "bg-white/70",
                )}
              >
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center font-mono text-[10.5px] transition-colors duration-300",
                    state === "done" && "bg-accent text-white",
                    state === "now" && "bg-fg text-white",
                    state === "next" && "text-fg-3 shadow-[inset_0_0_0_1px_var(--color-hair-2)]",
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
          <span className="label text-[10px] text-fg-3">Integrações</span>
          {example.tools.map((t) => (
            <ToolChip key={t} tool={t} />
          ))}
        </div>
      </div>

      <div className="tile window-lift flex flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between gap-4 px-1 pt-1 pb-3">
          <span className="label flex items-center gap-3 text-[10.5px] text-fg-2">
            <span aria-hidden className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </span>
            Pré-visualização · {example.tab}
          </span>
          <span className="hidden font-mono text-[10px] tracking-wider text-fg-3 uppercase sm:inline">
            Exemplo ilustrativo · nomes e valores fictícios
          </span>
        </div>
        <div className={cn("preview-wrap", fading && "is-fading")}>
          <Preview step={Math.min(step, example.steps.length - 1)} />
        </div>
        {/* Step timeline: one segment per step, the current one fills over its duration. */}
        <div className="mt-3 flex items-stretch gap-[2px]">
          <ol aria-hidden className="flex flex-1 gap-[2px]">
            {example.steps.map((s, i) => (
              <li key={s} className="relative h-11 flex-1 overflow-hidden bg-white/50">
                <span
                  key={i === step ? `${i}-now` : `${i}-${i < step ? "done" : "next"}`}
                  className={cn(
                    "absolute inset-0 origin-left bg-accent",
                    i < step || reduced ? "scale-x-100" : "scale-x-0",
                  )}
                  style={
                    i === step && !reduced
                      ? {
                          animation: `seg-fill ${example.durations[i] ?? 2000}ms linear both`,
                          animationPlayState: running ? "running" : "paused",
                        }
                      : undefined
                  }
                />
                <span
                  className={cn(
                    "absolute inset-0 grid place-items-center font-mono text-[10.5px] transition-colors duration-300",
                    i < step || reduced ? "text-white" : "text-fg-2",
                  )}
                >
                  0{i + 1}
                </span>
              </li>
            ))}
          </ol>
          {!reduced && (
            <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} tone="light" />
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
      <span className="grid size-9 place-items-center bg-white">
        <BrandIcon brand={mark} className="size-5" />
      </span>
    );
  }
  const Icon = mark;
  return (
    <span className="grid size-9 place-items-center bg-accent text-white">
      <Icon className="size-[18px]" />
    </span>
  );
}
