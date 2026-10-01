import type { ReactNode } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { cn } from "@/lib/cn";
import { At, Done, IconCell, Panel, Stage } from "./parts";
import type { Example, PreviewProps } from "./types";

function Bubble({
  side,
  children,
  meta,
}: {
  side: "in" | "out";
  children: ReactNode;
  meta: string;
}) {
  return (
    <div className={cn("flex", side === "out" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[86%] px-3.5 py-2.5 text-[14px] leading-snug",
          side === "out"
            ? "bg-accent-soft shadow-[inset_2px_0_0_var(--color-accent)]"
            : "bg-white shadow-[0_0_0_1px_var(--color-hair-2)]",
        )}
      >
        {side === "out" && (
          <span className="label mb-1 block text-[9px] text-accent">Orchestr · automático</span>
        )}
        {children}
        <span className="mt-1 block text-right font-mono text-[10px] text-fg-3">{meta}</span>
      </div>
    </div>
  );
}

const SLOTS = [
  { time: "14:30", who: "Revisão · Miguel Teles", taken: true },
  { time: "15:30", who: "Livre", taken: false },
  { time: "17:00", who: "Livre", taken: false },
];

function BookingsPreview({ step }: PreviewProps) {
  const booked = step >= 4;
  return (
    <Stage>
      <div className="absolute inset-0 grid gap-3 p-3 sm:grid-cols-[minmax(0,1fr)_220px] sm:p-4">
        <Panel
          icon={
            <IconCell>
              <BrandIcon brand="whatsapp" className="size-4" />
            </IconCell>
          }
          title="WhatsApp · Marta Costa"
          meta="21:47"
          bodyClassName="flex flex-col justify-end gap-2 bg-paper-2 p-3"
        >
          <At collapse step={step} at={0}>
            <Bubble side="in" meta="21:47">
              Olá! Têm vaga para uma limpeza na sexta à tarde?
            </Bubble>
          </At>
          <At collapse step={step} at={1} until={2}>
            <div className="flex justify-end">
              <span className="flex items-center gap-1.5 bg-accent-soft px-3.5 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 animate-pulse bg-accent"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
                <span className="label ml-1 text-[9px] text-accent">A consultar agenda</span>
              </span>
            </div>
          </At>
          <At collapse step={step} at={2}>
            <Bubble side="out" meta="21:47">
              Olá Marta! Temos sexta às 15:30 ou às 17:00. Qual prefere?
            </Bubble>
          </At>
          <At collapse step={step} at={3}>
            <Bubble side="in" meta="21:48">
              15:30, por favor!
            </Bubble>
          </At>
          <At collapse step={step} at={4}>
            <Bubble side="out" meta="21:48">
              Ficou marcado: sexta, 15:30. Enviamos um lembrete na véspera.
            </Bubble>
          </At>
          <At collapse step={step} at={4} className="sm:hidden">
            <Done>Marcação registada na agenda · Sex 15:30</Done>
          </At>
        </Panel>

        <Panel
          className="hidden sm:flex"
          icon={
            <IconCell>
              <BrandIcon brand="googleCalendar" className="size-4" />
            </IconCell>
          }
          title="Agenda"
          meta="Sex, 2 out"
          bodyClassName="flex flex-col p-3"
        >
          <ul className="flex flex-col gap-[2px] text-[13px]">
            {SLOTS.map((s) => {
              const isNew = s.time === "15:30" && booked;
              return (
                <li
                  key={s.time}
                  className={cn(
                    "grid grid-cols-[44px_minmax(0,1fr)] items-center px-2.5 py-3 transition-[background-color,box-shadow] duration-500",
                    s.taken
                      ? "bg-paper-2"
                      : isNew
                        ? "bg-accent-soft shadow-[inset_2px_0_0_var(--color-accent)]"
                        : "shadow-[inset_0_0_0_1px_var(--color-hair)]",
                  )}
                >
                  <span className="font-mono text-[11px] text-fg-2">{s.time}</span>
                  <span className="flex items-center justify-between gap-2">
                    <span className={cn("truncate", s.taken || isNew ? "text-ink" : "text-fg-3")}>
                      {isNew ? "Limpeza · Marta Costa" : s.who}
                    </span>
                    {isNew && (
                      <span className="label animate-pop bg-fg px-1.5 py-0.5 text-[9px] text-white">
                        Novo
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
          <At step={step} at={4} className="mt-auto">
            <Done>Lembrete programado para quinta, 10:00</Done>
          </At>
        </Panel>
      </div>
    </Stage>
  );
}

export const bookings: Example = {
  id: "marcacoes",
  tab: "Marcações",
  mark: "whatsapp",
  sector: "Clínicas, estética e serviços com agenda",
  title: "Marcações por mensagem, sem intervenção da equipa",
  before: "Chamadas e mensagens atendidas e agendadas manualmente, muitas vezes fora de horas.",
  after: "Resposta imediata com horários disponíveis, registo na agenda e lembrete automático.",
  steps: [
    "Pedido de marcação recebido",
    "Consulta da disponibilidade",
    "Proposta de horários",
    "Confirmação do cliente",
    "Registo na agenda e lembrete programado",
  ],
  durations: [1800, 1400, 2200, 1600, 3800],
  tools: ["whatsapp", "googleCalendar", "SMS"],
  Preview: BookingsPreview,
};
