"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Pill, Stage } from "@/components/visual/Bits";
import { Counter } from "@/components/visual/Counter";
import { Notification } from "@/components/visual/Notification";
import { fade, instant, spring } from "@/lib/motion";
import type { PreviewConfig, StageProps } from "./types";

const LINES = [
  { label: "Diagnóstico e mão de obra (2 h)", value: 90 },
  { label: "Válvula de gás e vedantes", value: 70 },
  { label: "Deslocação", value: 25 },
];

function QuotesStage({ step, cycle, animate }: StageProps) {
  const t = animate ? spring : instant;
  const linesShown = step >= 1 ? LINES.length : 0;
  const total = LINES.slice(0, linesShown).reduce((sum, l) => sum + l.value, 0);
  const status =
    step >= 5
      ? { tone: "go" as const, label: "Aceite pelo cliente" }
      : step >= 4
        ? { tone: "sand" as const, label: "Lembrete enviado · 3 dias depois" }
        : step >= 3
          ? { tone: "sky" as const, label: "Enviado por email e WhatsApp" }
          : step >= 2
            ? { tone: "lilac" as const, label: "A aguardar a sua aprovação" }
            : { tone: "neutral" as const, label: "Rascunho" };

  return (
    <Stage>
      {/* Incoming request */}
      <motion.div
        className="glass absolute top-4 right-4 left-4 rounded-[22px] p-4 sm:right-auto sm:w-[290px]"
        initial={false}
        animate={{ opacity: step >= 1 ? 0 : 1, y: step >= 1 ? -8 : 0 }}
        transition={t}
      >
        <span className="text-[12px] font-medium tracking-wide text-ink-2 uppercase">
          Novo pedido · site
        </span>
        <p className="mt-1.5 text-[14px] font-semibold">Reparação de esquentador</p>
        <p className="text-[13px] text-ink-2">Rui Almeida · Lisboa · “Não acende desde ontem.”</p>
      </motion.div>

      {/* The quote document */}
      <motion.div
        className="absolute top-[112px] right-4 left-4 flex flex-col rounded-[20px] bg-paper p-5 ring-1 ring-hair sm:right-[10%] sm:left-[10%]"
        initial={false}
        animate={{ y: step >= 1 ? -84 : 0 }}
        transition={t}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] text-mute">Orçamento Nº 0412</p>
            <p className="mt-0.5 text-[16px] font-semibold tracking-[-0.01em]">
              Reparação de esquentador
            </p>
            <p className="text-[13px] text-ink-2">Para Rui Almeida</p>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={status.label}
              initial={animate ? { opacity: 0, y: 4 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: fade }}
              transition={t}
            >
              <Pill tone={status.tone}>
                {status.tone === "go" && <Check />}
                {status.label}
              </Pill>
            </motion.span>
          </AnimatePresence>
        </div>

        <ul className="mt-5 flex flex-col border-t border-hair">
          {LINES.map((line, i) => (
            <motion.li
              key={line.label}
              className="flex items-center justify-between border-b border-hair py-2.5 text-[13.5px]"
              initial={false}
              animate={{ opacity: i < linesShown ? 1 : 0.25 }}
              transition={animate ? { ...spring, delay: i < linesShown ? i * 0.35 : 0 } : instant}
            >
              <span className="text-ink-2">{line.label}</span>
              <span className="tabular-nums">{i < linesShown ? `${line.value},00 €` : "—"}</span>
            </motion.li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-[13px] text-mute">Total com IVA</span>
          <span className="text-[22px] font-medium tracking-[-0.02em]">
            <Counter value={total} animate={animate} />
          </span>
        </div>
      </motion.div>

      {/* Approval sheet */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            key={`${cycle}-sheet`}
            className="glass absolute right-4 bottom-4 left-4 flex items-center justify-between gap-3 rounded-[22px] p-3 pl-4 sm:right-auto sm:left-1/2 sm:w-[360px] sm:-translate-x-1/2"
            initial={animate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12, transition: fade }}
            transition={t}
          >
            <span className="text-[13.5px] text-ink-2">Rever e enviar ao cliente?</span>
            <motion.span
              className="rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-white"
              animate={animate ? { scale: [1, 1, 0.94, 1] } : undefined}
              transition={{ duration: 1.6, times: [0, 0.6, 0.72, 0.85] }}
            >
              Aprovar e enviar
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accepted */}
      <AnimatePresence>
        {step >= 5 && (
          <motion.div
            key={`${cycle}-accepted`}
            className="absolute top-4 right-4 left-4 sm:left-auto sm:w-[310px]"
            initial={animate ? { opacity: 0, y: -12 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: fade }}
            transition={t}
          >
            <Notification
              id="accepted"
              app="requests"
              title="Orçamento aceite"
              body="Rui Almeida aceitou · 185,00 €"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Stage>
  );
}

export const quotes: PreviewConfig = {
  id: "orcamentos",
  tab: "Orçamentos",
  sector: "Oficinas, reparações e serviços técnicos",
  title: "Do pedido ao orçamento aceite, no mesmo dia",
  description:
    "Um pedido chega pelo site. O orçamento é preparado com os seus preços, aprova-o num toque, e o seguimento acontece sozinho.",
  steps: [
    "Chega um pedido pelo site",
    "O orçamento é preparado",
    "Aprova num toque",
    "Enviado ao cliente",
    "Seguimento após 3 dias",
    "Orçamento aceite",
  ],
  outcomes: [
    "Orçamentos enviados no próprio dia",
    "Nenhum pedido esquecido",
    "Mais orçamentos aceites",
  ],
  tools: [
    { label: "Formulário", at: 0 },
    { label: "Preçário", at: 1 },
    { label: "Email", at: 3 },
    { label: "Assinatura", at: 5 },
  ],
  theme: "quotes",
  Stage: QuotesStage,
};
