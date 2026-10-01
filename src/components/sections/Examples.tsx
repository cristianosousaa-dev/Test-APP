"use client";

import {
  AnimatePresence,
  animate,
  type MotionValue,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { RevealWords } from "@/components/flow/RevealWords";
import { SectionLabel } from "@/components/flow/SectionLabel";
import { bookings } from "@/components/previews/Bookings";
import { leads } from "@/components/previews/Leads";
import { payments } from "@/components/previews/Payments";
import { quotes } from "@/components/previews/Quotes";
import type { PreviewConfig } from "@/components/previews/types";
import { Container } from "@/components/ui/Container";
import { Check } from "@/components/visual/Bits";
import { setBackdropTheme } from "@/lib/backdrop";
import { cn } from "@/lib/cn";
import { setIslandDetail } from "@/lib/island";
import { instant, spring } from "@/lib/motion";
import { useMotionPreference } from "@/lib/motion-preference";

const PREVIEWS: PreviewConfig[] = [bookings, quotes, leads, payments];

/* Scroll budget: each step gets one unit, plus one unit of rest at the end of a chapter. */
const WEIGHTS = PREVIEWS.map((p) => p.steps.length + 1);
const TOTAL = WEIGHTS.reduce((a, b) => a + b, 0);
const STARTS = WEIGHTS.map((_, i) => WEIGHTS.slice(0, i).reduce((a, b) => a + b, 0));
const UNIT_VH = 24;

interface Position {
  chapter: number;
  step: number;
}

function locate(progress: number): Position & { local: number } {
  const u = Math.min(Math.max(progress, 0), 0.99999) * TOTAL;
  let chapter = 0;
  for (let i = 0; i < STARTS.length; i++) if (u >= (STARTS[i] ?? 0)) chapter = i;
  const local = u - (STARTS[chapter] ?? 0);
  const steps = PREVIEWS[chapter]?.steps.length ?? 1;
  return { chapter, step: Math.min(steps - 1, Math.floor(local)), local };
}

/** 0→1 as the scroll moves through the steps of one chapter. */
function chapterFill(i: number) {
  return (v: number) => {
    const u = v * TOTAL - (STARTS[i] ?? 0);
    return Math.min(Math.max(u / ((WEIGHTS[i] ?? 2) - 1), 0), 1);
  };
}

function stepFill(v: number) {
  const { local, step } = locate(v);
  return Math.min(Math.max(local - step, 0), 1);
}

/**
 * Scroll-driven walkthrough. The section pins while you scroll; each scroll unit advances one
 * step of the automation, chapters hand over to the next, and the page backdrop follows along.
 * Every chapter, step and tool is clickable and scrolls to its moment.
 */
export function Examples() {
  const track = useRef<HTMLDivElement>(null);
  const { enabled, reduced } = useMotionPreference();
  const [pos, setPos] = useState<Position>({ chapter: 0, step: 0 });
  const centred = useInView(track, { margin: "-45% 0px -45% 0px" });
  const visible = useInView(track);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const fraction = useTransform(scrollYProgress, stepFill);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = locate(v);
    setPos((p) => (p.chapter === next.chapter && p.step === next.step ? p : next));
  });

  const preview = PREVIEWS[pos.chapter] ?? bookings;

  useEffect(() => {
    if (centred) setBackdropTheme(preview.theme);
  }, [centred, preview.theme]);

  // Tell the header island what the walkthrough is doing right now.
  useEffect(() => {
    setIslandDetail(centred ? `${preview.tab} · ${pos.step + 1}/${preview.steps.length}` : null);
  }, [centred, preview, pos.step]);
  useEffect(() => () => setIslandDetail(null), []);

  function goTo(chapter: number, step = 0) {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    const u = (STARTS[chapter] ?? 0) + step + 0.5;
    window.scrollTo({ top: top + (u / TOTAL) * span, behavior: reduced ? "auto" : "smooth" });
  }

  const { Stage } = preview;

  return (
    <section id="exemplos" aria-labelledby="exemplos-title" className="pt-0">
      <Container>
        <div className="max-w-[44rem]">
          <SectionLabel index="01">Exemplos</SectionLabel>
          <RevealWords
            id="exemplos-title"
            text="Veja como fica no seu dia a dia."
            className="mt-3 text-[36px] leading-[1.06] font-medium tracking-[-0.032em] sm:text-[52px]"
          />
          <p className="mt-4 max-w-[36rem] text-[17px] leading-[1.6] text-ink-2">
            Faça scroll e acompanhe quatro automações, passo a passo. Os nomes e valores são
            ilustrativos; os fluxos são reais.
          </p>
        </div>
      </Container>

      <div
        ref={track}
        data-track
        className="relative"
        style={{ height: `calc(${TOTAL * UNIT_VH}vh + 100svh)` }}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col pt-[76px] pb-4 sm:pt-[88px] lg:justify-center lg:pt-16 lg:pb-0">
          <Container className="flex min-h-0 flex-1 flex-col lg:grid lg:flex-none lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-14">
            {/* Mobile and tablet: chapter switcher + current step */}
            <div className="lg:hidden">
              <ChapterPills current={pos.chapter} progress={scrollYProgress} onPick={goTo} />
              <p className="mt-3 line-clamp-2 text-[17px] leading-snug font-medium tracking-[-0.015em]">
                {preview.title}
              </p>
              <StepLine preview={preview} step={pos.step} fraction={fraction} />
            </div>

            {/* Desktop: chapter list */}
            <ol className="hidden lg:flex lg:flex-col" aria-label="Exemplos de automações">
              {PREVIEWS.map((p, i) => (
                <Chapter
                  key={p.id}
                  preview={p}
                  index={i}
                  active={i === pos.chapter}
                  step={i === pos.chapter ? pos.step : -1}
                  progress={scrollYProgress}
                  fraction={fraction}
                  reduced={reduced}
                  onPick={goTo}
                />
              ))}
            </ol>

            <div className="mt-4 flex min-h-0 flex-1 flex-col sm:mt-8 lg:mt-6 lg:h-[min(616px,calc(100svh-110px))] lg:flex-none">
              <p className="sr-only">
                {`${preview.tab}, passo ${pos.step + 1} de ${preview.steps.length}: ${preview.steps[pos.step]}`}
              </p>
              <FitHeight natural={540}>
                <div className="relative">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={preview.id}
                      initial={
                        enabled ? { opacity: 0, y: 24, scale: 0.97, filter: "blur(8px)" } : false
                      }
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={
                        enabled
                          ? {
                              opacity: 0,
                              y: -16,
                              scale: 0.98,
                              filter: "blur(6px)",
                              transition: { duration: 0.22 },
                            }
                          : undefined
                      }
                      transition={enabled ? spring : instant}
                    >
                      <Stage
                        step={pos.step}
                        cycle={0}
                        animate={enabled}
                        running={enabled && visible}
                      />
                    </motion.div>
                  </AnimatePresence>
                  {enabled && visible && <Sweep key={`${preview.id}-${pos.step}`} />}
                  <StatusPill
                    preview={preview}
                    step={pos.step}
                    reduced={reduced}
                    enabled={enabled}
                  />
                </div>
              </FitHeight>
              <ToolChain preview={preview} step={pos.step} onPick={(s) => goTo(pos.chapter, s)} />
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function Chapter({
  preview,
  index,
  active,
  step,
  progress,
  fraction,
  reduced,
  onPick,
}: {
  preview: PreviewConfig;
  index: number;
  active: boolean;
  step: number;
  progress: MotionValue<number>;
  fraction: MotionValue<number>;
  reduced: boolean;
  onPick: (chapter: number, step?: number) => void;
}) {
  const fill = useTransform(progress, chapterFill(index));
  return (
    <li className="relative border-t border-hair-2">
      <span aria-hidden className="absolute inset-x-0 -top-px h-px overflow-hidden">
        <motion.span className="block h-full origin-left bg-ink" style={{ scaleX: fill }} />
      </span>
      <button
        type="button"
        onClick={() => onPick(index)}
        aria-current={active ? "step" : undefined}
        className={cn(
          "group flex w-full items-baseline gap-4 py-4 text-left transition-colors duration-300",
          active ? "text-ink" : "text-mute hover:text-ink",
        )}
      >
        <span className="w-6 text-[13px] tabular-nums">0{index + 1}</span>
        <span className="flex-1 text-[20px] font-medium tracking-[-0.02em] transition-transform duration-300 ease-out-soft group-hover:translate-x-1 xl:text-[22px]">
          {preview.tab}
        </span>
        {!active && (
          <span className="text-[13px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Ver exemplo
          </span>
        )}
      </button>
      {/* Grid-rows 0fr→1fr: animates to the content height in CSS. A JS "height: auto"
          animation measures the DOM and resets window scroll, which cancels smooth scrolling. */}
      <div
        inert={!active}
        className={cn(
          "grid transition-[grid-template-rows,opacity] ease-out-soft",
          reduced ? "duration-0" : "duration-500",
          active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-5 pl-10">
            <p className="text-[13.5px] text-mute">{preview.sector}</p>
            <p className="mt-1.5 text-[15.5px] leading-[1.55] text-ink-2">{preview.description}</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] text-ink-2 [@media(max-height:820px)]:hidden">
              {preview.outcomes.map((o) => (
                <li key={o} className="flex items-center gap-1.5">
                  <Check className="size-3 text-go" />
                  {o}
                </li>
              ))}
            </ul>
            <ol className="mt-4 flex flex-col">
              {preview.steps.map((label, i) => (
                <StepRow
                  key={label}
                  label={label}
                  index={i}
                  state={i < step ? "done" : i === step ? "current" : "next"}
                  fraction={fraction}
                  onPick={() => onPick(index, i)}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </li>
  );
}

function StepRow({
  label,
  index,
  state,
  fraction,
  onPick,
}: {
  label: string;
  index: number;
  state: "done" | "current" | "next";
  fraction: MotionValue<number>;
  onPick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onPick}
        aria-current={state === "current" ? "step" : undefined}
        className="group -ml-2 flex w-full items-center gap-3 rounded-[12px] py-[7px] pr-2 pl-2 text-left text-[14.5px] transition-colors duration-200 hover:bg-white/55"
      >
        <span
          className={cn(
            "grid size-[22px] shrink-0 place-items-center rounded-full text-[11px] tabular-nums transition-[background-color,color,box-shadow] duration-300",
            state === "next"
              ? "text-mute ring-1 ring-hair-2 group-hover:text-ink group-hover:ring-ink/40"
              : "bg-ink text-white",
          )}
        >
          {state === "done" ? <Check className="size-3" /> : index + 1}
        </span>
        <span className="relative flex-1">
          <span
            className={cn(
              "transition-colors duration-300",
              state === "current"
                ? "font-medium text-ink"
                : state === "done"
                  ? "text-ink-2"
                  : "text-mute group-hover:text-ink-2",
            )}
          >
            {label}
          </span>
          {state === "current" && (
            <span className="absolute inset-x-0 -bottom-[5px] h-[2px] overflow-hidden rounded-full bg-hair">
              <motion.span
                className="block h-full origin-left bg-ink"
                style={{ scaleX: fraction }}
              />
            </span>
          )}
        </span>
      </button>
    </li>
  );
}

function ChapterPills({
  current,
  progress,
  onPick,
}: {
  current: number;
  progress: MotionValue<number>;
  onPick: (i: number) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  // Keep the active chapter in view inside the horizontal strip. Animated by hand: a
  // smooth scrollTo here would cancel the page's own smooth scroll in Chromium.
  useEffect(() => {
    const el = scroller.current;
    const pill = el?.querySelectorAll("button")[current];
    if (!el || !pill || el.offsetParent === null) return;
    const left = pill.offsetLeft - (el.clientWidth - pill.offsetWidth) / 2;
    const controls = animate(el.scrollLeft, left, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.scrollLeft = v;
      },
    });
    return () => controls.stop();
  }, [current]);

  return (
    <div
      ref={scroller}
      className="relative -mx-6 overflow-x-auto px-6 [scrollbar-width:none] sm:mx-0 sm:px-0"
    >
      <div className="flex w-max gap-1.5">
        {PREVIEWS.map((p, i) => (
          <PillButton
            key={p.id}
            label={p.tab}
            active={i === current}
            progress={progress}
            index={i}
            onPick={() => onPick(i)}
          />
        ))}
      </div>
    </div>
  );
}

function PillButton({
  label,
  active,
  progress,
  index,
  onPick,
}: {
  label: string;
  active: boolean;
  progress: MotionValue<number>;
  index: number;
  onPick: () => void;
}) {
  const fill = useTransform(progress, chapterFill(index));
  return (
    <button
      type="button"
      onClick={onPick}
      aria-current={active ? "step" : undefined}
      className={cn(
        "relative h-9 overflow-hidden rounded-full px-3.5 text-[13.5px] font-medium whitespace-nowrap ring-1 transition-[background-color,color,transform] duration-300 active:scale-[0.97]",
        active ? "bg-ink text-white ring-ink" : "bg-white/55 text-ink-2 ring-white/70",
      )}
    >
      {active && (
        <motion.span
          aria-hidden
          className="absolute inset-y-0 left-0 w-full origin-left bg-white/15"
          style={{ scaleX: fill }}
        />
      )}
      <span className="relative">{label}</span>
    </button>
  );
}

function StepLine({
  preview,
  step,
  fraction,
}: {
  preview: PreviewConfig;
  step: number;
  fraction: MotionValue<number>;
}) {
  return (
    <div className="mt-1.5">
      <p className="flex items-baseline gap-2 text-[14px] text-ink-2">
        <span className="text-mute tabular-nums">
          {step + 1}/{preview.steps.length}
        </span>
        <span className="truncate">{preview.steps[step]}</span>
      </p>
      <div className="mt-2 flex gap-1">
        {preview.steps.map((s, i) => (
          <span key={s} className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/10">
            {i < step && <span className="block h-full bg-ink" />}
            {i === step && (
              <motion.span
                className="block h-full origin-left bg-ink"
                style={{ scaleX: fraction }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/** The tools this automation connects, lighting up as each one joins the flow. */
function ToolChain({
  preview,
  step,
  onPick,
}: {
  preview: PreviewConfig;
  step: number;
  onPick: (step: number) => void;
}) {
  return (
    <div className="mt-5 hidden flex-wrap items-center gap-2 sm:flex">
      <span className="mr-1 text-[12.5px] text-mute">Ligado a</span>
      {preview.tools.map((t, i) => {
        const on = step >= t.at;
        const nextOn = (preview.tools[i + 1]?.at ?? Number.POSITIVE_INFINITY) <= step;
        return (
          <span key={t.label} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPick(t.at)}
              className={cn(
                "h-8 rounded-full px-3 text-[13px] font-medium ring-1 transition-[background-color,color,box-shadow,transform] duration-300 active:scale-[0.96]",
                on
                  ? "bg-white text-ink shadow-[0_1px_2px_rgb(15_16_18/0.08)] ring-white"
                  : "bg-white/35 text-mute ring-white/60 hover:bg-white/60 hover:text-ink-2",
              )}
            >
              {t.label}
            </button>
            {i < preview.tools.length - 1 && (
              <span className="relative h-px w-5 overflow-hidden bg-ink/15 xl:w-8">
                <span
                  className={cn(
                    "absolute inset-0 origin-left bg-ink transition-transform duration-500 ease-out-soft",
                    nextOn ? "scale-x-100" : "scale-x-0",
                  )}
                />
                {on && !nextOn && (
                  <span className="absolute inset-y-0 left-0 w-1/3 animate-flow bg-gradient-to-r from-transparent via-ink to-transparent" />
                )}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

/** Scales its fixed-height child down when the viewport is too short to show it whole. */
function FitHeight({ natural, children }: { natural: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const h = entry?.contentRect.height ?? natural;
      setScale(Math.min(1, h / natural));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [natural]);

  return (
    <div ref={ref} className="relative min-h-0 flex-1">
      {/* A motion element, so layout animations inside account for the scale. */}
      <motion.div
        className="absolute top-0 left-1/2"
        style={{ width: `${100 / scale}%`, x: "-50%", scale, originY: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** A band of light that crosses the stage each time the automation takes a step. */
function Sweep() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]"
    >
      <motion.span
        className="absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(100deg,transparent,rgb(255_255_255/0.55),transparent)]"
        initial={{ x: "0%", opacity: 0 }}
        animate={{ x: "420%", opacity: [0, 1, 0] }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      />
    </span>
  );
}

/** Live status of the run, riding on the stage's top edge. */
function StatusPill({
  preview,
  step,
  reduced,
  enabled,
}: {
  preview: PreviewConfig;
  step: number;
  reduced: boolean;
  /** False when reduced motion or the pause toggle is on: the spinner stops. */
  enabled: boolean;
}) {
  const done = step === preview.steps.length - 1;
  const t = reduced ? instant : spring;
  return (
    <div
      aria-hidden
      className="glass absolute -top-5 left-1/2 hidden h-10 -translate-x-1/2 items-center gap-2.5 rounded-full pr-4 pl-2 text-[13px] whitespace-nowrap sm:flex"
    >
      <span className="relative grid size-6 place-items-center">
        <AnimatePresence initial={false} mode="popLayout">
          {done ? (
            <motion.span
              key="done"
              className="grid size-6 place-items-center rounded-full bg-go text-white"
              initial={reduced ? false : { scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={reduced ? undefined : { scale: 0 }}
              transition={reduced ? instant : { type: "spring", duration: 0.5, bounce: 0.4 }}
            >
              <Check className="size-3.5" />
            </motion.span>
          ) : (
            <motion.svg
              key="run"
              viewBox="0 0 24 24"
              className="size-6"
              initial={reduced ? false : { scale: 0 }}
              animate={{ scale: 1, rotate: enabled ? 360 : 0 }}
              exit={reduced ? undefined : { scale: 0 }}
              transition={{
                scale: t,
                rotate: enabled
                  ? { duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
                  : instant,
              }}
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="rgb(15 16 18 / 0.12)"
                strokeWidth="2.5"
              />
              <path
                d="M12 3a9 9 0 0 1 9 9"
                fill="none"
                stroke="#0f1012"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </span>
      <span className="font-medium text-ink">{done ? "Concluído" : "A executar"}</span>
      <span className="text-mute tabular-nums">
        {step + 1}/{preview.steps.length}
      </span>
      <span className="relative block h-[1.3em] min-w-0 overflow-hidden text-ink-2">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={`${preview.id}-${step}`}
            className="block"
            initial={reduced ? false : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? undefined : { y: "-110%", opacity: 0 }}
            transition={t}
          >
            {preview.steps[step]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
