"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { Notification, type NotificationData } from "@/components/visual/Notification";
import { cn } from "@/lib/cn";
import { fade, instant, spring } from "@/lib/motion";
import { useLoop } from "@/lib/useLoop";

const DAYS: { short: string; n: number; today?: boolean }[] = [
  { short: "Seg", n: 28 },
  { short: "Ter", n: 29 },
  { short: "Qua", n: 30 },
  { short: "Qui", n: 1, today: true },
  { short: "Sex", n: 2 },
];

/* Literal class strings so Tailwind can see them. Mobile shows Wed–Fri only. */
const COL = [
  "hidden sm:block sm:col-start-2",
  "hidden sm:block sm:col-start-3",
  "col-start-2 sm:col-start-4",
  "col-start-3 sm:col-start-5",
  "col-start-4 sm:col-start-6",
] as const;

type Tone = "sky" | "sage" | "sand" | "rose" | "lilac";
const TONE: Record<Tone, string> = {
  sky: "bg-sky text-sky-ink before:bg-sky-ink",
  sage: "bg-sage text-sage-ink before:bg-sage-ink",
  sand: "bg-sand text-sand-ink before:bg-sand-ink",
  rose: "bg-rose text-rose-ink before:bg-rose-ink",
  lilac: "bg-lilac text-lilac-ink before:bg-lilac-ink",
};

interface CalEvent {
  day: number;
  start: number; // hours, e.g. 9.5 = 09:30
  hours: number;
  title: string;
  who: string;
  tone: Tone;
}

const BASE_EVENTS: CalEvent[] = [
  { day: 0, start: 9.5, hours: 1, title: "Consulta", who: "Rui Almeida", tone: "sky" },
  { day: 0, start: 14, hours: 1, title: "Orçamento", who: "Esquentador", tone: "sand" },
  { day: 1, start: 11, hours: 1, title: "Revisão", who: "Carla Mendes", tone: "sage" },
  { day: 1, start: 15, hours: 1, title: "Consulta", who: "Paulo Sousa", tone: "sky" },
  { day: 2, start: 9, hours: 1, title: "Limpeza", who: "João Pires", tone: "lilac" },
  { day: 2, start: 13.5, hours: 1, title: "Visita", who: "T3 em Benfica", tone: "sand" },
  { day: 3, start: 9, hours: 1, title: "Avaliação", who: "Sofia Reis", tone: "rose" },
  { day: 3, start: 14.5, hours: 1, title: "Consulta", who: "Inês Faria", tone: "sky" },
  { day: 4, start: 10, hours: 1, title: "Revisão", who: "Miguel Teles", tone: "sage" },
];

/** Bookings created by the automations, revealed when their notification lands. */
const NEW_EVENTS: (CalEvent & { at: number })[] = [
  { at: 1, day: 4, start: 15.5, hours: 1, title: "Limpeza", who: "Marta Costa", tone: "lilac" },
  { at: 5, day: 3, start: 11, hours: 1, title: "Visita", who: "Ana Pires", tone: "sand" },
];

const FEED: Omit<NotificationData, "id">[] = [
  {
    app: "messages",
    title: "Marta Costa",
    body: "Olá! Têm vaga para uma limpeza na sexta à tarde?",
  },
  { app: "calendar", title: "Marcação confirmada", body: "Sexta, 15:30 · Limpeza · Marta Costa" },
  { app: "invoices", title: "Fatura FT 1187 paga", body: "185,00 € recebidos de Rui Almeida" },
  { app: "messages", title: "Lembrete enviado", body: "Paulo Sousa · consulta amanhã às 15:00" },
  {
    app: "requests",
    title: "Novo pedido de visita",
    body: "Ana Pires · T2 em Alvalade · respondido em 38 s",
  },
  { app: "calendar", title: "Visita marcada", body: "Quinta, 11:00 · Ana Pires" },
];
const DURATIONS = [2600, 2600, 2600, 2600, 2600, 3800] as const;

const HEADER = 44;
const SLOT = 26; // 30 minutes
const FIRST_HOUR = 9;
const rowOf = (h: number) => Math.round((h - FIRST_HOUR) * 2) + 2;
const NOW_HOUR = 10.7;

export function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const { step, cycle, animate } = useLoop(ref, DURATIONS);
  const n = FEED.length;

  // Oldest first (top), newest at the bottom; the previous cycle's item fills in after a restart.
  const stack = [1, 0].map((offset) => {
    const abs = cycle * n + step - offset;
    if (abs < 0) return null;
    const item = FEED[((abs % n) + n) % n];
    return item ? { ...item, id: String(abs) } : null;
  });

  const transition = animate ? spring : instant;

  return (
    <div ref={ref} className="relative">
      <p className="sr-only">
        Ilustração: uma agenda semanal enquanto chegam notificações de automações, como mensagens
        respondidas, marcações confirmadas e faturas pagas.
      </p>
      <div
        aria-hidden
        className="relative overflow-hidden rounded-[28px] bg-paper shadow-[0_1px_2px_rgb(15_16_18/0.05),0_30px_70px_-30px_rgb(15_16_18/0.28)] ring-1 ring-hair"
      >
        {/* Calendar toolbar */}
        <div className="flex h-[52px] items-center justify-between border-b border-hair px-5">
          <span className="text-[14px] font-semibold tracking-[-0.01em]">Outubro 2026</span>
          <span className="flex items-center gap-1 text-[12.5px] text-ink-2">
            <Chevron dir="left" />
            <span className="rounded-full bg-canvas px-3 py-1 font-medium">Hoje</span>
            <Chevron dir="right" />
          </span>
        </div>

        {/* Week grid */}
        <div
          className="relative grid grid-cols-[44px_repeat(3,minmax(0,1fr))] sm:grid-cols-[52px_repeat(5,minmax(0,1fr))]"
          style={{ gridTemplateRows: `${HEADER}px repeat(16, ${SLOT}px)` }}
        >
          {/* Hour lines */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              top: HEADER,
              backgroundImage:
                "linear-gradient(to bottom, rgb(15 16 18 / 0.07) 1px, transparent 1px)",
              backgroundSize: `100% ${SLOT * 2}px`,
            }}
          />

          {DAYS.map((d, i) => (
            <div
              key={d.short}
              className={cn(
                "row-start-1 row-end-[-1] border-l border-hair",
                COL[i],
                d.today && "bg-[rgb(15_16_18/0.015)]",
              )}
            >
              <div className="flex h-[44px] items-center justify-center gap-1.5 border-b border-hair text-[12px]">
                <span className="text-mute">{d.short}</span>
                <span
                  className={cn(
                    "grid size-6 place-items-center rounded-full tabular-nums",
                    d.today ? "bg-ink font-medium text-white" : "text-ink",
                  )}
                >
                  {d.n}
                </span>
              </div>
            </div>
          ))}

          {Array.from({ length: 8 }, (_, i) => FIRST_HOUR + i).map((h) => (
            <span
              key={h}
              className="col-start-1 -translate-y-[7px] pr-2 text-right text-[10.5px] text-mute tabular-nums"
              style={{ gridRow: rowOf(h) }}
            >
              {h}:00
            </span>
          ))}

          {BASE_EVENTS.map((e) => (
            <EventBlock key={`${e.day}-${e.start}`} event={e} />
          ))}

          <AnimatePresence>
            {NEW_EVENTS.filter((e) => step >= e.at).map((e) => (
              <motion.div
                key={`${cycle}-${e.day}-${e.start}`}
                className={cn("relative z-[1] mx-1 my-px", COL[e.day])}
                style={{ gridRow: `${rowOf(e.start)} / span ${e.hours * 2}` }}
                initial={animate ? { opacity: 0, scale: 0.92 } : false}
                animate={{ opacity: 1, scale: 1 }}
                exit={animate ? { opacity: 0, transition: fade } : undefined}
                transition={transition}
              >
                <EventCard event={e} highlight />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Current time, on today's column */}
          <div
            className={cn("relative z-[2] self-start", COL[3])}
            style={{ gridRow: rowOf(Math.floor(NOW_HOUR * 2) / 2) }}
          >
            <div
              className="absolute inset-x-0 h-px bg-[#e5484d]"
              style={{ top: ((NOW_HOUR * 2) % 1) * SLOT }}
            >
              <span className="absolute -top-[3px] -left-[3px] size-[7px] rounded-full bg-[#e5484d]" />
            </div>
          </div>
        </div>

        {/* Liquid-glass notifications over the calendar */}
        <div className="absolute right-3 bottom-3 left-3 flex flex-col justify-end gap-2 sm:right-auto sm:bottom-4 sm:left-[64px] sm:w-[312px]">
          <AnimatePresence initial={false} mode="popLayout">
            {stack.map(
              (item) =>
                item && (
                  <motion.div
                    key={item.id}
                    layout={animate ? "position" : false}
                    initial={animate ? { opacity: 0, y: 16, scale: 0.97 } : false}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={
                      animate ? { opacity: 0, y: -10, scale: 0.97, transition: fade } : undefined
                    }
                    transition={transition}
                  >
                    <Notification {...item} />
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function EventBlock({ event }: { event: CalEvent }) {
  return (
    <div
      className={cn("relative mx-1 my-px", COL[event.day])}
      style={{ gridRow: `${rowOf(event.start)} / span ${event.hours * 2}` }}
    >
      <EventCard event={event} />
    </div>
  );
}

function EventCard({ event, highlight = false }: { event: CalEvent; highlight?: boolean }) {
  return (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-[7px] py-1 pr-1.5 pl-2.5 before:absolute before:inset-y-1 before:left-1 before:w-[2.5px] before:rounded-full",
        TONE[event.tone],
        highlight && "shadow-[0_0_0_1.5px_rgb(255_255_255),0_4px_14px_-4px_rgb(15_16_18/0.25)]",
      )}
    >
      <p className="truncate text-[11px] leading-tight font-semibold">{event.title}</p>
      <p className="truncate text-[10.5px] leading-tight opacity-80">{event.who}</p>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" className="size-7 p-2 text-ink-2" aria-hidden>
      <path
        d={dir === "left" ? "M10 3.5L5.5 8l4.5 4.5" : "M6 3.5L10.5 8 6 12.5"}
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
