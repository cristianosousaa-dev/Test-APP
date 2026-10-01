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
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-x-clip py-20 sm:py-28"
    >
      <Container>
        <SectionHead
          index="08"
          kicker="Perguntas frequentes"
          id="faq-title"
          title="Esclarecimentos antes de avançar."
        >
          Respostas às questões mais frequentes sobre o nosso serviço.
        </SectionHead>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div data-reveal="left" data-frame className="tile p-6">
              <span className="flex gap-[2px]">
                {(["whatsapp", "gmail", "outlook"] as const).map((b) => (
                  <span key={b} className="grid size-9 place-items-center bg-white">
                    <BrandIcon brand={b} className="size-[18px]" />
                  </span>
                ))}
              </span>
              <p className="mt-5 text-[19px] tracking-[-0.015em]">Tem outra questão?</p>
              <p className="mt-1 text-[14.5px] text-fg-2">
                Envie-nos a sua questão. Respondemos por email.
              </p>
              <LinkButton href={contactHref("Questão")} variant="mist" size="sm" className="mt-5">
                Enviar questão
              </LinkButton>
            </div>
          </div>

          <div data-reveal className="flex flex-col">
            {FAQS.map((f, i) => (
              <details key={f.q} name="faq" open={i === 0} className="faq-item group relative">
                <span aria-hidden className="rule-x absolute inset-x-0 top-0" />
                <summary className="flex list-none items-center gap-5 py-6 text-[19px] tracking-[-0.015em] transition-colors duration-300 hover:text-accent [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-[11px] text-fg-3">0{i + 1}</span>
                  <span className="flex-1">{f.q}</span>
                  <span className="grid size-9 shrink-0 place-items-center bg-chip text-fg transition-[background-color,color] duration-500 group-open:bg-fg group-open:text-white">
                    <Plus
                      className="size-4 transition-transform duration-500 ease-out-soft group-open:rotate-45"
                      strokeWidth={1.6}
                    />
                  </span>
                </summary>
                <p className="max-w-[44rem] pb-7 pl-[46px] text-[16px] leading-[1.65] text-fg-2">
                  {f.a}
                </p>
              </details>
            ))}
            <div aria-hidden className="rule-x" />
          </div>
        </div>
      </Container>
    </section>
  );
}
