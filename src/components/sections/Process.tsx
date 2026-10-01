"use client";

import { FileSignature, LineChart, type LucideIcon, MessagesSquare, Wrench } from "lucide-react";
import { type MotionValue, motion, motionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { RevealWords } from "@/components/flow/RevealWords";
import { SectionLabel } from "@/components/flow/SectionLabel";
import { Container } from "@/components/ui/Container";
import { TiltCard } from "@/components/ui/Tilt";
import { useBackdropOnView } from "@/lib/backdrop";
import { useMotionPreference } from "@/lib/motion-preference";

const FULL = motionValue(1);

const STEPS: { title: string; text: string; gets: string; icon: LucideIcon; when: string }[] = [
  {
    title: "Conversa de 30 minutos",
    text: "Explica-nos como trabalha. Mostramos-lhe o que faz sentido automatizar primeiro.",
    gets: "Lista das tarefas a automatizar",
    icon: MessagesSquare,
    when: "Dia 1 · grátis",
  },
  {
    title: "Proposta com preço fechado",
    text: "Sabe o que vai pagar e quando fica pronto, antes de começarmos.",
    gets: "Preço, prazo e o que fica incluído",
    icon: FileSignature,
    when: "Depois da conversa",
  },
  {
    title: "Construção e testes",
    text: "Ligamos às ferramentas que já usa e testamos com casos reais do seu negócio.",
    gets: "Automação a funcionar no seu negócio",
    icon: Wrench,
    when: "No prazo da proposta",
  },
  {
    title: "Acompanhamento",
    text: "Ficamos atentos ao funcionamento e ajustamos quando o seu negócio muda.",
    gets: "Resumo mensal do que foi feito",
    icon: LineChart,
    when: "Todos os meses",
  },
];

/** The four steps light up in order as a line draws through them with the scroll. */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  useBackdropOnView(ref, "process");
  const { enabled } = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 80%", "end 55%"] });
  // With motion off everything is simply drawn and lit.
  const progress = enabled ? scrollYProgress : FULL;

  return (
    <section ref={ref} id="processo" aria-labelledby="processo-title" className="pb-20 sm:pb-28">
      <Container>
        <div className="max-w-[44rem]">
          <SectionLabel index="03">Como trabalhamos</SectionLabel>
          <RevealWords
            id="processo-title"
            text="Simples para si, do primeiro dia ao último."
            className="mt-3 text-[36px] leading-[1.06] font-medium tracking-[-0.032em] sm:text-[52px]"
          />
          <p className="mt-4 max-w-[34rem] text-[17px] leading-[1.6] text-ink-2">
            Quatro passos, sem surpresas. Em cada um sabe exatamente o que recebe.
          </p>
        </div>

        <ol
          ref={list}
          className="relative mt-16 grid gap-8 pl-12 lg:grid-cols-4 lg:gap-5 lg:pt-14 lg:pl-0"
        >
          {/* Track + scroll-drawn line: vertical on small screens, horizontal on large. */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[15px] w-px bg-ink/10 lg:top-[15px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
          />
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[15px] w-px origin-top bg-ink lg:hidden"
            style={{ scaleY: progress }}
          />
          <motion.span
            aria-hidden
            className="absolute top-[15px] right-0 left-0 hidden h-px origin-left bg-ink lg:block"
            style={{ scaleX: progress }}
          />
          {STEPS.map((s, i) => (
            <Step key={s.title} index={i} progress={progress} {...s} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Step({
  index,
  title,
  text,
  gets,
  icon: Icon,
  when,
  progress,
}: {
  index: number;
  title: string;
  text: string;
  gets: string;
  icon: LucideIcon;
  when: string;
  progress: MotionValue<number>;
}) {
  const at = index / STEPS.length + 0.04;
  const lit = useTransform(progress, [at - 0.04, at + 0.06], [0, 1]);
  const dim = useTransform(lit, [0, 1], [0.72, 1]);
  const y = useTransform(lit, [0, 1], [18, 0]);
  const iconRotate = useTransform(lit, [0, 1], [-25, 0]);
  return (
    <li className="relative">
      <span className="absolute top-0 -left-12 grid size-[31px] place-items-center rounded-full bg-canvas ring-1 ring-ink/15 lg:-top-14 lg:left-0">
        <motion.span
          className="absolute inset-0 rounded-full bg-ink"
          style={{ scale: lit, opacity: lit }}
        />
        <motion.span className="relative text-[12px] font-medium tabular-nums text-white mix-blend-difference">
          0{index + 1}
        </motion.span>
      </span>
      <motion.div style={{ opacity: dim, y }}>
        <TiltCard max={4}>
          <div className="glass glass-panel flex h-full flex-col rounded-[24px] p-5">
            <div className="flex items-center justify-between">
              <motion.span
                className="grid size-10 place-items-center rounded-full bg-ink text-white"
                style={{ scale: lit, rotate: iconRotate }}
              >
                <Icon className="size-[18px]" strokeWidth={1.8} />
              </motion.span>
              <span className="rounded-full bg-white/60 px-2.5 py-1 text-[12px] text-ink-2 ring-1 ring-white">
                {when}
              </span>
            </div>
            <h3 className="mt-5 text-[19px] font-medium tracking-[-0.018em]">{title}</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">{text}</p>
            <p className="mt-5 flex items-start gap-2 border-t border-white/80 pt-4 text-[14px]">
              <span className="text-mute">Recebe</span>
              <span className="font-medium text-ink">{gets}</span>
            </p>
          </div>
        </TiltCard>
      </motion.div>
    </li>
  );
}
