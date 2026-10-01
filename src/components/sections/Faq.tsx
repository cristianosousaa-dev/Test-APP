import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const faqs = [
  {
    q: "Que tipo de negócios podem automatizar?",
    a: "Praticamente qualquer negócio com tarefas repetitivas: clínicas, oficinas, imobiliárias, restaurantes, lojas online, escritórios e serviços. Se uma tarefa se repete e segue regras, provavelmente pode ser automatizada.",
  },
  {
    q: "Tenho de mudar de software?",
    a: "Não. Ligamos as automações às ferramentas que já usa: WhatsApp, email, agenda, faturação, CRM ou folhas de cálculo. A sua equipa continua a trabalhar como está habituada.",
  },
  {
    q: "Quanto custa?",
    a: "Depende do que for automatizado. Depois do diagnóstico gratuito recebe uma proposta com preço fechado, para saber exatamente o que paga antes de começarmos.",
  },
  {
    q: "Quanto tempo demora?",
    a: "Depende da complexidade de cada automação. O prazo fica definido na proposta, antes de começarmos, e vai acompanhando cada etapa.",
  },
  {
    q: "Usam inteligência artificial?",
    a: "Quando acrescenta valor: perceber mensagens, ler documentos ou redigir respostas. Para o resto, usamos regras simples e fiáveis. As decisões importantes podem ficar sempre sujeitas à sua aprovação.",
  },
  {
    q: "Os meus dados ficam seguros?",
    a: "Usamos apenas os acessos necessários a cada automação, seguimos as boas práticas do RGPD e documentamos o que cada automação faz e a que dados acede.",
  },
];

/**
 * Native <details> accordion: accessible, works without JS, and the answers are in the HTML
 * (findable with Ctrl+F). `name` makes it exclusive; the open/close animation is CSS-only.
 */
export function Faq() {
  return (
    <section id="faq" className="border-t border-line bg-surface py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.5fr]">
        <SectionHeader
          align="left"
          eyebrow="Perguntas frequentes"
          title="Tudo o que precisa de saber"
          description="Não encontrou a sua pergunta? Fale connosco, respondemos com todo o gosto."
        />
        <Reveal>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f, i) => (
              <details key={f.q} name="faq" open={i === 0} className="faq-item group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[16.5px] font-medium tracking-[-0.01em] text-ink [&::-webkit-details-marker]:hidden">
                  <h3>{f.q}</h3>
                  <Plus
                    aria-hidden
                    className="size-5 shrink-0 text-muted transition-transform duration-300 ease-premium group-open:rotate-45 group-open:text-ink motion-reduce:transition-none"
                  />
                </summary>
                <p className="pr-10 pb-6 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
