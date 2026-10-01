import { ThemeZone } from "@/components/backdrop/ThemeZone";
import { RevealWords } from "@/components/flow/RevealWords";
import { SectionLabel } from "@/components/flow/SectionLabel";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contactHref } from "@/lib/site";

const FAQS = [
  {
    q: "Que tipo de negócios podem automatizar?",
    a: "Clínicas, oficinas, imobiliárias, restaurantes, lojas online, escritórios e serviços. Se uma tarefa se repete e segue regras, provavelmente pode ser automatizada.",
  },
  {
    q: "Tenho de mudar de software?",
    a: "Não. Ligamos as automações ao que já usa: WhatsApp, email, agenda, faturação, CRM ou folhas de cálculo. A sua equipa continua a trabalhar como está habituada.",
  },
  {
    q: "Quanto custa?",
    a: "Depende do que for automatizado. Depois da conversa inicial recebe uma proposta com preço fechado, para saber exatamente o que paga antes de começarmos.",
  },
  {
    q: "Quanto tempo demora?",
    a: "Depende da complexidade. O prazo fica escrito na proposta, antes de começarmos.",
  },
  {
    q: "Usam inteligência artificial?",
    a: "Quando ajuda: perceber mensagens, ler documentos ou redigir respostas. Para o resto usamos regras simples e previsíveis. As decisões importantes podem ficar sempre sujeitas à sua aprovação.",
  },
  {
    q: "Os meus dados ficam seguros?",
    a: "Usamos apenas os acessos necessários a cada automação, seguimos as boas práticas do RGPD e documentamos o que cada automação faz e a que dados acede.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-20 sm:pb-28">
      <ThemeZone theme="faq">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
          <Reveal>
            <SectionLabel index="04">Perguntas</SectionLabel>
            <RevealWords
              id="faq-title"
              text="Antes de falarmos."
              className="mt-3 text-[36px] leading-[1.06] font-medium tracking-[-0.032em] sm:text-[52px]"
            />
            <p className="mt-4 max-w-[24rem] text-[17px] leading-[1.6] text-ink-2">
              As dúvidas que nos chegam mais vezes, respondidas sem rodeios.
            </p>
            <div className="glass glass-panel mt-8 hidden max-w-[22rem] rounded-[22px] p-5 lg:block">
              <p className="text-[15px] font-medium">A sua pergunta não está aqui?</p>
              <p className="mt-1 text-[14px] text-ink-2">Escreva-nos. Respondemos por email.</p>
              <LinkButton href={contactHref()} size="sm" className="mt-4" arrow>
                Enviar uma pergunta
              </LinkButton>
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-col gap-2">
              {FAQS.map((f, i) => (
                <details
                  key={f.q}
                  name="faq"
                  open={i === 0}
                  className="faq-item glass glass-panel group rounded-[22px] transition-[box-shadow,transform] duration-300 ease-out-soft hover:-translate-y-0.5"
                >
                  <summary className="flex list-none items-center justify-between gap-6 px-5 py-5 text-[17px] font-medium tracking-[-0.01em] sm:px-6 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg
                      viewBox="0 0 16 16"
                      className="size-8 shrink-0 rounded-full bg-white/70 p-2 text-ink-2 ring-1 ring-hair transition-[transform,background-color,color] duration-300 ease-out-soft group-hover:text-ink group-open:rotate-45 group-open:bg-ink group-open:text-white motion-reduce:transition-none"
                      aria-hidden
                    >
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </summary>
                  <p className="max-w-[40rem] px-5 pb-6 text-[16px] leading-[1.65] text-ink-2 sm:px-6">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </Container>
      </ThemeZone>
    </section>
  );
}
