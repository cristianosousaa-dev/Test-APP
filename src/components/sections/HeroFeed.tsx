"use client";

import { Check } from "lucide-react";
import { useRef, useState } from "react";
import { type App, AppIcon, appLabel } from "@/components/ui/AppIcon";
import { PauseButton } from "@/components/ui/PauseButton";
import { useStepper } from "@/lib/useStepper";

const EVENTS: { app: App; title: string; detail: string }[] = [
  { app: "whatsapp", title: "Pedido de marcação", detail: "Respondido e marcado: sexta, 15:30" },
  { app: "invoices", title: "Fatura FT 1187 paga", detail: "185,00 € registados na contabilidade" },
  { app: "site", title: "Novo pedido de orçamento", detail: "Orçamento preparado e enviado" },
  { app: "calendar", title: "Lembrete enviado", detail: "Paulo Sousa · consulta amanhã, 10:00" },
  { app: "email", title: "Fatura de fornecedor", detail: "Dados lidos e lançados" },
  {
    app: "payments",
    title: "Fatura vencida há 5 dias",
    detail: "Lembrete enviado com referência MB",
  },
  { app: "reviews", title: "Serviço concluído", detail: "Pedido de avaliação enviado" },
];
const DURATIONS = EVENTS.map(() => 2400);
const ROW = 76;
const VISIBLE = 4;

/**
 * "Today in your business": automations finishing tasks, newest on top. Rows slide with a
 * transform transition (compositor only) and new ticks pop in. Pauses off-screen.
 */
export function HeroFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const { step, cycle, reduced } = useStepper(ref, DURATIONS, paused);
  const n = EVENTS.length;
  // Start with a full list: the first new task lands on top of three earlier ones.
  const latest = cycle * n + step + VISIBLE - 1;
  const done = 20 + latest;

  // Newest first; one extra row fades out at the bottom.
  const rows = Array.from({ length: VISIBLE + 1 }, (_, i) => latest - i).filter((k) => k >= 0);

  return (
    <div ref={ref} className="relative">
      <p className="sr-only">
        Ilustração: uma lista de tarefas concluídas por automações ao longo do dia, como marcações,
        faturas pagas e orçamentos enviados.
      </p>
      <div
        aria-hidden
        className="relative overflow-hidden rounded-[28px] bg-night p-5 text-white shadow-[0_40px_80px_-40px_rgb(14_15_18/0.6)] sm:p-6"
      >
        {/* Soft lime light in the corner: static, no animation cost. */}
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(212_255_58/0.22),transparent)]" />

        <div className="relative flex items-center justify-between">
          <div>
            <p className="flex items-center gap-2 text-[13px] text-white/60">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-lime/70 motion-reduce:hidden" />
                <span className="relative size-2 rounded-full bg-lime" />
              </span>
              Hoje no seu negócio
            </p>
            <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">
              <span key={done} className="inline-block animate-feed-in tabular-nums">
                {done}
              </span>{" "}
              tarefas feitas sozinhas
            </p>
          </div>
          <span className="rounded-full bg-lime px-3 py-1 text-[12.5px] font-semibold text-ink">
            Automático
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
                  opacity: i >= VISIBLE ? 0 : 1 - i * 0.12,
                }}
              >
                <div
                  className={`flex h-[66px] items-center gap-3 rounded-2xl px-3 ${
                    i === 0 ? "bg-night-3" : "bg-night-2"
                  } ${i === 0 && !reduced ? "animate-feed-in" : ""}`}
                >
                  <AppIcon app={e.app} />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-[12px] text-white/50">
                      {appLabel(e.app)}
                      <span>·</span>
                      {i === 0 ? "agora" : `há ${i * 3} min`}
                    </p>
                    <p className="truncate text-[14.5px] font-medium">{e.title}</p>
                    <p className="truncate text-[13px] text-white/60">{e.detail}</p>
                  </div>
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full bg-lime text-ink ${
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
