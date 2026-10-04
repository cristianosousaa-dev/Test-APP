"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";

/* Each phase states what happens, what is asked of the client and what they receive. */
const STEPS = [
  {
    title: "Pedido",
    text: "Descreve a tarefa que pretende automatizar, com as suas palavras. Analisamos o pedido e confirmamos se é viável.",
    yours: "Descrever a tarefa no formulário ou por email.",
    gets: "Resposta sobre a viabilidade, sem custos.",
  },
  {
    title: "Diagnóstico",
    text: "Numa conversa de 30 minutos, por telefone ou videochamada, vemos como a tarefa é feita hoje, que programas utiliza e onde se perde mais tempo.",
    yours: "Mostrar como o processo funciona atualmente.",
    gets: "Uma recomendação clara sobre o que automatizar primeiro.",
  },
  {
    title: "Proposta",
    text: "Enviamos uma proposta escrita com o âmbito, o prazo e o preço fixo. Nada avança sem a sua aprovação.",
    yours: "Aprovar, pedir ajustes ou recusar.",
    gets: "Proposta com âmbito, prazo e preço definidos.",
  },
  {
    title: "Implementação",
    text: "Desenvolvemos a automação e fazemos a ligação aos seus sistemas, sem interromper o trabalho da equipa. Antes de entrar em funcionamento, é testada com casos reais.",
    yours: "Disponibilizar os acessos necessários e validar os resultados.",
    gets: "A automação em funcionamento, com documentação simples.",
  },
  {
    title: "Acompanhamento",
    text: "Monitorizamos cada execução. Se um sistema mudar ou algo falhar, somos nós a corrigir. Quando o negócio evolui, a automação acompanha.",
    yours: "Informar-nos sempre que a forma de trabalhar mudar.",
    gets: "Monitorização, correções e ajustes incluídos na mensalidade.",
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
    <section id="processo" aria-labelledby="processo-title" className="relative py-28 sm:py-40">
      <Container>
        <SectionHead
          index="07"
          kicker="Como trabalhamos"
          id="processo-title"
          title={
            <>
              Um processo simples,{" "}
              <span className="text-accent">do primeiro contacto à manutenção.</span>
            </>
          }
        >
          Em cada fase sabe o que vai acontecer, o que precisamos de si e o que vai receber.
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
                  "relative grid gap-6 p-6 transition-[background-color,opacity] duration-700 sm:grid-cols-[96px_minmax(0,1fr)] sm:p-8",
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
                <span
                  className={cn(
                    "step-num font-display text-[56px] leading-none tracking-[-0.04em] tabular-nums sm:text-[72px]",
                    active === i && "is-active",
                  )}
                >
                  0{i + 1}
                </span>
                <div className="flex flex-col">
                  <h3 className="font-display text-[26px] tracking-[-0.025em]">{s.title}</h3>
                  <p className="mt-2 max-w-[36rem] text-[16px] leading-[1.6] text-fg-2">{s.text}</p>
                  <dl className="mt-6 grid grid-cols-1 gap-[2px] sm:grid-cols-2">
                    <div className="bg-white/50 p-4">
                      <dt className="label text-[10px] text-fg-3">A sua parte</dt>
                      <dd className="mt-1.5 text-[14.5px] leading-[1.5]">{s.yours}</dd>
                    </div>
                    <div className="bg-fg p-4 text-white">
                      <dt className="label text-[10px] text-white/60">O que recebe</dt>
                      <dd className="mt-1.5 text-[14.5px] leading-[1.5]">{s.gets}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
