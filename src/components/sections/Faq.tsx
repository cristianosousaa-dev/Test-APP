import { Plus } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
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
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead index="08" kicker="Perguntas" id="faq-title" title="Antes de falarmos.">
            As dúvidas que nos chegam mais vezes, respondidas sem rodeios.
          </SectionHead>
          <div data-reveal className="surface mt-9 max-w-[24rem] p-6">
            <span className="mb-4 flex -space-x-2">
              {(["whatsapp", "gmail", "outlook"] as const).map((b) => (
                <span
                  key={b}
                  className="grid size-9 place-items-center rounded-full bg-white shadow-[0_0_0_2px_var(--color-base-2)]"
                >
                  <BrandIcon brand={b} className="size-[18px]" />
                </span>
              ))}
            </span>
            <p className="text-[16px] font-semibold">A sua pergunta não está aqui?</p>
            <p className="mt-1 text-[14.5px] text-fg-2">Escreva-nos. Respondemos por email.</p>
            <LinkButton
              href={contactHref("Pergunta")}
              variant="glass"
              size="sm"
              className="mt-5"
              arrow
            >
              Enviar uma pergunta
            </LinkButton>
          </div>
        </div>
        <div data-reveal className="flex flex-col gap-2.5">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              name="faq"
              open={i === 0}
              className="faq-item surface group transition-[box-shadow,background-color] duration-300 open:bg-white/[0.045] open:shadow-[inset_0_0_0_1px_rgb(61_224_160/0.35)] hover:bg-white/[0.04]"
            >
              <summary className="flex list-none items-center justify-between gap-6 rounded-[24px] px-6 py-5 text-[17px] font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/[0.06] text-fg-2 shadow-[inset_0_0_0_1px_var(--color-hair-2)] transition-[transform,background-color,color] duration-300 ease-out-soft group-open:rotate-45 group-open:bg-accent group-open:text-accent-ink group-hover:text-fg">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="max-w-[40rem] px-6 pb-6 text-[16px] leading-[1.65] text-fg-2">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
