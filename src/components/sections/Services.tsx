import { type Brand, BrandIcon, brandLabel } from "@/components/brand/BrandIcon";
import { Container } from "@/components/ui/Container";
import { IsoArt, type IsoKind } from "@/components/ui/IsoArt";
import { SectionHead } from "@/components/ui/SectionHead";
import { contactHref } from "@/lib/site";

const AREAS: {
  title: string;
  blurb: string;
  art: IsoKind;
  items: string[];
  tools: Brand[];
}[] = [
  {
    title: "Clientes",
    blurb: "Atendimento e agenda",
    art: "chat",
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
    art: "doc",
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
    art: "coins",
    items: ["Emissão e envio de faturas", "Lembretes de pagamento", "Conciliação de recebimentos"],
    tools: ["stripe", "excel", "gmail"],
  },
  {
    title: "Operações",
    blurb: "Documentos e relatórios",
    art: "chart",
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
    <section id="servicos" aria-labelledby="servicos-title" className="relative py-20 sm:py-28">
      <Container>
        <SectionHead index="04" kicker="Serviços" id="servicos-title" title="Áreas de automação.">
          Os processos mais solicitados, organizados por área. Cada solução é desenhada à medida da
          operação da sua empresa.
        </SectionHead>

        <ul className="relative mt-14 grid sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a, i) => (
            <li
              key={a.title}
              data-reveal
              style={{ ["--i" as string]: i }}
              className="group relative flex flex-col px-5 pt-6 pb-7 transition-colors duration-500 hover:bg-tile-2 sm:px-6"
            >
              <span aria-hidden className="rule-x absolute inset-x-0 top-0" />
              {i % 2 === 1 && (
                <span
                  aria-hidden
                  className="rule-y absolute top-0 bottom-0 left-0 hidden sm:block"
                />
              )}
              {i === 2 && (
                <span
                  aria-hidden
                  className="rule-y absolute top-0 bottom-0 left-0 hidden lg:block"
                />
              )}
              {/* Signal bar fills across the top of the hovered column. */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-soft group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-fg-3">0{i + 1}</span>
                <span className="flex gap-[2px]">
                  {a.tools.map((t) => (
                    <span
                      key={t}
                      title={brandLabel(t)}
                      className="grid size-7 place-items-center bg-white"
                    >
                      <BrandIcon brand={t} className="size-4" />
                      <span className="sr-only">{brandLabel(t)}</span>
                    </span>
                  ))}
                </span>
              </div>
              <IsoArt
                kind={a.art}
                className="mx-auto my-8 h-[120px] w-full max-w-[200px] transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
              />
              <h3 className="text-[24px] tracking-[-0.025em]">{a.title}</h3>
              <p className="label mt-1 text-[10.5px] text-fg-3">{a.blurb}</p>
              <ul className="mt-5 flex flex-col text-[14.5px] text-fg-2">
                {a.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 border-t border-hair py-2.5">
                    <span className="mt-[9px] size-1.5 shrink-0 bg-fg transition-colors duration-300 group-hover:bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div aria-hidden className="rule-x" />

        <a
          data-reveal
          href={contactHref("Outro processo a automatizar")}
          className="group/link mt-8 flex items-center justify-between gap-6 bg-tile px-5 py-5 transition-colors duration-300 hover:bg-fg hover:text-white sm:px-6"
        >
          <span className="text-[17px] tracking-[-0.01em]">
            Outro processo?{" "}
            <span className="text-fg-3 transition-colors group-hover/link:text-white/60">
              Fale connosco.
            </span>
          </span>
          <span className="label flex items-center gap-2 text-[11px]">
            Contactar
            <span className="transition-transform duration-300 ease-out-soft group-hover/link:translate-x-1">
              →
            </span>
          </span>
        </a>
      </Container>
    </section>
  );
}
