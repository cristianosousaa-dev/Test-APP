import {
  BarChart3,
  Boxes,
  FileText,
  Handshake,
  type LucideIcon,
  Megaphone,
  MessagesSquare,
  Receipt,
  Users,
} from "lucide-react";
import { type Brand, BrandIcon, brandLabel } from "@/components/brand/BrandIcon";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { proposalHref } from "@/lib/site";

const AREAS: { title: string; icon: LucideIcon; items: string[]; tools: Brand[] }[] = [
  {
    title: "Atendimento e agenda",
    icon: MessagesSquare,
    items: [
      "Respostas a pedidos por WhatsApp, email e site",
      "Marcações, reagendamentos e lembretes",
      "Confirmações que reduzem as faltas",
      "Pedidos de avaliação no Google",
    ],
    tools: ["whatsapp", "googleCalendar", "google"],
  },
  {
    title: "Vendas e propostas",
    icon: Handshake,
    items: [
      "Resposta imediata a novos contactos",
      "Orçamentos com a sua tabela de preços",
      "Seguimento de propostas enviadas",
      "Registo automático no CRM",
    ],
    tools: ["gmail", "hubspot", "outlook"],
  },
  {
    title: "Faturação e cobranças",
    icon: Receipt,
    items: [
      "Emissão e envio de faturas",
      "Lembretes com referência MB e MB WAY",
      "Conciliação de recebimentos",
      "Alertas de faturas vencidas",
    ],
    tools: ["stripe", "excel", "gmail"],
  },
  {
    title: "Documentos e contabilidade",
    icon: FileText,
    items: [
      "Leitura de faturas de fornecedores",
      "Extração de dados de PDF e digitalizações",
      "Arquivo organizado por mês e por cliente",
      "Envio de documentos ao contabilista",
    ],
    tools: ["googleDrive", "outlook", "openai"],
  },
  {
    title: "Operações e stock",
    icon: Boxes,
    items: [
      "Alertas de stock mínimo",
      "Encomendas a fornecedores",
      "Sincronização entre loja online e armazém",
      "Ordens de trabalho e listas de verificação",
    ],
    tools: ["shopify", "woocommerce", "googleSheets"],
  },
  {
    title: "Marketing e comunicação",
    icon: Megaphone,
    items: [
      "Newsletters e campanhas segmentadas",
      "Publicações programadas nas redes sociais",
      "Mensagens de reativação de clientes",
      "Gestão e resposta a avaliações",
    ],
    tools: ["gmail", "google", "notion"],
  },
  {
    title: "Equipa e recursos humanos",
    icon: Users,
    items: [
      "Integração de novos colaboradores",
      "Pedidos de férias e ausências",
      "Registo de horas e escalas",
      "Documentos para assinatura",
    ],
    tools: ["teams", "slack", "googleDrive"],
  },
  {
    title: "Relatórios e gestão",
    icon: BarChart3,
    items: [
      "Relatório semanal no seu email",
      "Painéis com os números do negócio",
      "Alertas quando algo foge ao normal",
      "Dados de vários sistemas num só lugar",
    ],
    tools: ["googleSheets", "excel", "notion"],
  },
];

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="relative py-28 sm:py-40">
      <Container>
        <SectionHead
          index="03"
          kicker="Serviços"
          id="servicos-title"
          title={
            <>
              Praticamente tudo o que se repete{" "}
              <span className="text-accent">pode ser automatizado.</span>
            </>
          }
        >
          Estas são as áreas mais pedidas. Cada automação é desenhada à medida da forma como a sua
          empresa trabalha, e nada o impede de nos pedir algo que não esteja nesta lista.
        </SectionHead>

        <ul className="relative mt-14 grid grid-cols-1 gap-[2px] sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a, i) => {
            const Icon = a.icon;
            return (
              <li key={a.title} data-reveal style={{ ["--i" as string]: i % 4 }} className="flex">
                <div
                  data-spot
                  className="tile spot group relative flex w-full flex-col overflow-hidden p-6"
                >
                  {/* Signal bar fills across the top of the hovered card. */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out-soft group-hover:scale-x-100"
                  />
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center bg-fg text-white transition-colors duration-300 group-hover:bg-accent">
                      <Icon className="size-[18px]" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-[11px] text-fg-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[21px] leading-snug tracking-[-0.02em]">
                    {a.title}
                  </h3>
                  <ul className="mt-4 flex flex-col text-[14px] leading-[1.5] text-fg-2">
                    {a.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 border-t border-hair py-2">
                        <span className="mt-[8px] size-1 shrink-0 bg-fg-3 transition-colors duration-300 group-hover:bg-accent" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto flex gap-[2px] pt-5">
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
              </li>
            );
          })}
        </ul>

        {/* Bespoke: what Claude-assisted development makes affordable for an SME. */}
        <div
          data-reveal
          className="panel-navy mt-[2px] grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end"
        >
          <span aria-hidden className="marker top-0 left-0" />
          <div>
            <p className="label text-[11px] text-white/60">À medida</p>
            <h3 className="mt-4 font-display text-[clamp(24px,2.6vw,34px)] leading-[1.15] tracking-[-0.025em]">
              Quando a ferramenta certa não existe,{" "}
              <span className="text-[#8fa9ff]">desenvolvemos uma à medida.</span>
            </h3>
            <p className="mt-4 max-w-[38rem] text-[15.5px] leading-[1.6] text-white/70">
              Portais para clientes, pequenas aplicações internas, integrações entre programas que
              não comunicam e assistentes de inteligência artificial que respondem com a informação
              da sua empresa.
            </p>
          </div>
          <LinkButton href={proposalHref} variant="light" size="lg" className="w-full">
            Descrever o que precisa
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
