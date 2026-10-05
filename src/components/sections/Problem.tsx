import { CalendarClock, FileClock, MessageSquareMore, Wallet } from "lucide-react";
import { Estimator } from "@/components/sections/Estimator";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

const PAINS = [
  {
    icon: MessageSquareMore,
    title: "As mesmas perguntas",
    text: "Horários, preços e disponibilidade respondidos um a um, todos os dias.",
  },
  {
    icon: CalendarClock,
    title: "Agenda feita à mão",
    text: "Chamadas, mensagens e reagendamentos que interrompem o trabalho.",
  },
  {
    icon: FileClock,
    title: "Orçamentos que esperam",
    text: "Pedidos que chegam durante o dia e só têm resposta horas depois.",
  },
  {
    icon: Wallet,
    title: "Cobranças por fazer",
    text: "Faturas vencidas acompanhadas por telefone e pagamentos confirmados no extrato.",
  },
];

export function Problem() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-title"
      className="relative overflow-x-clip py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          kicker="O desafio"
          id="problema-title"
          title={<>O trabalho administrativo ocupa o tempo que devia ser dos seus clientes.</>}
        >
          Pequenas tarefas, repetidas dezenas de vezes por dia, somam horas no fim do mês. Raramente
          alguém as contabiliza.
        </SectionHead>

        {/* An editorial list, not cards: a hairline above each pain, the words carry it. */}
        <ul className="mt-12 grid gap-x-8 gap-y-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {PAINS.map((p, i) => {
            const Icon = p.icon;
            return (
              <li
                key={p.title}
                data-reveal
                style={{ ["--i" as string]: i }}
                className="border-t border-hair-2 pt-5"
              >
                <Icon aria-hidden className="size-5 text-accent" strokeWidth={1.6} />
                <h3 className="mt-4 font-display text-[20px] tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-fg-2">{p.text}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 sm:mt-20">
          <Estimator />
        </div>
      </Container>
    </section>
  );
}
