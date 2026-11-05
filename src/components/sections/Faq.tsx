import { Plus } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { contactHref, euros, plans } from "@/lib/site";

const app = plans.find((p) => p.id === "aplicacao");
const auto = plans.find((p) => p.id === "automacao");

export const FAQS = [
  {
    q: "Quanto custa uma aplicação à medida?",
    a: `Depende do que precisa. Uma aplicação que modernize um processo da sua empresa custa desde ${euros(app?.setup ?? 0)}, mais desde ${euros(app?.monthly ?? 0)} por mês de manutenção (valores sem IVA). Uma automação simples custa desde ${euros(auto?.setup ?? 0)}. Cada projeto é feito à medida, por isso o valor final depende do que precisa e vem por escrito, na proposta, antes de começarmos.`,
  },
  {
    q: "Quanto tempo demora?",
    a: "Uma aplicação para um processo costuma ficar pronta em 2 a 4 semanas. Plataformas com vários módulos e ligações a outros programas levam 6 a 12 semanas. O prazo vem por escrito na proposta e acompanha o progresso em entregas semanais.",
  },
  {
    q: "Tenho de pagar para ver a demonstração?",
    a: "Não. A conversa inicial e a demonstração são feitas antes de qualquer compromisso. É um protótipo com os seus próprios dados, para ver como a aplicação ficaria. A aplicação completa só é construída depois de aprovar a proposta.",
  },
  {
    q: "Tenho de mudar tudo de um dia para o outro?",
    a: "Não. Passamos os seus dados para a aplicação e conferimos tudo consigo. A equipa pode trabalhar nos dois sistemas durante o tempo que combinarmos. Só deixa o que usa hoje quando se sentir seguro.",
  },
  {
    q: "Preciso de uma equipa de informática?",
    a: "Não. Tratamos do alojamento, das cópias de segurança e das atualizações. A sua equipa só tem de usar a aplicação, que funciona no navegador.",
  },
  {
    q: "O meu software atual está ultrapassado. Pode ser renovado?",
    a: "Pode. Reconstruímos o programa que usa hoje, mantendo os seus dados e o que funciona bem, numa aplicação mais rápida que funciona no navegador e no telemóvel.",
  },
  {
    q: "Fazem também sites e lojas online?",
    a: "Sim, quando fazem parte do que a sua empresa precisa. Um site feito à medida pode receber pedidos, marcações e encomendas, e esses pedidos entram diretamente na aplicação.",
  },
  {
    q: "De quem são os dados e o software?",
    a: "Os dados são sempre seus e pode exportá-los a qualquer momento. As condições do software, incluindo o que acontece se deixarmos de trabalhar juntos, ficam definidas por escrito na proposta.",
  },
  {
    q: "E se já uso o PHC, o Primavera ou o Moloni?",
    a: "A aplicação pode ligar-se a eles. Cada ligação é avaliada caso a caso, porque depende do que o programa permite. Quando é complicada, propomos deixá-la para uma segunda fase.",
  },
  {
    q: "O que acontece depois de a aplicação estar em uso?",
    a: "A mensalidade cobre o alojamento, as cópias de segurança, a manutenção, o suporte e um número de horas por mês para alterações. Se um programa externo mudar ou falhar, somos nós a corrigir.",
  },
  {
    q: "Funciona no telemóvel?",
    a: "Sim. Funciona no computador, no tablet e no telemóvel, a partir do navegador, e pode ser instalada no ecrã inicial.",
  },
  {
    q: "Os meus dados estão seguros?",
    a: "Cada pessoa vê apenas o que o seu perfil permite. Os dados ficam alojados na União Europeia, com cópias de segurança, e seguimos as boas práticas do RGPD. Explicamos por escrito o que a aplicação guarda e a que dados acede.",
  },
  {
    q: "Utilizam inteligência artificial?",
    a: "Quando ajuda de facto: ler documentos, perceber mensagens ou redigir respostas. Nos restantes casos usamos regras simples e previsíveis. As decisões importantes podem ficar sempre dependentes da sua aprovação.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-x-clip py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          kicker="Perguntas frequentes"
          id="faq-title"
          title={<>As dúvidas de quem está a pensar começar.</>}
        >
          Respostas diretas às perguntas mais comuns. Se a sua não estiver aqui, escreva-nos.
        </SectionHead>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
          <div className="order-last lg:order-none lg:sticky lg:top-28 lg:self-start">
            <div data-reveal className="bg-fg p-7 text-onfg">
              <p className="font-display text-[24px] leading-[1.15] tracking-[-0.025em]">
                Tem outra questão?
              </p>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-onfg/70">
                Escreva-nos e responderemos com brevidade.
              </p>
              <LinkButton href={contactHref("Questão")} variant="light" size="md" className="mt-6">
                Enviar questão
              </LinkButton>
            </div>
          </div>

          <div data-reveal className="flex flex-col">
            {FAQS.map((f, i) => (
              <details key={f.q} name="faq" open={i === 0} className="faq-item group relative">
                <span aria-hidden className="rule-x absolute inset-x-0 top-0" />
                <summary className="flex list-none items-center gap-4 py-5 text-[17px] tracking-[-0.015em] transition-colors duration-300 hover:text-accent-hi sm:gap-5 sm:py-6 sm:text-[19px] [&::-webkit-details-marker]:hidden">
                  <span className="flex-1">{f.q}</span>
                  <span className="grid size-9 shrink-0 place-items-center bg-chip text-fg transition-[background-color,color] duration-200 group-open:bg-fg group-open:text-onfg">
                    <Plus
                      className="size-4 transition-transform duration-250 ease-out-soft group-open:rotate-45"
                      strokeWidth={1.6}
                    />
                  </span>
                </summary>
                <p className="max-w-[44rem] pb-7 text-[16px] leading-[1.65] text-fg-2">{f.a}</p>
              </details>
            ))}
            <div aria-hidden className="rule-x" />
          </div>
        </div>
      </Container>
    </section>
  );
}
