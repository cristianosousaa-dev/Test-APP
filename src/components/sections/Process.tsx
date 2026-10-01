"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";

const STEPS = [
  {
    title: "Diagnóstico",
    text: "Analisamos os seus processos e identificamos as automações com maior impacto.",
    gets: "Mapa de processos prioritários",
  },
  {
    title: "Proposta",
    text: "Âmbito, prazo e preço fixo definidos por escrito, antes de iniciar.",
    gets: "Proposta com âmbito, prazo e preço",
  },
  {
    title: "Implementação e testes",
    text: "Integramos os sistemas existentes e validamos com casos reais da sua operação.",
    gets: "Automação em produção",
  },
  {
    title: "Acompanhamento",
    text: "Monitorizamos o funcionamento e ajustamos à medida que o negócio evolui.",
    gets: "Suporte e melhoria contínua",
  },
];

/**
 * Scroll-told methodology: on desktop the index stays pinned on the left while the phases
 * pass on the right; the phase crossing the middle of the screen becomes active (one
 * IntersectionObserver, no scroll handler). The rail fills with the scroll.
 */
export function Process() {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = list.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const el of items) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="processo" aria-labelledby="processo-title" className="relative py-20 sm:py-28">
      <Container>
        <SectionHead
          index="07"
          kicker="Metodologia"
          id="processo-title"
          title="Do diagnóstico à automação em produção."
        >
          Quatro fases, com entregáveis definidos em cada etapa.
        </SectionHead>

        <div className="mt-14 grid grid-cols-1 gap-10 [timeline-scope:--process] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
          {/* Pinned index (desktop) */}
          <div aria-hidden className="hidden lg:block">
            <div className="sticky top-28 flex gap-5">
              <div className="relative w-[2px] bg-hair">
                <span className="process-fill absolute inset-0 origin-top bg-accent" />
              </div>
              <ol className="flex flex-col gap-1">
                {STEPS.map((s, i) => (
                  <li
                    key={s.title}
                    className={cn(
                      "flex items-center gap-3 py-2 text-[15px] transition-colors duration-500",
                      active === i ? "text-fg" : "text-fg-3",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-6 place-items-center font-mono text-[10.5px] transition-colors duration-500",
                        active === i
                          ? "bg-fg text-white"
                          : i < active
                            ? "bg-accent text-white"
                            : "shadow-[inset_0_0_0_1px_var(--color-hair-2)]",
                      )}
                    >
                      0{i + 1}
                    </span>
                    {s.title}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <ol ref={list} className="flex flex-col gap-[2px] [view-timeline:--process]">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                data-step={i}
                className={cn(
                  "relative grid gap-6 p-6 transition-[background-color,opacity] duration-700 sm:grid-cols-[120px_minmax(0,1fr)] sm:p-8 lg:min-h-[260px]",
                  active === i ? "bg-tile-2" : "bg-tile lg:opacity-70",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-0 left-0 h-full w-[2px] origin-top bg-accent transition-transform duration-700 ease-out-soft",
                    active === i ? "scale-y-100" : "scale-y-0",
                  )}
                />
                <span className="text-[56px] leading-none tracking-[-0.05em] text-fg-3 tabular-nums sm:text-[72px]">
                  0{i + 1}
                </span>
                <div className="flex flex-col">
                  <h3 className="text-[26px] tracking-[-0.025em]">{s.title}</h3>
                  <p className="mt-2 max-w-[34rem] text-[16px] leading-[1.6] text-fg-2">{s.text}</p>
                  <p className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                    <span className="label bg-fg px-2.5 py-1.5 text-[10px] text-white">
                      Entregável
                    </span>
                    <span className="text-[15px]">{s.gets}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
