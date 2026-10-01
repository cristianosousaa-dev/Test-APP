"use client";

import { AnimatePresence, motion } from "motion/react";
import { type RefObject, useEffect, useRef, useState } from "react";
import { Check } from "@/components/visual/Bits";
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
  // What the automation touches lands a beat after the notification, when the wire arrives.
  const landed = useDelayed(cycle * n + step, animate ? 700 : 0);
  const landedStep = ((landed % n) + n) % n;
  const landedCycle = Math.floor(landed / n);

  // Live tally for the day: every notification that has landed so far bumps a counter.
  // The day "resets" every few loops so the numbers stay believable.
  const arrived = (landedCycle % 3) * n + landedStep + 1;
  const tally = { messages: 11, calendar: 3, invoices: 1 } as Record<string, number>;
  for (let k = 0; k < arrived; k++) {
    const app = FEED[k % n]?.app;
    const bucket = app === "requests" ? "messages" : app;
    if (bucket && bucket in tally) tally[bucket] = (tally[bucket] ?? 0) + 1;
  }

  return (
    <div ref={ref} className="relative animate-float">
      <p className="sr-only">
        Ilustração: uma agenda semanal enquanto chegam notificações de automações, como mensagens
        respondidas, marcações confirmadas e faturas pagas.
      </p>
      <div
        aria-hidden
        className="relative overflow-hidden rounded-[28px] bg-paper/90 shadow-[0_1px_2px_rgb(15_16_18/0.05),0_40px_90px_-40px_rgb(15_16_18/0.35)] ring-1 ring-white/70"
      >
        {/* Calendar toolbar */}
        <div className="flex h-[52px] items-center gap-1 border-b border-hair px-5">
          <span className="text-[14px] font-semibold tracking-[-0.01em]">Outubro 2026</span>
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
            {NEW_EVENTS.map((e) => (
              <div
                key={`slot-${e.at}`}
                data-slot={e.at}
                className={cn("pointer-events-none mx-1 my-px", COL[e.day])}
                style={{ gridRow: `${rowOf(e.start)} / span ${e.hours * 2}` }}
              />
            ))}
            {NEW_EVENTS.filter((e) => landedStep >= e.at && landedCycle === cycle).map((e) => (
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
                    data-note={item.id}
                    className="relative"
                    layout={animate ? "position" : false}
                    initial={animate ? { opacity: 0, y: 16, scale: 0.97 } : false}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={
                      animate ? { opacity: 0, y: -10, scale: 0.97, transition: fade } : undefined
                    }
                    transition={transition}
                  >
                    <Notification {...item} />
                    {animate && item.id === String(cycle * n + step) && <Processing />}
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating tally, half over the card edge. */}
      <div
        aria-hidden
        className="absolute -top-5 right-4 flex h-11 items-center gap-3.5 rounded-full bg-white/90 pr-4 pl-3 text-[12.5px] text-ink-2 shadow-[inset_0_1px_0_rgb(255_255_255),0_1px_2px_rgb(15_16_18/0.06),0_12px_30px_-12px_rgb(15_16_18/0.3)] ring-1 ring-white sm:right-6"
      >
        <span className="flex items-center gap-1.5 font-medium text-ink">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-go/50 motion-reduce:hidden" />
            <span className="relative size-2 rounded-full bg-go" />
          </span>
          Hoje
        </span>
        <Tally value={tally.messages ?? 0} label="mensagens" kind="messages" animate={animate} />
        <Tally value={tally.calendar ?? 0} label="marcações" kind="calendar" animate={animate} />
        <span className="hidden sm:contents">
          <Tally value={tally.invoices ?? 0} label="pagamentos" kind="invoices" animate={animate} />
        </span>
      </div>

      {animate && <Wire root={ref} noteId={String(cycle * n + step)} step={step} />}
    </div>
  );
}

/** Keeps the previous value for `ms` after it changes. */
function useDelayed<T>(value: T, ms: number): T {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (ms === 0) return;
    const id = window.setTimeout(() => setShown(value), ms);
    return () => window.clearTimeout(id);
  }, [value, ms]);
  return ms === 0 ? value : shown;
}

/** Thin bar that runs along a fresh notification, then a tick: the automation did its job. */
function Processing() {
  return (
    <>
      <motion.span
        className="absolute right-4 bottom-2 left-[62px] h-[2px] origin-left rounded-full bg-ink/60"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          scaleX: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
          opacity: { delay: 0.7, duration: 0.3 },
        }}
      />
      <motion.span
        className="absolute top-2 left-[36px] grid size-[18px] place-items-center rounded-full bg-go text-white ring-2 ring-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.45, delay: 0.6 }}
      >
        <Check className="size-2.5" />
      </motion.span>
    </>
  );
}

/**
 * Draws a wire from the newest notification to the thing the automation changed: the new
 * booking in the calendar, or the counter in the "Hoje" tally.
 */
function Wire({
  root,
  noteId,
  step,
}: {
  root: RefObject<HTMLDivElement | null>;
  noteId: string;
  step: number;
}) {
  const [geo, setGeo] = useState<{ d: string; x: number; y: number; w: number; h: number } | null>(
    null,
  );

  useEffect(() => {
    setGeo(null);
    const id = window.setTimeout(() => {
      const el = root.current;
      if (!el) return;
      const note = el.querySelector(`[data-note="${noteId}"]`);
      const app = FEED[step]?.app;
      const target =
        app === "calendar"
          ? el.querySelector(`[data-slot="${step}"]`)
          : el.querySelector(`[data-tally="${app === "invoices" ? "invoices" : "messages"}"]`);
      if (!note || !target || (target as HTMLElement).offsetParent === null) return;
      const box = el.getBoundingClientRect();
      const a = note.getBoundingClientRect();
      const b = target.getBoundingClientRect();
      const x1 = a.left - box.left + a.width * 0.72;
      const y1 = a.top - box.top + 6;
      const toTally = app !== "calendar";
      const x2 = b.left - box.left + (toTally ? b.width / 2 : 4);
      const y2 = b.top - box.top + (toTally ? b.height + 2 : b.height / 2);
      const midY = (y1 + y2) / 2;
      const d = toTally
        ? `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`
        : `M ${x1} ${y1} C ${x1} ${y2}, ${x2 - 60} ${y2}, ${x2} ${y2}`;
      setGeo({ d, x: x2, y: y2, w: box.width, h: box.height });
    }, 560); // after the notification's entrance spring has settled
    return () => window.clearTimeout(id);
  }, [root, noteId, step]);

  if (!geo) return null;
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 overflow-visible"
      width={geo.w}
      height={geo.h}
      fill="none"
    >
      <motion.path
        key={geo.d}
        d={geo.d}
        stroke="#0f1012"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.9 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0.9, 0.9, 0] }}
        transition={{ duration: 1.7, times: [0, 0.3, 1], ease: "easeOut" }}
      />
      <motion.circle
        key={`${geo.d}-ring`}
        cx={geo.x}
        cy={geo.y}
        r={6}
        fill="none"
        stroke="#1e8e5a"
        strokeWidth={1.5}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 2.6], opacity: [0, 1, 0] }}
        transition={{ duration: 1.1, delay: 0.42, times: [0, 0.2, 1] }}
      />
      <motion.circle
        key={`${geo.d}-dot`}
        cx={geo.x}
        cy={geo.y}
        r={3}
        fill="#1e8e5a"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, delay: 0.42, times: [0, 0.1, 0.7, 1] }}
      />
    </svg>
  );
}

/** A number that rolls up when it changes, like a mechanical counter. */
function Tally({
  value,
  label,
  kind,
  animate,
}: {
  value: number;
  label: string;
  kind: string;
  animate: boolean;
}) {
  return (
    <span data-tally={kind} className="flex items-baseline gap-1">
      <span className="relative inline-grid h-[1.25em] overflow-hidden font-semibold text-ink tabular-nums">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={value}
            className="col-start-1 row-start-1"
            initial={animate ? { y: "100%", opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            exit={animate ? { y: "-100%", opacity: 0 } : undefined}
            transition={animate ? spring : instant}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      {label}
    </span>
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
