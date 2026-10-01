import { BellOff, Clock, Plug, ShieldCheck } from "lucide-react";
import { type Brand, BrandIcon } from "@/components/brand/BrandIcon";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

/* Benefits stated from what the service actually does (see FAQ and process). No metrics. */
const BENEFITS = [
  {
    icon: Clock,
    title: "Resposta imediata, 24 horas por dia",
    text: "Clientes atendidos fora do horário, ao fim de semana e em períodos de maior volume.",
    span: "lg:col-span-2",
    visual: "clock",
  },
  {
    icon: BellOff,
    title: "Nenhum processo fica pendente",
    text: "Seguimentos, lembretes e cobranças executados no momento certo, de forma consistente.",
    span: "",
    visual: "queue",
  },
  {
    icon: Plug,
    title: "Integração com os sistemas atuais",
    text: "WhatsApp, email, agenda e faturação, sem migrações nem mudanças na rotina da equipa.",
    span: "",
    visual: "tools",
  },
  {
    icon: ShieldCheck,
    title: "Controlo total sobre as decisões",
    text: "As operações críticas podem exigir sempre a sua aprovação antes de serem executadas.",
    span: "lg:col-span-2",
    visual: "approve",
  },
] as const;

export function Benefits() {
  return (
    <section aria-labelledby="beneficios-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHead
          index="03"
          kicker="Benefícios"
          id="beneficios-title"
          title="Mais capacidade, sem aumentar a equipa."
        >
          O impacto no dia a dia quando os processos repetitivos deixam de depender de intervenção
          manual.
        </SectionHead>
        <ul className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <li key={b.title} data-reveal style={{ ["--i" as string]: i % 3 }} className={b.span}>
                <div data-spot className="surface group flex h-full flex-col overflow-hidden p-7">
                  <span className="spot-glow" />
                  <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/25 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-6 text-[21px] leading-snug font-semibold tracking-[-0.02em] [font-stretch:106%]">
                    {b.title}
                  </h3>
                  <p className="mt-2 max-w-[30rem] text-[15.5px] leading-[1.6] text-fg-2">
                    {b.text}
                  </p>
                  {b.visual === "clock" && <Hours />}
                  {b.visual === "approve" && <Approve />}
                  {b.visual === "queue" && <Queue />}
                  {b.visual === "tools" && <Tools />}
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/* Replies across the whole day: an illustrative timeline, not data. */
function Hours() {
  const marks = ["08h", "12h", "16h", "20h", "23h"];
  return (
    <div aria-hidden className="mt-8">
      <div className="relative h-14 rounded-xl bg-white/[0.03] shadow-[inset_0_0_0_1px_var(--color-hair)]">
        {[6, 19, 33, 47, 58, 71, 84, 93].map((x, i) => (
          <span
            key={x}
            className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgb(61_224_160/0.7)] transition-transform duration-500 group-hover:scale-125"
            style={{ left: `${x}%`, transitionDelay: `${i * 40}ms` }}
          />
        ))}
        <span className="absolute inset-x-4 top-1/2 h-px bg-white/10" />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10.5px] text-fg-3">
        {marks.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function Approve() {
  return (
    <div
      aria-hidden
      className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-white/[0.04] p-4 shadow-[inset_0_0_0_1px_var(--color-hair)]"
    >
      <div className="min-w-0">
        <p className="font-mono text-[10.5px] text-fg-3 uppercase">Orçamento Nº 0412 · 185,00 €</p>
        <p className="truncate text-[14.5px]">Enviar ao cliente?</p>
      </div>
      <span className="flex gap-2">
        <span className="rounded-full px-3.5 py-1.5 text-[13px] text-fg-2 shadow-[inset_0_0_0_1px_var(--color-hair-2)]">
          Rever
        </span>
        <span className="rounded-full bg-accent px-3.5 py-1.5 text-[13px] font-semibold text-accent-ink transition-transform duration-300 group-hover:scale-105">
          Aprovar
        </span>
      </span>
    </div>
  );
}

/* Scheduled follow-ups, each with its moment: illustrative. */
function Queue() {
  const items = [
    ["Lembrete de marcação", "amanhã · 09:00"],
    ["Seguimento de orçamento", "em 3 dias"],
    ["Aviso de pagamento", "dia 30"],
  ];
  return (
    <ul aria-hidden className="mt-auto flex flex-col gap-2 pt-8">
      {items.map(([label, when], i) => (
        <li
          key={label}
          className="flex items-center gap-3 rounded-xl bg-white/[0.035] px-3.5 py-2.5 text-[13.5px] shadow-[inset_0_0_0_1px_var(--color-hair)] transition-transform duration-500 ease-out-soft group-hover:translate-x-1"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <span className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
          <span className="truncate">{label}</span>
          <span className="ml-auto shrink-0 font-mono text-[10.5px] text-fg-3">{when}</span>
        </li>
      ))}
    </ul>
  );
}

function Tools() {
  const tools: Brand[] = ["whatsapp", "gmail", "googleCalendar", "excel", "outlook", "stripe"];
  return (
    <div aria-hidden className="mt-auto flex flex-wrap gap-2 pt-8">
      {tools.map((t, i) => (
        <span
          key={t}
          className="grid size-10 place-items-center rounded-[12px] bg-white shadow-[0_8px_20px_-10px_rgb(0_0_0/0.8)] transition-transform duration-500 ease-out-soft group-hover:-translate-y-1"
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          <BrandIcon brand={t} className="size-5" />
        </span>
      ))}
    </div>
  );
}
