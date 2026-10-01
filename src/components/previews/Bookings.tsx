"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Stage, Typing } from "@/components/visual/Bits";
import { Notification } from "@/components/visual/Notification";
import { cn } from "@/lib/cn";
import { fade, instant, spring } from "@/lib/motion";
import type { PreviewConfig, StageProps } from "./types";

function BookingsStage({ step, cycle, animate, running }: StageProps) {
  const t = animate ? spring : instant;
  const enter = animate ? { opacity: 0, y: 10, scale: 0.98 } : false;
  const booked = step >= 3;

  return (
    <Stage>
      {/* Chat */}
      <div className="absolute inset-x-4 top-4 bottom-[214px] flex flex-col overflow-hidden rounded-[22px] bg-paper ring-1 ring-hair sm:right-[34%] sm:bottom-4">
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-hair px-4">
          <span className="grid size-8 place-items-center rounded-full bg-lilac text-[12px] font-semibold text-lilac-ink">
            MC
          </span>
          <span className="leading-tight">
            <span className="block text-[14px] font-semibold">Marta Costa</span>
            <span className="block text-[12px] text-mute">Cliente desde 2024</span>
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2 bg-canvas/60 p-4">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={`${cycle}-in1`}
              layout={animate ? "position" : false}
              initial={enter}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={t}
              className="max-w-[80%] self-start"
            >
              <Bubble side="in" time="21:47">
                Olá! Têm vaga para uma limpeza esta semana?
              </Bubble>
            </motion.div>

            {step === 1 && (
              <motion.div
                key={`${cycle}-typing`}
                layout={animate ? "position" : false}
                initial={enter}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, transition: fade }}
                transition={t}
                className="self-end"
              >
                <Typing running={running} />
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div
                key={`${cycle}-out1`}
                layout={animate ? "position" : false}
                initial={enter}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={t}
                className="max-w-[80%] self-end"
              >
                <Bubble side="out" time="21:47">
                  Olá Marta! Tenho quinta às 10:00 ou sexta às 15:30. Qual prefere?
                </Bubble>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div
                key={`${cycle}-in2`}
                layout={animate ? "position" : false}
                initial={enter}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={animate ? { ...spring, delay: 0.9 } : instant}
                className="max-w-[80%] self-start"
              >
                <Bubble side="in" time="21:48">
                  Sexta às 15:30, por favor.
                </Bubble>
              </motion.div>
            )}

            {step >= 4 && (
              <motion.div
                key={`${cycle}-out2`}
                layout={animate ? "position" : false}
                initial={enter}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={t}
                className="max-w-[80%] self-end"
              >
                <Bubble side="out" time="21:48">
                  Está marcado: sexta, 15:30. Enviamos-lhe um lembrete na véspera.
                </Bubble>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Agenda widget (glass over the chat) */}
      <div className="glass absolute right-4 bottom-4 left-4 rounded-[24px] p-4 sm:top-[72px] sm:bottom-auto sm:left-auto sm:w-[300px]">
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] font-medium tracking-wide text-ink-2 uppercase">Agenda</span>
          <span className="text-[12px] text-mute">Sexta, 2 out</span>
        </div>
        <ul className="mt-3 flex flex-col gap-1.5">
          <Slot time="14:30" label="Revisão · Miguel Teles" tone="busy" />
          <li className="relative">
            <motion.div
              layout={animate}
              transition={t}
              className={cn(
                "flex h-11 items-center gap-3 rounded-[14px] px-3 text-[13px] transition-colors duration-500",
                booked ? "bg-lilac text-lilac-ink" : "bg-white/60 text-mute ring-1 ring-hair",
              )}
            >
              <span className="w-10 font-medium tabular-nums">15:30</span>
              <AnimatePresence mode="wait" initial={false}>
                {booked ? (
                  <motion.span
                    key="booked"
                    className="flex flex-1 items-center justify-between font-medium"
                    initial={animate ? { opacity: 0, y: 4 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={t}
                  >
                    Limpeza · Marta Costa
                    <Check className="text-lilac-ink" />
                  </motion.span>
                ) : (
                  <motion.span key="free" initial={false} exit={{ opacity: 0, transition: fade }}>
                    Livre
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </li>
          <Slot time="16:30" label="Livre" tone="free" />
        </ul>
      </div>

      {/* Reminder toast */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            key={`${cycle}-toast`}
            className="absolute top-[340px] right-4 hidden w-[300px] sm:block"
            initial={animate ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: fade }}
            transition={animate ? { ...spring, delay: 0.6 } : instant}
          >
            <Notification
              id="reminder"
              app="calendar"
              title="Lembrete agendado"
              body="Quinta, 18:00 · enviado a Marta Costa"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Stage>
  );
}

function Bubble({
  side,
  time,
  children,
}: {
  side: "in" | "out";
  time: string;
  children: React.ReactNode;
}) {
  const out = side === "out";
  return (
    <div
      className={cn(
        "rounded-[18px] px-3.5 py-2 text-[14px] leading-snug",
        out
          ? "rounded-br-[6px] bg-ink text-white"
          : "rounded-bl-[6px] bg-paper text-ink ring-1 ring-hair",
      )}
    >
      {children}
      <span
        className={cn(
          "mt-0.5 block text-right text-[11px] tabular-nums",
          out ? "text-white/70" : "text-mute",
        )}
      >
        {out ? `Automático · ${time}` : time}
      </span>
    </div>
  );
}

function Slot({ time, label, tone }: { time: string; label: string; tone: "busy" | "free" }) {
  return (
    <li
      className={cn(
        "flex h-11 items-center gap-3 rounded-[14px] px-3 text-[13px]",
        tone === "busy" ? "bg-sage text-sage-ink" : "bg-white/60 text-mute ring-1 ring-hair",
      )}
    >
      <span className="w-10 font-medium tabular-nums">{time}</span>
      <span className={tone === "busy" ? "font-medium" : undefined}>{label}</span>
    </li>
  );
}

export const bookings: PreviewConfig = {
  id: "marcacoes",
  tab: "Marcações",
  sector: "Clínicas, estética e serviços com agenda",
  title: "Marcações por mensagem, sem atender o telefone",
  description:
    "O cliente pede uma vaga às 21h. A automação responde com horários livres, marca na agenda e envia o lembrete na véspera.",
  steps: [
    "O cliente pede uma vaga",
    "Consulta a agenda",
    "Propõe horários livres",
    "Marca na agenda",
    "Confirma e agenda o lembrete",
  ],
  outcomes: ["Resposta em segundos, mesmo fora de horas", "Menos chamadas", "Menos faltas"],
  tools: [
    { label: "WhatsApp", at: 0 },
    { label: "Google Calendar", at: 1 },
    { label: "Lembrete por SMS", at: 4 },
  ],
  theme: "bookings",
  Stage: BookingsStage,
};
