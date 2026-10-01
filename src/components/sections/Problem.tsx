import { CalendarClock, FileClock, MessageSquareMore, Wallet } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

const PAINS = [
  {
    icon: MessageSquareMore,
    title: "Pedidos repetitivos",
    text: "Horários, preços e disponibilidade respondidos manualmente, uma e outra vez.",
  },
  {
    icon: CalendarClock,
    title: "Agendamento manual",
    text: "Chamadas, mensagens e reagendamentos que interrompem o trabalho produtivo.",
  },
  {
    icon: FileClock,
    title: "Orçamentos com atraso",
    text: "Pedidos recebidos durante o dia que só obtêm resposta horas depois, ou nunca.",
  },
  {
    icon: Wallet,
    title: "Cobranças pendentes",
    text: "Faturas vencidas acompanhadas por telefone e reconciliações difíceis no fecho do mês.",
  },
];

/* What piles up when nobody automates it: a visual, not a statistic. */
const ROW_A = [
  "Têm vaga amanhã?",
  "Pode enviar o orçamento?",
  "Qual é o preço da revisão?",
  "Fatura FT 1182 em atraso",
  "Posso mudar para as 17h?",
  "Já recebeu o pagamento?",
];
const ROW_B = [
  "Pedido de orçamento · site",
  "Fatura de fornecedor por lançar",
  "Confirmar marcação de sexta",
  "Lembrete de pagamento",
  "Novo contacto do portal",
  "Responder a avaliação",
];

function Chip({ text }: { text: string }) {
  return (
    <li className="tile flex shrink-0 items-center gap-3 px-4 py-3 text-[14.5px] text-fg-2">
      <span className="size-1.5 bg-amber" />
      {text}
      <span className="label ml-3 text-[9.5px] text-fg-3">Pendente</span>
    </li>
  );
}

export function Problem() {
  return (
    <section aria-labelledby="problema-title" className="relative overflow-x-clip py-20 sm:py-28">
      <Container>
        <SectionHead
          index="01"
          kicker="O desafio"
          id="problema-title"
          title="Tarefas administrativas consomem o tempo da sua equipa."
        >
          Pedidos repetidos, marcações, orçamentos e cobranças ocupam diariamente horas que deveriam
          ser dedicadas aos clientes e ao crescimento do negócio.
        </SectionHead>

        <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4">
          {PAINS.map((p, i) => {
            const Icon = p.icon;
            return (
              <li
                key={p.title}
                data-reveal
                style={{ ["--i" as string]: i }}
                className="group relative py-6 sm:px-6 sm:first:pl-0 lg:py-2"
              >
                {i > 0 && (
                  <span
                    aria-hidden
                    className="rule-y absolute top-0 bottom-0 left-0 hidden sm:block"
                  />
                )}
                <span aria-hidden className="rule-x absolute inset-x-0 top-0 sm:hidden" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-fg-3">0{i + 1}</span>
                  <Icon
                    className="size-5 text-fg-3 transition-[color,transform] duration-500 ease-out-soft group-hover:-rotate-6 group-hover:text-accent"
                    strokeWidth={1.4}
                  />
                </div>
                <h3 className="mt-10 text-[19px] tracking-[-0.015em]">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-fg-2">{p.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>

      {/* The backlog: two rows drifting in opposite directions while the section scrolls. */}
      <div aria-hidden className="mt-16 flex flex-col gap-[2px]">
        <ul
          data-drift
          style={{ ["--from" as string]: "4%", ["--to" as string]: "-22%" }}
          className="flex w-max gap-[2px]"
        >
          {[...ROW_A, ...ROW_A].map((t, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: duplicated decorative row.
            <Chip key={i} text={t} />
          ))}
        </ul>
        <ul
          data-drift
          style={{ ["--from" as string]: "-26%", ["--to" as string]: "0%" }}
          className="flex w-max gap-[2px]"
        >
          {[...ROW_B, ...ROW_B].map((t, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: duplicated decorative row.
            <Chip key={i} text={t} />
          ))}
        </ul>
      </div>
    </section>
  );
}
