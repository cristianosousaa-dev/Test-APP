"use client";

import { Check, type LucideIcon, Receipt, Wallet } from "lucide-react";
import { useRef, useState } from "react";
import { type Brand, BrandIcon } from "@/components/brand/BrandIcon";
import { PauseButton } from "@/components/ui/PauseButton";
import { useStepper } from "@/lib/useStepper";

type Source = { brand: Brand } | { icon: LucideIcon; tint: string };

const EVENTS: { source: Source; from: string; title: string; detail: string }[] = [
  {
    source: { brand: "whatsapp" },
    from: "WhatsApp",
    title: "Pedido de marcação",
    detail: "Respondido e marcado: sexta, 15:30",
  },
  {
    source: { icon: Receipt, tint: "bg-brand" },
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
    detail: "Dados lidos e lançados",
  },
  {
    source: { icon: Wallet, tint: "bg-amber" },
    from: "Cobranças",
    title: "Fatura vencida há 5 dias",
    detail: "Lembrete enviado com referência MB",
  },
  {
    source: { brand: "google" },
    from: "Google",
    title: "Serviço concluído",
    detail: "Pedido de avaliação enviado",
  },
];
const DURATIONS = EVENTS.map(() => 2600);
const ROW = 76;
const VISIBLE = 4;

function SourceIcon({ source }: { source: Source }) {
  if ("brand" in source) {
    return (
      <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-white">
        <BrandIcon brand={source.brand} className="size-[22px]" />
      </span>
    );
  }
  const Icon = source.icon;
  return (
    <span
      className={`grid size-10 shrink-0 place-items-center rounded-[12px] text-white ${source.tint}`}
    >
      <Icon className="size-5" />
    </span>
  );
}

/**
 * "Today in your business": automations finishing tasks, newest on top. Rows slide with a
 * transform transition (compositor only) and each new tick pops in. Pauses off-screen.
 */
export function HeroFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const { step, cycle, reduced } = useStepper(ref, DURATIONS, paused);
  const n = EVENTS.length;
  // Start with a full list: the first new task lands on top of three earlier ones.
  const latest = cycle * n + step + VISIBLE - 1;
  const done = 20 + latest;
  const rows = Array.from({ length: VISIBLE + 1 }, (_, i) => latest - i).filter((k) => k >= 0);

  return (
    <div ref={ref} className="relative">
      <p className="sr-only">
        Ilustração: uma lista de tarefas concluídas por automações ao longo do dia, como marcações,
        faturas pagas e orçamentos enviados.
      </p>
      <div
        aria-hidden
        className="relative overflow-hidden rounded-[28px] bg-night p-5 text-white shadow-[0_50px_90px_-45px_rgb(15_21_19/0.75)] ring-1 ring-night-line sm:p-6"
      >
        <div className="pointer-events-none absolute -top-28 -right-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(142_221_176/0.18),transparent)]" />

        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[13px] text-white/60">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-mint/70 motion-reduce:hidden" />
                <span className="relative size-2 rounded-full bg-mint" />
              </span>
              Hoje no seu negócio
            </p>
            <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">
              <span key={done} className="inline-block animate-feed-in text-mint tabular-nums">
                {done}
              </span>{" "}
              tarefas feitas sozinhas
            </p>
          </div>
          <span className="hidden rounded-full bg-white/8 px-3 py-1 text-[12.5px] font-medium text-white/80 ring-1 ring-white/10 sm:inline">
            Em tempo real
          </span>
        </div>

        <ul className="relative mt-5" style={{ height: ROW * VISIBLE }}>
          {rows.map((k, i) => {
            const e = EVENTS[k % n];
            if (!e) return null;
            return (
              <li
                key={k}
                className="absolute inset-x-0 top-0 transition-[transform,opacity] duration-500 ease-out-soft"
                style={{
                  transform: `translateY(${i * ROW}px)`,
                  opacity: i >= VISIBLE ? 0 : 1 - i * 0.14,
                }}
              >
                <div
                  className={`flex h-[66px] items-center gap-3 rounded-2xl px-3 ring-1 ${
                    i === 0 ? "bg-night-3 ring-mint/25" : "bg-night-2 ring-transparent"
                  } ${i === 0 && !reduced ? "animate-feed-in" : ""}`}
                >
                  <SourceIcon source={e.source} />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-[12px] text-white/50">
                      {e.from}
                      <span>·</span>
                      {i === 0 ? "agora" : `há ${i * 3} min`}
                    </p>
                    <p className="truncate text-[14.5px] font-medium">{e.title}</p>
                    <p className="truncate text-[13px] text-white/60">{e.detail}</p>
                  </div>
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full bg-mint text-night ${
                      i === 0 && !reduced ? "animate-pop [animation-delay:250ms]" : ""
                    }`}
                  >
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-3 flex items-center justify-between text-[12.5px] text-mute">
        <span>Exemplo ilustrativo</span>
        {!reduced && <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} />}
      </div>
    </div>
  );
}
