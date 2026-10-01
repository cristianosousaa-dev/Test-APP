import { Plus } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { contactHref } from "@/lib/site";

const FAQS = [
  {
    q: "Que tipo de empresas podem beneficiar?",
    a: "Clínicas, oficinas, imobiliárias, restauração, comércio online, escritórios e prestadores de serviços. Qualquer processo repetitivo e baseado em regras é normalmente passível de automação.",
  },
  {
    q: "É necessário mudar de software?",
    a: "Não. As automações são integradas nos sistemas que já utiliza: WhatsApp, email, agenda, faturação, CRM ou folhas de cálculo. A equipa mantém a sua forma de trabalhar.",
  },
  {
    q: "Qual é o investimento?",
    a: "Depende do âmbito. Após o diagnóstico inicial, recebe uma proposta com preço fixo, para conhecer o investimento exato antes de iniciarmos.",
  },
  {
    q: "Qual é o prazo de implementação?",
    a: "Varia consoante a complexidade. O prazo é definido por escrito na proposta, antes do início do projeto.",
  },
  {
    q: "Utilizam inteligência artificial?",
    a: "Sempre que acrescenta valor: interpretação de mensagens, leitura de documentos ou redação de respostas. Nos restantes casos, utilizamos regras determinísticas e previsíveis. As decisões críticas podem ficar sempre sujeitas à sua aprovação.",
  },
  {
    q: "Como é garantida a segurança dos dados?",
    a: "Cada automação utiliza apenas os acessos estritamente necessários. Seguimos as boas práticas do RGPD e documentamos o que cada automação faz e a que dados acede.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            index="08"
            kicker="Perguntas frequentes"
            id="faq-title"
            title="Esclarecimentos antes de avançar."
          >
            Respostas às questões mais frequentes sobre o nosso serviço.
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
            <p className="text-[16px] font-semibold">Tem outra questão?</p>
            <p className="mt-1 text-[14.5px] text-fg-2">
              Envie-nos a sua questão. Respondemos por email.
            </p>
            <LinkButton
              href={contactHref("Questão")}
              variant="glass"
              size="sm"
              className="mt-5"
              arrow
            >
              Enviar questão
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
