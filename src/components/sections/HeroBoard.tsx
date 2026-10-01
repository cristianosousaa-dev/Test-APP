"use client";

import { type LucideIcon, Receipt, Wallet } from "lucide-react";
import { useRef, useState } from "react";
import { type Brand, BrandIcon } from "@/components/brand/BrandIcon";
import { LinkButton } from "@/components/ui/Button";
import { PauseButton } from "@/components/ui/PauseButton";
import { useStepper } from "@/lib/useStepper";

type Source = { brand: Brand } | { icon: LucideIcon; tint: string };

const EVENTS: { source: Source; from: string; title: string; detail: string }[] = [
  {
    source: { brand: "whatsapp" },
    from: "WhatsApp",
    title: "Pedido de marcação",
    detail: "Respondido e agendado: sexta, 15:30",
  },
  {
    source: { icon: Receipt, tint: "bg-accent" },
    from: "Faturação",
    title: "Fatura FT 1187 paga",
    detail: "185,00 € registados na contabilidade",
  },
  {
    source: { brand: "gmail" },
    from: "Gmail",
    title: "Novo pedido de orçamento",
    detail: "Orçamento preparado e enviado",
  },
  {
    source: { brand: "googleCalendar" },
    from: "Google Calendar",
    title: "Lembrete enviado",
    detail: "Paulo Sousa · consulta amanhã, 10:00",
  },
  {
    source: { brand: "outlook" },
    from: "Outlook",
    title: "Fatura de fornecedor recebida",
    detail: "Dados extraídos e lançados",
  },
  {
    source: { icon: Wallet, tint: "bg-navy-3" },
    from: "Cobranças",
    title: "Fatura vencida há 5 dias",
    detail: "Lembrete enviado com referência Multibanco",
  },
];
const DURATIONS = EVENTS.map(() => 2800);

/* Illustrative cumulative curve for the day: slow morning, steady afternoon. */
const CURVE = (() => {
  const pts: string[] = [];
  const N = 40;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const ease = t < 0.15 ? t * t * 2.2 : 0.0495 + (t - 0.15) * 1.12;
    const wobble = Math.sin(i * 1.7) * 0.006;
    pts.push(`${(t * 100).toFixed(2)} ${(96 - (ease + wobble) * 92).toFixed(2)}`);
  }
  return `M${pts.join("L")}`;
})();

function SourceIcon({ source }: { source: Source }) {
  if ("brand" in source) {
    return (
      <span className="grid size-9 shrink-0 place-items-center bg-white">
        <BrandIcon brand={source.brand} className="size-5" />
      </span>
    );
  }
  const Icon = source.icon;
  return (
    <span className={`grid size-9 shrink-0 place-items-center text-white ${source.tint}`}>
      <Icon className="size-[18px]" />
    </span>
  );
}

/**
 * Navy operations board (illustration): two figures, the day's curve drawing itself, and the
 * latest execution ticking over. Runs only on screen; can be paused (WCAG 2.2.2).
 */
export function HeroBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const { step, cycle, reduced } = useStepper(ref, DURATIONS, paused);
  const n = EVENTS.length;
  const latest = cycle * n + step;
  const done = 21 + latest;
  const e = EVENTS[latest % n];

  return (
    <div ref={ref} className="panel-navy flex h-full min-h-[600px] flex-col p-6 sm:p-7">
      <span aria-hidden className="marker top-0 left-0" />
      <p className="sr-only">
        Ilustração: painel com o número de tarefas concluídas automaticamente ao longo do dia e a
        última execução, por exemplo marcações, faturas pagas e orçamentos enviados.
      </p>
      <div aria-hidden className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="label text-[10.5px] text-white/55">Painel de operações</span>
          <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
            Ilustração
          </span>
        </div>

        <dl className="mt-6">
          <div className="flex items-baseline justify-between gap-4 py-3">
            <dt className="label text-[11px]">Automações ativas</dt>
            <dd className="text-[20px] tabular-nums">4</dd>
          </div>
          <div className="rule-x rule-light" />
          <div className="flex items-baseline justify-between gap-4 py-3">
            <dt className="label text-[11px]">Tarefas concluídas hoje</dt>
            <dd className="text-[20px] tabular-nums">
              <span key={done} className={reduced ? "" : "inline-block animate-feed-in"}>
                {done}
              </span>
            </dd>
          </div>
        </dl>

        <div className="relative mt-6 min-h-[200px] flex-1">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible"
          >
            {Array.from({ length: 17 }, (_, i) => (
              <line
                // biome-ignore lint/suspicious/noArrayIndexKey: static grid.
                key={i}
                x1={i * 6.25}
                x2={i * 6.25}
                y1="0"
                y2="100"
                stroke="rgb(255 255 255 / 0.22)"
                strokeDasharray="0.6 1.6"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="line-draw absolute inset-0 size-full overflow-visible"
          >
            <path
              d={CURVE}
              fill="none"
              stroke="#fff"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="load-pop absolute top-[4%] right-0 size-2 translate-x-1/2 -translate-y-1/2 bg-white [animation-delay:2.7s]">
            <span className="absolute inset-0 animate-ping bg-white/70 motion-reduce:hidden" />
          </span>
          <div className="absolute inset-x-0 bottom-0 flex justify-between font-mono text-[9.5px] text-white/45">
            <span>08h</span>
            <span>12h</span>
            <span>16h</span>
            <span>20h</span>
          </div>
        </div>

        <div className="mt-6 rule-x rule-light" />
        <div className="flex items-center justify-between pt-3 pb-2">
          <span className="label text-[10.5px] text-white/55">Última execução</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-white/55 uppercase">
            <span className="size-1.5 animate-blink bg-mint" />
            Agora
          </span>
        </div>
        {e && (
          <div
            key={latest}
            className={`flex items-center gap-3 ${reduced ? "" : "animate-feed-in"}`}
          >
            <SourceIcon source={e.source} />
            <div className="min-w-0">
              <p className="truncate text-[14.5px]">
                {e.title} <span className="text-white/50">· {e.from}</span>
              </p>
              <p className="truncate text-[13px] text-white/60">{e.detail}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-stretch gap-[2px]">
        <LinkButton href="#exemplos" variant="glass" className="flex-1">
          Ver casos de uso
        </LinkButton>
        {!reduced && (
          <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} tone="dark" />
        )}
      </div>
    </div>
  );
}
