import { Check, FileCog, Handshake, type LucideIcon, Receipt, Users } from "lucide-react";
import { type Brand, BrandIcon, brandLabel } from "@/components/brand/BrandIcon";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
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
      "Resposta a pedidos por WhatsApp e email",
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
      "Seguimento automático de propostas",
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
    items: [
      "Leitura de faturas de fornecedores",
      "Stock e encomendas",
      "Relatório semanal por email",
    ],
    tools: ["googleDrive", "googleSheets", "openai"],
  },
];

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead index="04" kicker="Serviços" id="servicos-title" title="Áreas de automação.">
            Os processos mais solicitados, organizados por área. Cada solução é desenhada à medida
            da operação da sua empresa.
          </SectionHead>
          <a
            data-reveal
            href={contactHref("Outro processo a automatizar")}
            className="group inline-flex shrink-0 items-center gap-2 text-[15px] font-medium text-fg-2 transition-colors hover:text-fg"
          >
            Outro processo? Fale connosco
            <span className="grid size-7 place-items-center rounded-full bg-white/[0.06] text-accent shadow-[inset_0_0_0_1px_var(--color-hair-2)] transition-transform duration-300 ease-out-soft group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a, i) => {
            const Icon = a.icon;
            return (
              <li key={a.title} data-reveal style={{ ["--i" as string]: i }}>
                <div data-spot className="surface group flex h-full flex-col p-6">
                  <span className="spot-glow" />
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/25 transition-transform duration-300 ease-out-soft group-hover:-rotate-6 group-hover:scale-105">
                      <Icon className="size-5" />
                    </span>
                    <span className="flex -space-x-1.5">
                      {a.tools.map((t, j) => (
                        <span
                          key={t}
                          title={brandLabel(t)}
                          className="grid size-8 place-items-center rounded-full bg-white shadow-[0_0_0_2px_var(--color-base-2)] transition-transform duration-300 ease-out-soft group-hover:-translate-y-1"
                          style={{ transitionDelay: `${j * 50}ms` }}
                        >
                          <BrandIcon brand={t} className="size-4" />
                          <span className="sr-only">{brandLabel(t)}</span>
                        </span>
                      ))}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[21px] font-semibold tracking-[-0.02em] [font-stretch:106%]">
                    {a.title}
                  </h3>
                  <p className="font-mono text-[11px] tracking-[0.06em] text-fg-3 uppercase">
                    {a.blurb}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5 border-t border-hair pt-5 text-[14.5px] text-fg-2">
                    {a.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5">
                        <span className="mt-[3px] grid size-[17px] shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                          <Check className="size-[11px]" strokeWidth={3} />
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
