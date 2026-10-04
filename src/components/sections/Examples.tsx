"use client";

import { type KeyboardEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { FLOWS, RUN_MS } from "@/components/flows/data";
import { FlowCanvas, STAGE } from "@/components/flows/FlowCanvas";
import type { Flow } from "@/components/flows/types";
import { Container } from "@/components/ui/Container";
import { PauseButton } from "@/components/ui/PauseButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";
import { useStepper } from "@/lib/useStepper";

/* After the last node: hold the finished run, then a short reset before it starts again. */
const HOLD_MS = 2800;
const RESET_MS = 900;

export function Examples() {
  const [activeId, setActiveId] = useState(FLOWS[0]?.id ?? "");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = FLOWS.find((f) => f.id === activeId) ?? FLOWS[0];
  const [thumb, setThumb] = useState<{ x: number; w: number } | null>(null);

  // Slide one ink tile under the active tab (transform + width, measured once per change).
  useLayoutEffect(() => {
    const i = FLOWS.findIndex((f) => f.id === activeId);
    const el = tabs.current[i];
    if (!el) return;
    const measure = () => setThumb({ x: el.offsetLeft, w: el.offsetWidth });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeId]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = FLOWS.findIndex((f) => f.id === activeId);
    const last = FLOWS.length - 1;
    const next = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const f = FLOWS[next];
    if (!f) return;
    setActiveId(f.id);
    tabs.current[next]?.focus();
  }

  if (!active) return null;

  return (
    <section
      id="exemplos"
      aria-labelledby="exemplos-title"
      className="relative py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          index="04"
          kicker="Casos de uso"
          id="exemplos-title"
          title={
            <>
              Seis automações, <span className="text-accent">a correr à sua frente.</span>
            </>
          }
        >
          Cada exemplo mostra o fluxo tal como funciona: o que o dispara, o que acontece em cada
          passo e o resultado. As ferramentas são as que as empresas já utilizam.
        </SectionHead>

        <div
          role="tablist"
          aria-label="Exemplos de automações"
          onKeyDown={onKeyDown}
          data-reveal
          className="relative -mx-5 mt-10 sm:mt-14 flex w-auto gap-[2px] overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0"
        >
          {thumb && (
            <span
              aria-hidden
              className="absolute top-0 left-0 h-12 bg-fg transition-[transform,width] duration-500 ease-out-soft motion-reduce:transition-none"
              style={{ width: thumb.w, transform: `translateX(${thumb.x}px)` }}
            />
          )}
          {FLOWS.map((f, i) => {
            const selected = f.id === activeId;
            return (
              <button
                key={f.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${f.id}`}
                aria-selected={selected}
                aria-controls={`panel-${f.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(f.id)}
                className={cn(
                  "label relative flex h-12 shrink-0 items-center gap-2.5 pr-5 pl-1.5 text-[11.5px] transition-[background-color,color] duration-300",
                  selected ? "text-white" : "bg-chip text-fg hover:bg-[rgb(120_142_170/0.5)]",
                  selected && !thumb && "bg-fg",
                )}
              >
                <span className="grid size-9 place-items-center bg-white">
                  <BrandIcon brand={f.mark} className="size-5" />
                </span>
                {f.tab}
              </button>
            );
          })}
        </div>

        <div className="tilt-in">
          <FlowPanel key={active.id} flow={active} />
        </div>
      </Container>
    </section>
  );
}

function FlowPanel({ flow }: { flow: Flow }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const kinds = useMemo(() => new Map(flow.nodes.map((n) => [n.id, n])), [flow]);
  const durations = useMemo(
    () => [...flow.order.map((id) => RUN_MS[kinds.get(id)?.kind ?? "action"]), HOLD_MS, RESET_MS],
    [flow, kinds],
  );
  const { step, reduced } = useStepper(ref, durations, paused);
  const total = flow.order.length;
  // Reduced motion rests on the finished run; the reset phase clears the canvas (step -1).
  const canvasStep = reduced ? total : step > total ? -1 : step;
  const runningNode =
    canvasStep >= 0 && canvasStep < total ? kinds.get(flow.order[canvasStep] ?? "") : undefined;

  const stageW = (flow.stage ?? STAGE)[0];

  // On narrow screens the canvas scrolls sideways: keep the node that is running in view.
  useEffect(() => {
    const el = scroller.current;
    if (!el || !runningNode || el.scrollWidth <= el.clientWidth) return;
    const x = (runningNode.x / stageW) * el.scrollWidth - el.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, x), behavior: "smooth" });
  }, [runningNode, stageW]);

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`panel-${flow.id}`}
      aria-labelledby={`tab-${flow.id}`}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: APG tabs; the panel itself takes focus.
      tabIndex={0}
      className="mt-[2px] grid animate-feed-in gap-[2px]"
    >
      <div className="tile window-lift overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b border-hair px-4 py-3 sm:px-5">
          <span className="flex min-w-0 items-center gap-3 text-[13px]">
            <span aria-hidden className="flex shrink-0 gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="truncate text-fg-3">
              Automações <span aria-hidden>/</span> <span className="text-fg">{flow.name}</span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2.5 text-[12.5px] text-fg-2">
            <span className="hidden font-mono text-[10px] tracking-wider text-fg-3 uppercase md:inline">
              Exemplo ilustrativo
            </span>
            <span aria-hidden className="flow-toggle" />
            Ativa
          </span>
        </div>

        <div className="relative">
          <div ref={scroller} className="flow-scroll">
            <div className="flow-frame">
              <FlowCanvas flow={flow} step={canvasStep} />
            </div>
          </div>
          {/* Editor chrome, purely decorative. */}
          <span aria-hidden className="flow-zoom">
            <span>+</span>
            <span>−</span>
            <span>⤢</span>
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-hair py-2 pr-2 pl-4 sm:pl-5">
          <p className="flex min-w-0 items-center gap-2.5 text-[13px]" aria-live="off">
            {runningNode ? (
              <>
                <span
                  aria-hidden
                  className="size-2 shrink-0 animate-pulse rounded-full bg-accent"
                />
                <span className="truncate text-fg-2">
                  A executar · passo {canvasStep + 1} de {total}:{" "}
                  <span className="text-fg">
                    {runningNode.app}, {runningNode.title.toLowerCase()}
                  </span>
                </span>
              </>
            ) : canvasStep === total ? (
              <>
                <span aria-hidden className="size-2 shrink-0 rounded-full bg-[#1f9d68]" />
                <span className="truncate text-fg-2">
                  Execução concluída em <span className="text-fg tabular-nums">{flow.runtime}</span>{" "}
                  · {total} passos · sem erros
                </span>
              </>
            ) : (
              <span className="text-fg-3">À espera do próximo pedido</span>
            )}
          </p>
          {!reduced && (
            <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} tone="light" />
          )}
        </div>
      </div>

      {/* The same flow in words, for screen readers (the canvas is decorative). */}
      <ol className="sr-only" aria-label={`Passos da automação: ${flow.tab}`}>
        {flow.order.map((id) => {
          const n = kinds.get(id);
          return n ? (
            <li key={id}>{`${n.app}: ${n.title}${n.output ? `. Resultado: ${n.output}` : ""}`}</li>
          ) : null;
        })}
      </ol>

      <div className="grid gap-[2px] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.7fr]">
        <div className="tile p-5">
          <p className="label flex items-center gap-2 text-[10px] text-rose-ink">
            <span className="size-1.5 bg-rose-ink" />
            Hoje, à mão
          </p>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg-2">{flow.before}</p>
        </div>
        <div className="tile p-5 shadow-[inset_2px_0_0_var(--color-accent)]">
          <p className="label flex items-center gap-2 text-[10px] text-accent">
            <span className="size-1.5 bg-accent" />
            Com a automação
          </p>
          <p className="mt-2 text-[14px] leading-[1.55] text-fg">{flow.after}</p>
        </div>
        <div className="panel-navy flex items-center justify-between gap-4 p-5 text-white sm:col-span-2 lg:col-span-1 lg:flex-col lg:items-start lg:justify-center">
          <p className="label text-[10px] text-white/70">Tempo poupado</p>
          <p className="font-display text-[30px] leading-none tracking-[-0.04em] tabular-nums lg:mt-1">
            {flow.saving}
          </p>
        </div>
      </div>
    </div>
  );
}
