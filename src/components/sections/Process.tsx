"use client";

import { type MotionValue, motion, motionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useBackdropOnView } from "@/lib/backdrop";
import { useMotionPreference } from "@/lib/motion-preference";

const FULL = motionValue(1);

const STEPS = [
  {
    title: "Conversa de 30 minutos",
    text: "Explica-nos como trabalha. Mostramos-lhe o que faz sentido automatizar primeiro. Sem custos.",
  },
  {
    title: "Proposta com preço fechado",
    text: "Sabe o que vai pagar e quando fica pronto, antes de começarmos.",
  },
  {
    title: "Construção e testes",
    text: "Ligamos às ferramentas que já usa e testamos com casos reais do seu negócio.",
  },
  {
    title: "Acompanhamento",
    text: "Ficamos atentos ao funcionamento e ajustamos quando o seu negócio muda.",
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
    <section ref={ref} id="processo" aria-labelledby="processo-title" className="py-24 sm:py-36">
      <Container>
        <Reveal className="max-w-[44rem]">
          <p className="text-[14px] text-ink-2">Como trabalhamos</p>
          <h2
            id="processo-title"
            className="mt-3 text-[36px] leading-[1.06] font-medium tracking-[-0.032em] sm:text-[52px]"
          >
            Simples para si, do primeiro dia ao último.
          </h2>
        </Reveal>

        <ol
          ref={list}
          className="relative mt-16 grid gap-10 pl-12 lg:grid-cols-4 lg:gap-8 lg:pt-14 lg:pl-0"
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
  progress,
}: {
  index: number;
  title: string;
  text: string;
  progress: MotionValue<number>;
}) {
  const at = index / STEPS.length + 0.04;
  const lit = useTransform(progress, [at - 0.04, at + 0.06], [0, 1]);
  const dim = useTransform(lit, [0, 1], [0.72, 1]);
  const y = useTransform(lit, [0, 1], [10, 0]);
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
        <h3 className="text-[19px] font-medium tracking-[-0.018em]">{title}</h3>
        <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">{text}</p>
      </motion.div>
    </li>
  );
}
