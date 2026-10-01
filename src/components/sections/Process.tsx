"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    title: "Diagnóstico gratuito",
    text: "Numa conversa de 30 minutos, percebemos como trabalha e onde se perde mais tempo.",
  },
  {
    title: "Proposta à medida",
    text: "Desenhamos as automações certas para si, com prazo e preço fechados antes de começar.",
  },
  {
    title: "Construção e testes",
    text: "Construímos sobre as ferramentas que já usa e testamos com casos reais do seu negócio.",
  },
  {
    title: "Lançamento e acompanhamento",
    text: "Pomos tudo a funcionar, acompanhamos os resultados e ajustamos quando o negócio muda.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="processo" className="border-y border-line bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Como funciona"
          title="Da conversa à automação a funcionar"
          description="Um processo simples, sem jargão técnico. Você explica como trabalha; nós tratamos do resto."
        />

        <div ref={ref} className="relative mt-16">
          {/* Progress rail: horizontal on large screens, vertical on small. */}
          <div
            className="absolute top-5 right-[12.5%] left-[12.5%] hidden h-px bg-line lg:block"
            aria-hidden
          >
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-accent to-flow"
              style={{ scaleX: reduced ? 1 : progress }}
            />
          </div>
          <div className="absolute top-5 bottom-5 left-5 w-px bg-line lg:hidden" aria-hidden>
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-accent to-flow"
              style={{ scaleY: reduced ? 1 : progress }}
            />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 0.08}
                className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center"
              >
                <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-[13px] font-medium text-ink shadow-card">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="lg:mt-5">
                  <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
