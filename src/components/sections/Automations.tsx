"use client";

import {
  BarChart3,
  Bell,
  CalendarCheck,
  CircleCheck,
  Clock,
  FileText,
  Inbox,
  Landmark,
  type LucideIcon,
  Mail,
  MessageCircle,
  Package,
  Receipt,
  Send,
  Star,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type PointerEvent, useRef, useState } from "react";
import { RevealWords } from "@/components/flow/RevealWords";
import { SectionLabel } from "@/components/flow/SectionLabel";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useBackdropOnView } from "@/lib/backdrop";
import { cn } from "@/lib/cn";
import { instant, spring } from "@/lib/motion";
import { useMotionPreference } from "@/lib/motion-preference";

interface Rule {
  when: string;
  whenIcon: LucideIcon;
  action: string;
  actionIcon: LucideIcon;
}

const GROUPS: { title: string; blurb: string; rules: Rule[] }[] = [
  {
    title: "Clientes",
    blurb: "Mensagens, marcações e avaliações",
    rules: [
      {
        when: "Chega uma mensagem no WhatsApp",
        whenIcon: MessageCircle,
        action: "Responde com horários livres e marca",
        actionIcon: CalendarCheck,
      },
      {
        when: "Falta um dia para a marcação",
        whenIcon: Clock,
        action: "Envia lembrete e pede confirmação",
        actionIcon: Bell,
      },
      {
        when: "O serviço fica concluído",
        whenIcon: CircleCheck,
        action: "Pede uma avaliação no Google",
        actionIcon: Star,
      },
    ],
  },
  {
    title: "Vendas",
    blurb: "Contactos, orçamentos e seguimento",
    rules: [
      {
        when: "Entra um pedido pelo site ou portal",
        whenIcon: Inbox,
        action: "Responde em segundos e qualifica",
        actionIcon: Send,
      },
      {
        when: "O cliente pede um orçamento",
        whenIcon: Wrench,
        action: "Prepara o PDF com os seus preços",
        actionIcon: FileText,
      },
      {
        when: "Orçamento sem resposta há 3 dias",
        whenIcon: Clock,
        action: "Faz o seguimento por si",
        actionIcon: Mail,
      },
    ],
  },
  {
    title: "Finanças",
    blurb: "Faturas, cobranças e recebimentos",
    rules: [
      {
        when: "O trabalho fica concluído",
        whenIcon: CircleCheck,
        action: "Emite a fatura e envia ao cliente",
        actionIcon: Receipt,
      },
      {
        when: "Uma fatura vence sem pagamento",
        whenIcon: Bell,
        action: "Envia lembrete com referência MB",
        actionIcon: Mail,
      },
      {
        when: "Entra um pagamento no banco",
        whenIcon: Landmark,
        action: "Marca a fatura como paga",
        actionIcon: CircleCheck,
      },
    ],
  },
  {
    title: "Operações",
    blurb: "Documentos, stock e relatórios",
    rules: [
      {
        when: "Chega uma fatura de fornecedor",
        whenIcon: Mail,
        action: "Lê os dados com IA e lança",
        actionIcon: FileText,
      },
      {
        when: "O stock desce do mínimo",
        whenIcon: Package,
        action: "Prepara a encomenda ao fornecedor",
        actionIcon: Send,
      },
      {
        when: "Segunda-feira, 8:00",
        whenIcon: Clock,
        action: "Envia-lhe o resumo da semana",
        actionIcon: BarChart3,
      },
    ],
  },
];

export function Automations() {
  const ref = useRef<HTMLElement>(null);
  useBackdropOnView(ref, "services");
  const { enabled } = useMotionPreference();
  const [active, setActive] = useState(0);
  const group = GROUPS[active] ?? GROUPS[0];

  return (
    <section ref={ref} id="servicos" aria-labelledby="servicos-title" className="pb-20 sm:pb-28">
      <Container>
        <div className="max-w-[44rem]">
          <SectionLabel index="02">O que automatizamos</SectionLabel>
          <RevealWords
            id="servicos-title"
            text="Começamos pelo que lhe tira mais tempo."
            className="mt-3 text-[36px] leading-[1.06] font-medium tracking-[-0.032em] sm:text-[52px]"
          />
          <p className="mt-4 max-w-[34rem] text-[17px] leading-[1.6] text-ink-2">
            Cada automação é uma regra simples: quando acontece isto, faz aquilo. Escolha uma área.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-10">
          <Reveal>
            <div
              role="tablist"
              aria-label="Áreas"
              className="-mx-6 flex gap-1.5 overflow-x-auto px-6 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-col lg:gap-1"
            >
              {GROUPS.map((g, i) => {
                const selected = i === active;
                return (
                  <button
                    key={g.title}
                    type="button"
                    role="tab"
                    id={`area-tab-${i}`}
                    aria-selected={selected}
                    aria-controls="area-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      const last = GROUPS.length - 1;
                      const next = {
                        ArrowDown: i === last ? 0 : i + 1,
                        ArrowRight: i === last ? 0 : i + 1,
                        ArrowUp: i === 0 ? last : i - 1,
                        ArrowLeft: i === 0 ? last : i - 1,
                        Home: 0,
                        End: last,
                      }[e.key];
                      if (next === undefined) return;
                      e.preventDefault();
                      setActive(next);
                      document.getElementById(`area-tab-${next}`)?.focus();
                    }}
                    className={cn(
                      "group relative shrink-0 rounded-[20px] px-4 py-3 text-left transition-colors duration-300 lg:px-5 lg:py-4",
                      selected ? "text-ink" : "text-ink-2 hover:text-ink",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="area-thumb"
                        className="glass absolute inset-0 rounded-[20px]"
                        transition={enabled ? spring : instant}
                      />
                    )}
                    <span className="relative flex items-baseline justify-between gap-6">
                      <span className="text-[16px] font-medium tracking-[-0.015em] lg:text-[19px]">
                        {g.title}
                      </span>
                      <span className="hidden text-[13px] text-mute tabular-nums lg:inline">
                        0{i + 1}
                      </span>
                    </span>
                    <span className="relative hidden text-[13.5px] text-mute lg:block">
                      {g.blurb}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal>
            <div
              id="area-panel"
              role="tabpanel"
              aria-labelledby={`area-tab-${active}`}
              // biome-ignore lint/a11y/noNoninteractiveTabindex: APG tabs; the panel has no focusable content.
              tabIndex={0}
              className="relative rounded-[24px]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.ul key={group?.title} className="flex flex-col gap-3">
                  {group?.rules.map((r, i) => (
                    <motion.li
                      key={r.when}
                      initial={enabled ? { opacity: 0, y: 14, filter: "blur(4px)" } : false}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={
                        enabled ? { opacity: 0, y: -8, transition: { duration: 0.15 } } : undefined
                      }
                      transition={enabled ? { ...spring, delay: i * 0.06 } : instant}
                    >
                      <RuleCard rule={r} />
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** "When this → do that" card with a light that follows the pointer. */
function RuleCard({ rule }: { rule: Rule }) {
  const ref = useRef<HTMLDivElement>(null);
  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  const When = rule.whenIcon;
  const Action = rule.actionIcon;
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className="group relative grid items-center gap-3 overflow-hidden rounded-[24px] bg-white/55 p-4 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_1px_2px_rgb(15_16_18/0.04)] ring-1 ring-white/70 transition-[background-color,box-shadow,transform] duration-300 ease-out-soft hover:-translate-y-0.5 hover:bg-white/75 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_18px_40px_-20px_rgb(15_16_18/0.3)] sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-4 sm:p-5"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgb(255 255 255 / 0.9), transparent 60%)",
        }}
      />
      <span className="relative flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-canvas text-ink-2 ring-1 ring-hair">
          <When className="size-[18px]" strokeWidth={1.8} />
        </span>
        <span>
          <span className="block text-[12px] text-mute">Quando</span>
          <span className="block text-[15px] font-medium tracking-[-0.01em]">{rule.when}</span>
        </span>
      </span>
      <span
        aria-hidden
        className="relative hidden h-px w-12 overflow-hidden bg-ink/15 sm:block lg:w-16"
      >
        <span className="absolute inset-y-0 left-0 w-1/2 animate-flow bg-gradient-to-r from-transparent via-ink/70 to-transparent" />
      </span>
      <span className="relative flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-white">
          <Action className="size-[18px]" strokeWidth={1.8} />
        </span>
        <span>
          <span className="block text-[12px] text-mute">Faz</span>
          <span className="block text-[15px] font-medium tracking-[-0.01em]">{rule.action}</span>
        </span>
      </span>
    </div>
  );
}
