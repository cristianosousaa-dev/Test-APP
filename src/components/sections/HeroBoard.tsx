"use client";

import { type LucideIcon, Receipt, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
/* One illustrative "day": TOTAL executions from 08:00 to 20:00, then it starts again. */
const TOTAL = 16;
const START = 6; // the board opens mid-morning, not on an empty chart
const durFor = (k: number) => (k === 0 ? 1600 : k === TOTAL ? 2800 : 1700);
const DURATIONS = Array.from({ length: TOTAL + 1 }, (_, s) => durFor((s + START) % (TOTAL + 1)));

/* Cumulative curve for the day: slow start, steady afternoon. y in % from the top. */
function curveY(t: number) {
  const ease = t < 0.15 ? t * t * 2.2 : 0.0495 + (t - 0.15) * 1.12;
  const wobble = Math.sin(t * 68) * 0.006;
  return 96 - (ease + wobble) * 92;
}
const CURVE = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 64; i++) {
    const t = i / 64;
    pts.push(`${(t * 100).toFixed(2)} ${curveY(t).toFixed(2)}`);
  }
  return `M${pts.join("L")}`;
})();
const AREA = `${CURVE}L100 100L0 100Z`;

const clock = (p: number) => {
  const mins = Math.round((8 * 60 + p * 12 * 60) / 5) * 5;
  return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
};

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
 * Navy operations board (illustration): each execution adds a task to the counter, moves the
 * clock on and extends the day's curve; at the end of the day it returns to zero. Runs only on screen; can be paused (WCAG 2.2.2).
 */
export function HeroBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [drawn, setDrawn] = useState(false);
  const { step, cycle, reduced } = useStepper(ref, DURATIONS, paused);
  const n = EVENTS.length;
  const k = reduced ? TOTAL : (step + START) % (TOTAL + 1);
  const p = drawn || reduced ? k / TOTAL : 0;
  const e = EVENTS[(cycle * (TOTAL + 1) + step) % n];

  // First paint shows an empty chart, then the line grows to the current point.
  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, []);

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
              <span key={k} className={reduced ? "" : "inline-block animate-feed-in"}>
                {k}
              </span>
              <span className="text-white/40"> / {TOTAL}</span>
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
          {/* The day so far: line and soft area, revealed up to the current execution. */}
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible transition-[clip-path] ease-out-soft"
            style={{
              clipPath: `inset(-4% ${(1 - p) * 100}% 0 0)`,
              transitionDuration: k === 0 ? "700ms" : "1100ms",
            }}
          >
            <defs>
              <linearGradient id="board-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={AREA} fill="url(#board-area)" />
            <path
              d={CURVE}
              fill="none"
              stroke="#fff"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {/* Current point with the time of the latest execution. */}
          <span
            className="absolute z-10 transition-[left,top,opacity] duration-[1100ms] ease-out-soft"
            style={{
              left: `${p * 100}%`,
              top: `${curveY(p)}%`,
              opacity: k === 0 ? 0 : 1,
            }}
          >
            <span className="absolute size-2 -translate-1/2 bg-white">
              <span className="absolute inset-0 animate-ping bg-white/70 motion-reduce:hidden" />
            </span>
            <span
              className={`absolute bottom-2.5 bg-white px-1.5 py-0.5 font-mono text-[10px] text-navy ${
                p > 0.8 ? "right-1.5" : "left-1.5"
              }`}
            >
              {clock(p)}
            </span>
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
        {k === 0 ? (
          <div
            key="new-day"
            className={`flex items-center gap-3 ${reduced ? "" : "animate-feed-in"}`}
          >
            <span className="grid size-9 shrink-0 place-items-center bg-white/15 font-mono text-[10px]">
              08h
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14.5px]">Novo dia de operações</p>
              <p className="truncate text-[13px] text-white/60">A aguardar os primeiros pedidos</p>
            </div>
          </div>
        ) : (
          e && (
            <div
              key={`${cycle}-${step}`}
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
          )
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
