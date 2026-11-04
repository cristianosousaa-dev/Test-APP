"use client";

import { Check } from "lucide-react";
import { type KeyboardEvent, useMemo, useRef, useState } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { FLOWS, RUN_MS } from "@/components/flows/data";
import type { Flow, FlowNode } from "@/components/flows/types";
import { Container } from "@/components/ui/Container";
import { PauseButton } from "@/components/ui/PauseButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { useStepper } from "@/lib/useStepper";

/* After the last step: hold the finished run, fade it, then reset unseen and rerun. */
const HOLD_MS = 2800;
const FADE_MS = 700;
const RESET_MS = 120;

function StepIcon({ node }: { node: FlowNode }) {
  if (typeof node.icon === "string") return <BrandIcon brand={node.icon} className="size-[22px]" />;
  const Glyph = node.icon.glyph;
  return <Glyph className="size-[20px]" strokeWidth={1.6} />;
}

export function Examples() {
  const [activeId, setActiveId] = useState(FLOWS[0]?.id ?? "");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = FLOWS.find((f) => f.id === activeId) ?? FLOWS[0];

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
          kicker="Automação incluída"
          id="exemplos-title"
          title={
            <>
              E o que se repete <span className="text-accent-hi">passa a correr sozinho.</span>
            </>
          }
        >
          Além das aplicações, ligamos os sistemas que já utiliza e automatizamos as tarefas
          repetitivas. Seis exemplos de fluxos a funcionar, passo a passo, com as ferramentas que as
          empresas já utilizam. Exemplos ilustrativos.
        </SectionHead>

        <div className="fl-scope mt-10 sm:mt-14">
          <div
            role="tablist"
            aria-label="Exemplos de automações"
            onKeyDown={onKeyDown}
            data-reveal
            className="fl-tabs"
          >
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
                  className="fl-tab"
                >
                  <BrandIcon brand={f.mark} className="size-4" />
                  {f.tab}
                </button>
              );
            })}
          </div>

          <FlowPanel key={active.id} flow={active} />
        </div>
      </Container>
    </section>
  );
}

function FlowPanel({ flow }: { flow: Flow }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const steps = useMemo(
    () =>
      flow.order
        .map((id) => flow.nodes.find((n) => n.id === id))
        .filter((n): n is FlowNode => Boolean(n)),
    [flow],
  );
  const durations = useMemo(
    () => [...steps.map((n) => RUN_MS[n.kind]), HOLD_MS, FADE_MS, RESET_MS],
    [steps],
  );
  const { step, reduced } = useStepper(ref, durations, paused);
  const total = steps.length;
  // Past the last step: hold (complete), fade (complete, fading), reset (idle). Reduced motion rests complete.
  const phase = reduced || step <= total ? "run" : step === total + 1 ? "fade" : "reset";
  const current = reduced ? total : phase === "reset" ? -1 : Math.min(step, total);
  const running = current >= 0 && current < total ? steps[current] : undefined;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`panel-${flow.id}`}
      aria-labelledby={`tab-${flow.id}`}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: APG tabs; the panel itself takes focus.
      tabIndex={0}
      className="mt-6 grid animate-feed-in items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16"
    >
      <div className="ios fl-window" data-phase={phase}>
        <header className="fl-head">
          <h3 className="fl-title">{flow.name}</h3>
          <span className="fl-meta">
            <i data-done={current === total || undefined} />
            {current === total || phase === "reset"
              ? flow.runtime
              : `${Math.max(current, 0)}/${total}`}
          </span>
        </header>

        <ol className="fl-list" aria-label={`Passos da automação: ${flow.tab}`}>
          {steps.map((n, i) => {
            const state = i < current ? "done" : i === current ? "running" : "pending";
            return (
              <li key={n.id} className="fl-step" data-s={state}>
                <span className="fl-ic">
                  <StepIcon node={n} />
                </span>
                <span className="fl-txt">
                  <b>{n.output ? n.title : n.app}</b>
                  <small>{n.output ?? n.title}</small>
                </span>
                <span className="fl-state" aria-hidden>
                  {state === "done" && <Check strokeWidth={3.5} />}
                </span>
                <span className="sr-only">
                  {state === "done"
                    ? "Concluído"
                    : state === "running"
                      ? "A executar"
                      : "Por executar"}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="fl-foot">
          <p aria-live="off">
            {running
              ? `A executar · passo ${current + 1} de ${total}`
              : current === total || phase === "reset"
                ? `Execução concluída em ${flow.runtime} · ${total} passos · sem erros`
                : "À espera do próximo pedido"}
          </p>
          {!reduced && (
            <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} tone="light" />
          )}
        </div>
      </div>

      <dl className="fl-notes">
        <div>
          <dt>Hoje, à mão</dt>
          <dd>{flow.before}</dd>
        </div>
        <div>
          <dt>Com a automação</dt>
          <dd className="text-fg">{flow.after}</dd>
        </div>
        <div>
          <dt>Tempo poupado</dt>
          <dd className="tabular-nums text-fg">{flow.saving}</dd>
        </div>
      </dl>
    </div>
  );
}
