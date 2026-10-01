import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

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
    <section id="faq" className="py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
        <Reveal>
          <p className="text-[14px] text-mute">Perguntas</p>
          <h2 className="mt-3 text-[34px] leading-[1.1] font-medium tracking-[-0.028em] sm:text-[44px]">
            Antes de falarmos.
          </h2>
        </Reveal>
        <Reveal>
          <div className="border-t border-hair">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                name="faq"
                open={i === 0}
                className="faq-item group border-b border-hair"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg
                    viewBox="0 0 16 16"
                    className="size-4 shrink-0 text-mute transition-transform duration-300 ease-out-soft group-open:rotate-45 motion-reduce:transition-none"
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
                <p className="max-w-[40rem] pb-6 text-[16px] leading-[1.65] text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
