import { CalendarClock, FileClock, MessageSquareMore, Wallet } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

const PAINS = [
  {
    icon: MessageSquareMore,
    title: "As mesmas perguntas, todos os dias",
    text: "Horários, preços, disponibilidade. Respostas que alguém tem de escrever, outra vez.",
  },
  {
    icon: CalendarClock,
    title: "Marcações feitas à mão",
    text: "Chamadas, mensagens e trocas de horário que interrompem o trabalho que importa.",
  },
  {
    icon: FileClock,
    title: "Orçamentos que ficam para depois",
    text: "Pedidos que chegam a meio do dia e só têm resposta à noite. Ou nunca.",
  },
  {
    icon: Wallet,
    title: "Faturas por cobrar",
    text: "Lembretes, telefonemas incómodos e contas que não batem certo no fim do mês.",
  },
];

/* What piles up when nobody automates it: a visual, not a statistic. */
const PILE = [
  "Têm vaga amanhã?",
  "Pode enviar o orçamento?",
  "Qual é o preço?",
  "Fatura FT 1182 em atraso",
  "Posso mudar para as 17h?",
  "Já recebeu o pagamento?",
];

export function Problem() {
  return (
    <section aria-labelledby="problema-title" className="relative overflow-x-clip py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
        <div>
          <SectionHead
            index="01"
            kicker="O problema"
            id="problema-title"
            title="O seu dia está cheio de trabalho que não precisava de si."
          >
            Pequenas tarefas repetidas, todos os dias. Sozinhas parecem pouco. Juntas, roubam as
            horas que devia dedicar aos clientes e ao negócio.
          </SectionHead>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {PAINS.map((p, i) => {
              const Icon = p.icon;
              return (
                <li key={p.title} data-reveal style={{ ["--i" as string]: i }}>
                  <div className="surface h-full p-5">
                    <Icon className="size-5 text-fg-3" strokeWidth={1.8} />
                    <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.01em]">{p.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-[1.6] text-fg-2">{p.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* The pile: unanswered requests stacking up, drifting slightly with the scroll. */}
        <div aria-hidden className="relative mx-auto h-[420px] w-full max-w-[440px]">
          <div className="absolute inset-8 rounded-full bg-[radial-gradient(closest-side,rgb(242_179_61/0.12),transparent)]" />
          {PILE.map((t, i) => (
            <div
              key={t}
              data-parallax
              className="absolute inset-x-0 flex justify-center"
              style={{
                top: `${4 + i * 15.5}%`,
                ["--depth" as string]: `${10 + i * 5}px`,
              }}
            >
              <div
                className="surface flex w-[min(300px,88%)] items-center gap-3 rounded-[16px] px-4 py-3 text-[14px]"
                style={{
                  transform: `translateX(${(i % 2 ? 1 : -1) * (8 + i * 2)}px) rotate(${(i % 2 ? 1 : -1) * (1 + i * 0.3)}deg)`,
                }}
              >
                <span className="size-2 shrink-0 rounded-full bg-amber" />
                <span className="truncate text-fg-2">{t}</span>
                <span className="ml-auto shrink-0 font-mono text-[10px] whitespace-nowrap text-fg-3">
                  por fazer
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
