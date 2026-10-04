"use client";

import { Check, Globe } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { type Brand, BrandIcon } from "@/components/brand/BrandIcon";
import { PauseButton } from "@/components/ui/PauseButton";
import { cn } from "@/lib/cn";
import { useStepper } from "@/lib/useStepper";

type Source = { brand: Brand } | { tag: string } | { site: true };

/* Four everyday requests, each told the same way: it arrives, it is handled, it is done. */
const SCENARIOS: {
  tab: string;
  source: Source;
  channel: string;
  message: string;
  actions: [string, string, string];
  result: string;
  detail: string;
}[] = [
  {
    tab: "Marcação",
    source: { brand: "whatsapp" },
    channel: "WhatsApp · cliente",
    message: "Olá, têm vaga amanhã de manhã para uma consulta?",
    actions: [
      "Pedido interpretado",
      "Agenda consultada: 10:00 livre",
      "Resposta enviada ao cliente",
    ],
    result: "Consulta marcada · amanhã, 10:00",
    detail: "Registada na agenda, com lembrete automático na véspera.",
  },
  {
    tab: "Cobrança",
    source: { tag: "MO" },
    channel: "Moloni · faturação",
    message: "Fatura FT 1182 de 185,00 € vencida há 5 dias.",
    actions: [
      "Referência Multibanco gerada",
      "Lembrete enviado por email",
      "Pagamento recebido e conciliado",
    ],
    result: "Fatura paga · 185,00 €",
    detail: "Marcada como paga, sem ninguém verificar o extrato.",
  },
  {
    tab: "Orçamento",
    source: { brand: "gmail" },
    channel: "Gmail · novo pedido",
    message: "Pedido de orçamento: limpeza de escritório, 120 m², semanal.",
    actions: [
      "Dados do pedido extraídos",
      "Tabela de preços aplicada",
      "Orçamento em PDF preparado",
    ],
    result: "Orçamento Nº 0413 enviado",
    detail: "Seguimento automático agendado para daqui a três dias.",
  },
  {
    tab: "Fornecedor",
    source: { brand: "outlook" },
    channel: "Outlook · anexo PDF",
    message: "Segue em anexo a fatura referente ao mês de outubro.",
    actions: ["Documento lido", "NIF e valores validados", "Lançada no programa de faturação"],
    result: "Fatura lançada · 342,80 €",
    detail: "Arquivada na pasta de outubro, pronta para o contabilista.",
  },
];

/*
 * Phases per scenario: 0 the request arrives · 1–3 one action each · 4 result · 5 fade out.
 * The fade is its own phase so a scenario never cuts to the next one.
 */
const DURATIONS = [1300, 950, 950, 950, 3000, 700];
const TOTAL = DURATIONS.reduce((a, b) => a + b, 0);
const DONE_BEFORE = 23; // the illustration opens mid-day, not on an empty counter

function SourceTile({ source }: { source: Source }) {
  const base = "grid size-10 shrink-0 place-items-center bg-white";
  if ("brand" in source)
    return (
      <span className={base}>
        <BrandIcon brand={source.brand} className="size-5" />
      </span>
    );
  if ("tag" in source)
    return <span className={`${base} font-mono text-[11px] text-navy`}>{source.tag}</span>;
  return (
    <span className={`${base} text-navy`}>
      <Globe className="size-5" strokeWidth={1.6} />
    </span>
  );
}

/** Hero illustration: one request at a time, told in three plain stages. */
export function HeroDemo() {
  // A pick bumps `run`, so even re-picking the scenario that started this run restarts it.
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
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // After a pick remounts the run, give focus back to the button that was pressed.
  useEffect(() => {
    if (focus >= 0) tabs.current[focus]?.focus();
  }, [focus]);
  const { step, cycle, reduced, running } = useStepper(ref, DURATIONS, paused);
  const p = reduced ? 4 : step;
  const index = (start + (reduced ? 0 : cycle)) % SCENARIOS.length;
  const s = SCENARIOS[index];
  const done = DONE_BEFORE + start + cycle + (p >= 4 ? 1 : 0);
  if (!s) return null;

  return (
    <div
      ref={ref}
      className="panel-navy panel-lift flex h-full flex-col p-6 ring-1 ring-white/10 sm:p-7"
    >
      <span aria-hidden className="marker top-0 left-0" />
      <p className="sr-only">
        Ilustração de uma automação: um pedido chega por WhatsApp, email ou faturação, a automação
        executa os passos necessários e o resultado fica registado, sem intervenção da equipa.
      </p>

      <div className="flex items-center justify-between">
        <span className="label text-[10.5px] text-white/75">Uma automação a trabalhar</span>
        <span className="font-mono text-[10px] tracking-wider text-white/75 uppercase">
          Exemplo ilustrativo
        </span>
      </div>

      {/* Scenario picker: the active one fills over its run time. */}
      <fieldset className="mt-5 grid grid-cols-4 gap-[2px]">
        <legend className="sr-only">Escolher exemplo</legend>
        {SCENARIOS.map((sc, i) => {
          const active = i === index;
          return (
            <button
              key={sc.tab}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              onClick={() => onPick(i)}
              aria-current={active || undefined}
              className={cn(
                "relative h-10 overflow-hidden px-1 text-[11px] transition-colors duration-300 sm:px-2 sm:text-[12px]",
                active ? "bg-white/14 text-white" : "bg-white/5 text-white/75 hover:bg-white/10",
              )}
            >
              <span className="relative z-10 truncate">{sc.tab}</span>
              {active && !reduced && (
                <span
                  key={cycle}
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
                  style={{
                    animation: `seg-fill ${TOTAL}ms linear both`,
                    animationPlayState: running ? "running" : "paused",
                  }}
                />
              )}
            </button>
          );
        })}
      </fieldset>

      {/* The story. Remounted per scenario so it enters fresh; phase 5 fades it out. */}
      <div aria-hidden className="relative mt-6 flex-1">
        <div
          key={`${index}-${cycle}`}
          className={cn(
            "demo-body flex h-full flex-col",
            p === 5 && "demo-out",
            reduced && "demo-static",
          )}
        >
          <Stage n={1} label="Chega um pedido" lit railLit={p >= 1}>
            <div className="flex items-start gap-3">
              <SourceTile source={s.source} />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] text-white/50 uppercase">{s.channel}</p>
                <p className="mt-1.5 bg-white px-3.5 py-2.5 text-[14px] leading-snug text-ink">
                  {s.message}
                </p>
              </div>
            </div>
          </Stage>

          <Stage n={2} label="A automação trata" lit={p >= 1} railLit={p >= 4}>
            <ul className="flex flex-col gap-2">
              {s.actions.map((a, i) => {
                const state = p > i + 1 ? "done" : p === i + 1 ? "now" : "next";
                return (
                  <li
                    key={a}
                    className="demo-action flex items-center gap-3 text-[14px]"
                    data-state={state}
                  >
                    <span className="demo-tick grid size-5 shrink-0 place-items-center">
                      {state === "done" ? (
                        <Check className="size-3 text-white" strokeWidth={3.2} />
                      ) : state === "now" ? (
                        <span className="demo-spin size-2.5" />
                      ) : null}
                    </span>
                    <span className="truncate">{a}</span>
                  </li>
                );
              })}
            </ul>
          </Stage>

          <Stage n={3} label="Fica feito" lit={p >= 4} last>
            <div
              className="demo-result flex items-start gap-3 bg-navy/85 p-3.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)]"
              data-on={p >= 4}
            >
              <span className="grid size-6 shrink-0 place-items-center bg-mint text-navy">
                <Check className="size-3.5" strokeWidth={3.2} />
              </span>
              <div className="min-w-0">
                <p className="text-[15px] leading-snug">{s.result}</p>
                <p className="mt-1 text-[13px] leading-snug text-white/70">{s.detail}</p>
              </div>
            </div>
          </Stage>
        </div>
      </div>

      <div className="-mx-6 -mb-6 mt-6 flex items-center justify-between gap-4 bg-navy/85 px-6 py-4 sm:-mx-7 sm:-mb-7 sm:px-7">
        <p className="text-[13px] text-white/85">
          Exemplo: pedidos tratados hoje{" "}
          <span
            key={done}
            className={cn(
              "ml-1 inline-block text-[15px] text-white tabular-nums",
              !reduced && "animate-feed-in",
            )}
          >
            {done}
          </span>
        </p>
        {!reduced && <PauseButton paused={paused} onToggle={onPause} tone="dark" />}
      </div>
    </div>
  );
}

/** One stage of the story, on a vertical rail that lights up as the request moves down. */
function Stage({
  n,
  label,
  lit,
  railLit = false,
  last = false,
  children,
}: {
  n: number;
  label: string;
  lit: boolean;
  railLit?: boolean;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-[28px_minmax(0,1fr)] gap-3",
        !last && "min-h-0 flex-1 pb-6",
      )}
    >
      <div className="relative flex justify-center">
        <span
          className={cn(
            "demo-node relative z-10 grid size-6 place-items-center font-mono text-[10px]",
            lit && "is-lit",
          )}
        >
          {n}
        </span>
        {!last && (
          <span className="absolute top-7 bottom-0 w-px bg-white/12">
            <span
              className={cn("demo-rail absolute inset-0 origin-top bg-accent", railLit && "is-lit")}
            />
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p
          className={cn(
            "label mb-2.5 text-[10px] transition-colors duration-500",
            lit ? "text-white/85" : "text-white/40",
          )}
        >
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}
