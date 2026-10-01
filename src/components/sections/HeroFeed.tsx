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
    source: { icon: Receipt, tint: "bg-accent text-accent-ink" },
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
    source: { icon: Wallet, tint: "bg-indigo" },
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
      <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-white shadow-[0_4px_12px_-4px_rgb(0_0_0/0.6)]">
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
      <div aria-hidden className="relative">
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="kicker flex items-center gap-2 !text-[10.5px]">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-mint/70 motion-reduce:hidden" />
                <span className="relative size-2 rounded-full bg-mint" />
              </span>
              Hoje no seu negócio
            </p>
            <p className="mt-1.5 text-[20px] font-semibold tracking-[-0.02em] [font-stretch:108%]">
              <span key={done} className="inline-block animate-feed-in text-mint tabular-nums">
                {done}
              </span>{" "}
              tarefas feitas sozinhas
            </p>
          </div>
          <span className="hidden rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[10.5px] tracking-wider text-accent uppercase ring-1 ring-accent/25 sm:inline">
            Ao vivo
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
                    i === 0 ? "bg-white/[0.07] ring-accent/25" : "bg-white/[0.03] ring-white/[0.05]"
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
      {!reduced && (
        <div className="mt-3 flex justify-end">
          <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} tone="dark" />
        </div>
      )}
    </div>
  );
}
