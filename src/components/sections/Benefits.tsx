import { type Brand, BrandIcon } from "@/components/brand/BrandIcon";
import { Container } from "@/components/ui/Container";
import { IsoArt, type IsoKind } from "@/components/ui/IsoArt";
import { SectionHead } from "@/components/ui/SectionHead";

/* Benefits stated from what the service actually does (see FAQ and methodology). No metrics. */
const BENEFITS: {
  title: string;
  text: string;
  span: string;
  art: IsoKind;
  visual: "hours" | "queue" | "tools" | "approve";
}[] = [
  {
    title: "Resposta imediata, 24 horas por dia",
    text: "Clientes atendidos fora do horário, ao fim de semana e em períodos de maior volume.",
    span: "lg:col-span-2",
    art: "clock",
    visual: "hours",
  },
  {
    title: "Nenhum processo fica pendente",
    text: "Seguimentos, lembretes e cobranças executados no momento certo, de forma consistente.",
    span: "",
    art: "calendar",
    visual: "queue",
  },
  {
    title: "Integração com os sistemas atuais",
    text: "WhatsApp, email, agenda e faturação, sem migrações nem mudanças na rotina da equipa.",
    span: "",
    art: "nodes",
    visual: "tools",
  },
  {
    title: "Controlo total sobre as decisões",
    text: "As operações críticas podem exigir sempre a sua aprovação antes de serem executadas.",
    span: "lg:col-span-2",
    art: "shield",
    visual: "approve",
  },
];

export function Benefits() {
  return (
    <section aria-labelledby="beneficios-title" className="relative overflow-x-clip py-20 sm:py-28">
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
        <ul className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <li
              key={b.title}
              data-reveal={i % 2 ? "right" : "left"}
              style={{ ["--i" as string]: i % 2 }}
              className={b.span}
            >
              <div data-frame className="tile group flex h-full min-h-[300px] flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-6">
                  <span className="badge">0{i + 1}</span>
                  <IsoArt
                    kind={b.art}
                    className="h-[92px] w-[132px] shrink-0 transition-transform duration-700 ease-out-soft group-hover:-translate-y-1"
                  />
                </div>
                <h3 className="mt-4 max-w-[26rem] text-[22px] leading-snug tracking-[-0.02em]">
                  {b.title}
                </h3>
                <p className="mt-2 max-w-[30rem] text-[15px] leading-[1.6] text-fg-2">{b.text}</p>
                {b.visual === "hours" && <Hours />}
                {b.visual === "queue" && <Queue />}
                {b.visual === "tools" && <Tools />}
                {b.visual === "approve" && <Approve />}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* Replies across the whole day: an illustrative timeline, not data. */
function Hours() {
  const marks = ["08h", "12h", "16h", "20h", "23h"];
  return (
    <div aria-hidden className="mt-auto pt-8">
      <div className="relative h-12 bg-white/40">
        <span className="rule-x absolute inset-x-3 top-1/2" />
        {[6, 19, 33, 47, 58, 71, 84, 93].map((x, i) => (
          <span
            key={x}
            className="absolute top-1/2 size-2.5 -translate-y-1/2 bg-accent transition-transform duration-500 ease-out-soft group-hover:-translate-y-[140%]"
            style={{ left: `${x}%`, transitionDelay: `${i * 40}ms` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10.5px] text-fg-3">
        {marks.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
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
    <ul aria-hidden className="mt-auto flex flex-col gap-[2px] pt-8">
      {items.map(([label, when], i) => (
        <li
          key={label}
          className="flex items-center gap-3 bg-white/50 px-3.5 py-2.5 text-[13.5px] transition-transform duration-500 ease-out-soft group-hover:translate-x-1.5"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <span className="size-1.5 shrink-0 bg-accent" />
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
    <div aria-hidden className="mt-auto flex flex-wrap gap-[2px] pt-8">
      {tools.map((t, i) => (
        <span
          key={t}
          className="grid size-10 place-items-center bg-white transition-transform duration-500 ease-out-soft group-hover:-translate-y-1"
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          <BrandIcon brand={t} className="size-5" />
        </span>
      ))}
    </div>
  );
}

function Approve() {
  return (
    <div
      aria-hidden
      className="mt-auto flex items-center justify-between gap-4 bg-white/55 p-4 sm:mt-8"
    >
      <div className="min-w-0">
        <p className="font-mono text-[10.5px] text-fg-3 uppercase">Orçamento Nº 0412 · 185,00 €</p>
        <p className="truncate text-[14.5px]">Enviar ao cliente?</p>
      </div>
      <span className="label flex gap-[2px] text-[10.5px]">
        <span className="bg-chip px-3.5 py-2">Rever</span>
        <span className="bg-fg px-3.5 py-2 text-white transition-colors duration-300 group-hover:bg-accent">
          Aprovar
        </span>
      </span>
    </div>
  );
}
