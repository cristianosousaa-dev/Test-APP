import { Check, FileCog, Handshake, type LucideIcon, Receipt, Users } from "lucide-react";
import { type Brand, BrandIcon, brandLabel } from "@/components/brand/BrandIcon";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { delay } from "@/lib/delay";
import { contactHref } from "@/lib/site";

const AREAS: {
  title: string;
  blurb: string;
  icon: LucideIcon;
  items: string[];
  tools: Brand[];
}[] = [
  {
    title: "Clientes",
    blurb: "Atendimento e agenda",
    icon: Users,
    items: [
      "Respostas no WhatsApp e email",
      "Marcações e lembretes",
      "Pedidos de avaliação no Google",
    ],
    tools: ["whatsapp", "googleCalendar", "google"],
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
    tools: ["gmail", "hubspot", "outlook"],
  },
  {
    title: "Faturação",
    blurb: "Faturas e cobranças",
    icon: Receipt,
    items: ["Emissão e envio de faturas", "Lembretes de pagamento", "Conciliação de recebimentos"],
    tools: ["stripe", "excel", "gmail"],
  },
  {
    title: "Operações",
    blurb: "Documentos e relatórios",
    icon: FileCog,
    items: ["Leitura de faturas de fornecedores", "Stock e encomendas", "Resumo semanal por email"],
    tools: ["googleDrive", "googleSheets", "openai"],
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
            className="shrink-0 text-[15px] font-medium underline decoration-amber decoration-[3px] underline-offset-[6px] transition-colors hover:text-ink-2"
          >
            Não vê o seu caso? Pergunte-nos
          </a>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a, i) => {
            const Icon = a.icon;
            return (
              <li key={a.title} data-reveal style={{ ["--i" as string]: i, ...delay(i * 80) }}>
                <div data-spot className="card group flex h-full flex-col p-6">
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand transition-[transform,background-color,color] duration-300 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-white">
                      <Icon className="size-[22px]" />
                    </span>
                    <span className="flex -space-x-1.5">
                      {a.tools.map((t) => (
                        <span
                          key={t}
                          title={brandLabel(t)}
                          className="grid size-8 place-items-center rounded-full bg-white shadow-[0_0_0_2px_#fff,0_0_0_3px_rgb(17_19_21/0.08)] transition-transform duration-300 group-hover:-translate-y-0.5"
                        >
                          <BrandIcon brand={t} className="size-4" />
                        </span>
                      ))}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[21px] font-semibold tracking-[-0.02em]">{a.title}</h3>
                  <p className="text-[14px] text-mute">{a.blurb}</p>
                  <ul className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5 text-[14.5px]">
                    {a.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-brand text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
