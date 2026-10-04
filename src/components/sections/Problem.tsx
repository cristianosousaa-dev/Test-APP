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
      className="relative overflow-x-clip py-28 sm:py-40"
    >
      <Container>
        <SectionHead
          index="01"
          kicker="O desafio"
          id="problema-title"
          title={
            <>
              O trabalho administrativo ocupa o tempo que devia ser{" "}
              <span className="text-accent">dos seus clientes.</span>
            </>
          }
        >
          Pequenas tarefas, repetidas dezenas de vezes por dia, somam horas no fim do mês. Raramente
          alguém as contabiliza.
        </SectionHead>

        <ul className="mt-14 grid gap-[2px] sm:grid-cols-2 lg:grid-cols-4">
          {PAINS.map((p, i) => {
            const Icon = p.icon;
            return (
              <li
                key={p.title}
                data-reveal
                data-spot
                style={{ ["--i" as string]: i }}
                className="tile spot group relative flex flex-col overflow-hidden p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center bg-fg text-white transition-colors duration-300 group-hover:bg-accent">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <span className="font-mono text-[11px] text-fg-3">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-[21px] tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-fg-2">{p.text}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-16">
          <Estimator />
        </div>
      </Container>
    </section>
  );
}
