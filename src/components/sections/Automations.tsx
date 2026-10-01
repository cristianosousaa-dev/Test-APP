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
import { useRef, useState } from "react";
import { RevealWords } from "@/components/flow/RevealWords";
import { SectionLabel } from "@/components/flow/SectionLabel";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/Tilt";
import { Check } from "@/components/visual/Bits";
import { useBackdropOnView } from "@/lib/backdrop";
import { cn } from "@/lib/cn";
import { instant, spring } from "@/lib/motion";
import { useMotionPreference } from "@/lib/motion-preference";
import { useLoop } from "@/lib/useLoop";

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
  const panel = useRef<HTMLDivElement>(null);
  // Three rules × three beats (trigger → flow → done), looping while in view.
  const { step } = useLoop(panel, RUN);
  const running = Math.floor(step / 3);
  const beat = step % 3;

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
            Cada automação é uma regra: quando acontece algo, faz uma tarefa por si. Veja as regras
            a correr e escolha uma área.
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
                        className="glass glass-panel absolute inset-0 rounded-[20px]"
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
              ref={panel}
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
                      <RuleCard
                        rule={r}
                        phase={
                          !enabled || i < running
                            ? "done"
                            : i > running
                              ? "idle"
                              : ((["trigger", "flow", "done"] as const)[beat] ?? "done")
                        }
                        current={enabled && i === running}
                      />
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

type Phase = "idle" | "trigger" | "flow" | "done";
const RUN = [700, 800, 1300, 700, 800, 1300, 700, 800, 1600];

/**
 * "When this → do that", played out: the trigger lights up, a signal travels along the wire,
 * the action completes with a tick. The cards run one after the other.
 */
function RuleCard({ rule, phase, current }: { rule: Rule; phase: Phase; current: boolean }) {
  const When = rule.whenIcon;
  const Action = rule.actionIcon;
  const lit = phase !== "idle";
  const done = phase === "done";
  return (
    <TiltCard max={3}>
      <div
        className={cn(
          "glass glass-panel grid items-center gap-3 rounded-[24px] p-4 transition-[opacity,box-shadow] duration-500 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-4 sm:p-5",
          !lit && "opacity-80",
          current && "ring-1 ring-ink/10",
        )}
      >
        <span className="relative flex items-center gap-3">
          <span className="relative grid size-11 shrink-0 place-items-center">
            {phase === "trigger" && (
              <motion.span
                className="absolute inset-0 rounded-full bg-sky-ink/25"
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <span
              className={cn(
                "relative grid size-11 place-items-center rounded-full ring-1 transition-colors duration-300",
                lit ? "bg-sky text-sky-ink ring-sky-ink/20" : "bg-white/70 text-ink-2 ring-hair",
              )}
            >
              <When className="size-[18px]" strokeWidth={1.8} />
            </span>
          </span>
          <span>
            <span className="block text-[12px] text-mute">Quando</span>
            <span className="block text-[15px] font-medium tracking-[-0.01em]">{rule.when}</span>
          </span>
        </span>

        <span aria-hidden className="relative hidden h-px w-14 bg-ink/12 sm:block lg:w-20">
          <span
            className={cn(
              "absolute inset-0 origin-left bg-ink transition-transform ease-out-soft",
              phase === "flow"
                ? "scale-x-100 duration-700"
                : done
                  ? "scale-x-100 duration-0"
                  : "scale-x-0 duration-300",
            )}
          />
          {phase === "flow" && (
            <motion.span
              className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-ink shadow-[0_0_0_4px_rgb(15_16_18/0.12)]"
              initial={{ left: "0%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 0.7, ease: [0.45, 0, 0.55, 1] }}
            />
          )}
        </span>

        <span className="relative flex items-center gap-3">
          <span className="relative grid size-11 shrink-0 place-items-center">
            <span
              className={cn(
                "grid size-11 place-items-center rounded-full text-white transition-colors duration-300",
                done ? "bg-go" : "bg-ink",
              )}
            >
              <Action className="size-[18px]" strokeWidth={1.8} />
            </span>
            <AnimatePresence>
              {done && (
                <motion.span
                  key="tick"
                  className="absolute -top-1 -right-1 grid size-[18px] place-items-center rounded-full bg-white text-go shadow-sm ring-1 ring-go/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", duration: 0.45, bounce: 0.45 }}
                >
                  <Check className="size-2.5" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <span>
            <span className="flex items-center gap-1.5 text-[12px] text-mute">
              Faz
              <AnimatePresence>
                {done && current && (
                  <motion.span
                    key="now"
                    className="text-go"
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    · feito agora
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className="block text-[15px] font-medium tracking-[-0.01em]">{rule.action}</span>
          </span>
        </span>
      </div>
    </TiltCard>
  );
}
