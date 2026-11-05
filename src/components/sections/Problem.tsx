import { Estimator } from "@/components/sections/Estimator";
import { Container } from "@/components/ui/Container";
import { ScrollWords } from "@/components/ui/ScrollWords";
import { SectionHead } from "@/components/ui/SectionHead";
import { delay } from "@/lib/delay";

const SIGNS = [
  {
    sign: "Só uma pessoa sabe como as coisas funcionam.",
    cost: "Se essa pessoa sai ou está de férias, o trabalho para.",
    tag: "Dependência",
  },
  {
    sign: "A mesma informação é escrita mais do que uma vez.",
    cost: "Num caderno, numa folha, no telemóvel e no programa. Cada cópia é uma oportunidade de erro.",
    tag: "Erros",
  },
  {
    sign: "Os pedidos chegam por WhatsApp, email e telefone.",
    cost: "Ninguém sabe ao certo o que está por responder, por produzir ou por entregar.",
    tag: "Pedidos perdidos",
  },
  {
    sign: "O programa que utiliza já está ultrapassado.",
    cost: "É lento, não se liga a mais nada, e o que ele não permite acaba feito à mão.",
    tag: "Software antigo",
  },
  {
    sign: "Cada pessoa trabalha à sua maneira.",
    cost: "Sem um processo claro, ninguém sabe em que ponto está cada tarefa, e o tempo perde-se em confirmações.",
    tag: "Processos sem lógica",
  },
  {
    sign: "Fechar o mês demora dias.",
    cost: "Conferir, copiar e corrigir ocupa a equipa em vez de servir os clientes.",
    tag: "Tempo",
  },
] as const;

/* The reader's own situation, in their words, then what it costs them in hours. */
export function Problem() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-title"
      className="relative overflow-x-clip py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          kicker="Onde se perde tempo"
          id="problema-title"
          title={<>Onde a sua empresa perde horas.</>}
        >
          Quando o negócio cresce mais depressa do que as ferramentas e os processos que o
          sustentam, o problema não é a equipa. É a forma como o trabalho está montado.
        </SectionHead>

        <ul className="mt-12 sm:mt-16">
          {SIGNS.map((s, i) => (
            <li
              key={s.sign}
              data-reveal
              style={delay(i * 60)}
              className="grid grid-cols-1 gap-3 border-t border-hair-2 py-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] lg:items-baseline lg:gap-8"
            >
              <p className="kicker order-last lg:order-first">{s.tag}</p>
              <p className="font-display text-[clamp(22px,2.4vw,32px)] leading-[1.15] tracking-[-0.025em]">
                <ScrollWords text={s.sign} />
              </p>
              <p className="max-w-[28rem] text-[15.5px] leading-[1.6] text-fg-2 lg:justify-self-end">
                {s.cost}
              </p>
            </li>
          ))}
          <li aria-hidden className="rule-x" />
        </ul>

        <div className="mt-20 sm:mt-28">
          <p className="kicker">Quanto custa continuar assim</p>
          <h3
            data-reveal="mask"
            className="h2 mt-5 max-w-[38rem] text-[clamp(30px,3.6vw,48px)] text-fg"
          >
            Faça as contas com os seus números.
          </h3>
          <div className="mt-10">
            <Estimator />
          </div>
        </div>
      </Container>
    </section>
  );
}
