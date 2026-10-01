"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Pill, Stage } from "@/components/visual/Bits";
import { Notification } from "@/components/visual/Notification";
import { cn } from "@/lib/cn";
import { fade, instant, spring, springSlow } from "@/lib/motion";
import type { PreviewConfig, StageProps } from "./types";

const COLUMNS = ["Novos", "Qualificados", "Visita marcada"] as const;

const EXISTING: { col: number; name: string; detail: string }[] = [
  { col: 0, name: "Hugo Martins", detail: "T1 · Arroios" },
  { col: 1, name: "Rita Gomes", detail: "Arrendamento · até 1 400 €" },
  { col: 1, name: "Nuno Faria", detail: "Compra · moradia" },
  { col: 2, name: "Beatriz Lima", detail: "Hoje, 18:00" },
];

function LeadsStage({ step, cycle, animate }: StageProps) {
  const t = animate ? springSlow : instant;
  const column = step >= 3 ? 2 : step >= 2 ? 1 : 0;

  return (
    <Stage>
      <LayoutGroup id={`leads-${cycle}`}>
        <div className="absolute inset-4 grid grid-cols-3 gap-2 sm:gap-3">
          {COLUMNS.map((title, col) => (
            <div
              key={title}
              className="flex min-w-0 flex-col rounded-[20px] bg-paper/70 p-2 ring-1 ring-hair sm:p-2.5"
            >
              <div className="flex items-center justify-between px-1.5 pt-1 pb-2.5">
                <span className="truncate text-[12px] font-medium text-ink-2 sm:text-[13px]">
                  {title}
                </span>
                <span className="text-[12px] text-mute tabular-nums">
                  {EXISTING.filter((e) => e.col === col).length + (column === col ? 1 : 0)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {column === col && (
                  <motion.div layoutId="lead" transition={t} className="relative z-10">
                    <LeadCard step={step} animate={animate} />
                  </motion.div>
                )}
                {EXISTING.filter((e) => e.col === col).map((e) => (
                  <motion.div key={e.name} layout={animate ? "position" : false} transition={t}>
                    <div className="rounded-[14px] bg-paper p-2.5 ring-1 ring-hair">
                      <p className="truncate text-[12.5px] font-medium sm:text-[13px]">{e.name}</p>
                      <p className="truncate text-[11.5px] text-mute sm:text-[12px]">{e.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>

      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            key={`${cycle}-notify`}
            className="absolute right-4 bottom-4 left-4 sm:left-auto sm:w-[330px]"
            initial={animate ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: fade }}
            transition={animate ? spring : instant}
          >
            <Notification
              id="consultant"
              app="calendar"
              title="Visita marcada para si"
              body="Ana Pires · sábado, 11:00 · resumo da conversa anexado"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Stage>
  );
}

function LeadCard({ step, animate }: { step: number; animate: boolean }) {
  const t = animate ? spring : instant;
  return (
    <div
      className={cn(
        "glass rounded-[16px] p-2.5 transition-shadow duration-500",
        step <= 1 && "shadow-[0_0_0_2px_rgb(40_90_146/0.35)]",
      )}
    >
      <p className="truncate text-[12.5px] font-semibold sm:text-[13px]">Ana Pires</p>
      <p className="truncate text-[11.5px] text-ink-2 sm:text-[12px]">T2 · Alvalade · via portal</p>
      <div className="mt-2 flex flex-wrap gap-1">
        <AnimatePresence initial={false}>
          {step >= 1 && step < 3 && (
            <motion.span
              key="fast"
              initial={animate ? { opacity: 0, scale: 0.9 } : false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: fade }}
              transition={t}
            >
              <Pill tone="sky" wrap>
                Respondido em 38 s
              </Pill>
            </motion.span>
          )}
          {step >= 2 && (
            <motion.span
              key="buy"
              initial={animate ? { opacity: 0, scale: 0.9 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={t}
            >
              <Pill tone="sage" wrap>
                Compra · até 380 mil €
              </Pill>
            </motion.span>
          )}
          {step >= 3 && (
            <motion.span
              key="visit"
              initial={animate ? { opacity: 0, scale: 0.9 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={t}
            >
              <Pill tone="sand" wrap>
                Sábado, 11:00
              </Pill>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const leads: PreviewConfig = {
  id: "pedidos",
  tab: "Pedidos de clientes",
  sector: "Imobiliárias, agências e vendas consultivas",
  title: "Cada contacto respondido em segundos e seguido até à visita",
  description:
    "Um contacto chega de um portal. É respondido de imediato, qualificado com duas perguntas, avança no seu funil e a visita fica marcada na agenda do consultor.",
  steps: [
    "Chega um contacto do portal",
    "Resposta imediata",
    "Qualificado e registado",
    "Visita marcada",
    "Consultor avisado com o resumo",
  ],
  before: "Contactos do portal ficam horas à espera de resposta.",
  after: "Resposta em segundos e visita marcada na agenda.",
  outcomes: [
    "Nenhum contacto fica à espera",
    "Funil sempre atualizado",
    "Consultores focados em quem quer comprar",
  ],
  tools: [
    { label: "Portal imobiliário", at: 0 },
    { label: "WhatsApp", at: 1 },
    { label: "CRM", at: 2 },
    { label: "Agenda", at: 3 },
  ],
  theme: "leads",
  Stage: LeadsStage,
};
