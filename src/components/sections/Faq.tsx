"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";

const faqs = [
  {
    q: "Que tipo de negócios podem automatizar?",
    a: "Praticamente qualquer negócio com tarefas repetitivas: clínicas, oficinas, imobiliárias, restaurantes, lojas online, escritórios e serviços. Se uma tarefa se repete e segue regras, provavelmente pode ser automatizada.",
  },
  {
    q: "Tenho de mudar de software?",
    a: "Não. Ligamos as automações às ferramentas que já usa: WhatsApp, email, agenda, faturação, CRM ou folhas de cálculo. A sua equipa continua a trabalhar como está habituada.",
  },
  {
    q: "Quanto custa?",
    a: "Depende do que for automatizado. Depois do diagnóstico gratuito recebe uma proposta com preço fechado, para saber exatamente o que paga antes de começarmos.",
  },
  {
    q: "Quanto tempo demora?",
    a: "Depende da complexidade de cada automação. O prazo fica definido na proposta, antes de começarmos, e vai acompanhando cada etapa.",
  },
  {
    q: "Usam inteligência artificial?",
    a: "Quando acrescenta valor: perceber mensagens, ler documentos ou redigir respostas. Para o resto, usamos regras simples e fiáveis. As decisões importantes podem ficar sempre sujeitas à sua aprovação.",
  },
  {
    q: "Os meus dados ficam seguros?",
    a: "Usamos apenas os acessos necessários a cada automação, seguimos as boas práticas do RGPD e documentamos o que cada automação faz e a que dados acede.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const baseId = useId();

  return (
    <section id="faq" className="border-t border-line bg-surface py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.5fr]">
        <SectionHeader
          align="left"
          eyebrow="Perguntas frequentes"
          title="Tudo o que precisa de saber"
          description="Não encontrou a sua pergunta? Fale connosco, respondemos com todo o gosto."
        />
        <Reveal>
          <ul className="divide-y divide-line border-y border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const panelId = `${baseId}-panel-${i}`;
              const buttonId = `${baseId}-button-${i}`;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left text-[16.5px] font-medium tracking-[-0.01em] text-ink"
                    >
                      {f.q}
                      <Plus
                        aria-hidden
                        className={cn(
                          "size-5 shrink-0 text-muted transition-transform duration-300 ease-premium",
                          isOpen && "rotate-45 text-ink",
                        )}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: duration.base, ease }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-10 text-[15px] leading-relaxed text-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
