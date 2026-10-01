import { Check, FileCog, Handshake, type LucideIcon, Receipt, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { delay } from "@/lib/delay";
import { contactHref } from "@/lib/site";

const AREAS: { title: string; blurb: string; icon: LucideIcon; items: string[] }[] = [
  {
    title: "Clientes",
    blurb: "Atendimento e agenda",
    icon: Users,
    items: [
      "Respostas no WhatsApp e email",
      "Marcações e lembretes",
      "Pedidos de avaliação no Google",
    ],
  },
  {
    title: "Vendas",
    blurb: "Contactos e propostas",
    icon: Handshake,
    items: [
      "Resposta imediata a contactos",
      "Orçamentos com os seus preços",
      "Seguimento automático",
    ],
  },
  {
    title: "Faturação",
    blurb: "Faturas e cobranças",
    icon: Receipt,
    items: ["Emissão e envio de faturas", "Lembretes de pagamento", "Conciliação de recebimentos"],
  },
  {
    title: "Operações",
    blurb: "Documentos e relatórios",
    icon: FileCog,
    items: ["Leitura de faturas de fornecedores", "Stock e encomendas", "Resumo semanal por email"],
  },
];

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead kicker="Serviços" id="servicos-title" title="O que podemos automatizar.">
            Os pedidos mais comuns, por área. Cada automação é feita à medida do seu negócio.
          </SectionHead>
          <a
            data-reveal
            href={contactHref("Tenho outra tarefa para automatizar")}
            className="shrink-0 text-[15px] font-medium underline decoration-lime decoration-[3px] underline-offset-[6px] transition-colors hover:text-ink-2"
          >
            Não vê o seu caso? Pergunte-nos
          </a>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a, i) => {
            const Icon = a.icon;
            return (
              <li
                key={a.title}
                data-reveal
                style={delay(i * 80)}
                className="group card flex flex-col p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_2px_var(--color-ink),0_24px_40px_-24px_rgb(14_15_18/0.35)]"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-ink text-lime transition-transform duration-300 group-hover:-rotate-6">
                  <Icon className="size-[22px]" />
                </span>
                <h3 className="mt-5 text-[21px] font-semibold tracking-[-0.02em]">{a.title}</h3>
                <p className="text-[14px] text-mute">{a.blurb}</p>
                <ul className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5 text-[14.5px]">
                  {a.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-lime text-ink">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
