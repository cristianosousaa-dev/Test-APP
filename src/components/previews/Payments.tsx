"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Pill, Stage } from "@/components/visual/Bits";
import { Counter } from "@/components/visual/Counter";
import { cn } from "@/lib/cn";
import { fade, instant, spring } from "@/lib/motion";
import type { PreviewConfig, StageProps } from "./types";

const ROWS = [
  { client: "Clínica Dentária Sol", doc: "FT 1186", value: "320,00 €", state: "paid" },
  { client: "Restaurante O Pátio", doc: "FT 1184", value: "96,40 €", state: "paid" },
  { client: "Oficina Lopes", doc: "FT 1182", value: "420,00 €", state: "focus" },
  { client: "Ana Pires", doc: "FT 1181", value: "185,00 €", state: "paid" },
  { client: "Loja da Esquina", doc: "FT 1179", value: "64,90 €", state: "due" },
] as const;

function PaymentsStage({ step, cycle, animate }: StageProps) {
  const t = animate ? spring : instant;
  const received = step >= 2 ? 4740 : 4320;
  const focus =
    step >= 3
      ? { tone: "go" as const, label: "Paga · lançada" }
      : step >= 2
        ? { tone: "go" as const, label: "Paga" }
        : step >= 1
          ? { tone: "sand" as const, label: "Lembrete enviado" }
          : { tone: "rose" as const, label: "Vencida há 5 dias" };

  return (
    <Stage>
      <div className="absolute inset-4 flex flex-col overflow-hidden rounded-[22px] bg-paper ring-1 ring-hair">
        <div className="flex items-end justify-between gap-4 border-b border-hair p-5">
          <div>
            <p className="text-[12px] font-medium tracking-wide text-ink-2 uppercase">
              Faturas · outubro
            </p>
            <p className="mt-1 text-[28px] font-medium tracking-[-0.025em]">
              <Counter value={received} animate={animate} />
            </p>
            <p className="text-[12.5px] text-mute">recebidos este mês</p>
          </div>
          <span className="hidden sm:block">
            <Pill tone="neutral">Cobrança automática ativa</Pill>
          </span>
        </div>
        <ul className="flex-1">
          {ROWS.map((r) => {
            const isFocus = r.state === "focus";
            return (
              <li
                key={r.doc}
                className={cn(
                  "flex items-center gap-3 border-b border-hair px-5 py-3 text-[13.5px] transition-colors duration-500",
                  isFocus && step === 0 && "bg-rose/50",
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{r.client}</span>
                  <span className="block text-[12px] text-mute">{r.doc}</span>
                </span>
                <span className="hidden tabular-nums sm:block">{r.value}</span>
                <span className="w-[150px] text-right">
                  {isFocus ? (
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={focus.label}
                        className="inline-block"
                        initial={animate ? { opacity: 0, y: 4 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: fade }}
                        transition={t}
                      >
                        <Pill tone={focus.tone}>
                          {focus.tone === "go" && <Check />}
                          {focus.label}
                        </Pill>
                      </motion.span>
                    </AnimatePresence>
                  ) : r.state === "paid" ? (
                    <Pill tone="go">
                      <Check />
                      Paga
                    </Pill>
                  ) : (
                    <Pill tone="neutral">Vence a 10 out</Pill>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The reminder that was sent, shown as glass over the list */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div
            key={`${cycle}-reminder`}
            className="glass absolute right-4 bottom-4 left-4 rounded-[22px] p-4 sm:right-6 sm:left-auto sm:w-[330px]"
            initial={animate ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: fade }}
            transition={t}
          >
            <p className="text-[12px] font-medium tracking-wide text-ink-2 uppercase">
              Email enviado · Oficina Lopes
            </p>
            <p className="mt-2 text-[13.5px] leading-snug text-ink">
              Olá Sr. Lopes, a fatura FT 1182 de 420,00 € venceu a 26 de setembro. Pode pagar
              diretamente por este link. Obrigado!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Stage>
  );
}

export const payments: PreviewConfig = {
  id: "cobrancas",
  tab: "Cobranças",
  sector: "Qualquer negócio que emite faturas",
  title: "Faturas em atraso cobradas com educação e a tempo",
  description:
    "Quando uma fatura vence, o cliente recebe um lembrete simpático com o link de pagamento. Quando paga, fica registado e lançado.",
  steps: [
    "Fatura vencida detetada",
    "Lembrete enviado ao cliente",
    "Pagamento recebido",
    "Registado na contabilidade",
  ],
  before: "Telefona aos clientes para cobrar faturas em atraso.",
  after: "Lembrete educado e pagamento registado sem tocar em nada.",
  outcomes: [
    "Menos dinheiro parado",
    "Ninguém tem de fazer telefonemas incómodos",
    "Contas sempre em dia",
  ],
  tools: [
    { label: "Moloni", at: 0 },
    { label: "Email", at: 1 },
    { label: "MB WAY", at: 2 },
    { label: "Contabilidade", at: 3 },
  ],
  theme: "payments",
  Stage: PaymentsStage,
};
