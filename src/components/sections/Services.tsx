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
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="relative py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          kicker="Serviços"
          id="servicos-title"
          title={<>Praticamente tudo o que se repete pode ser automatizado.</>}
        >
          Estas são as áreas mais pedidas. Cada automação é desenhada à medida da forma como a sua
          empresa trabalha, e nada o impede de nos pedir algo que não esteja nesta lista.
        </SectionHead>

        {/* A two-column index of areas, separated by hairlines: reads like a menu, not a card grid. */}
        <ul className="mt-12 grid gap-x-14 sm:mt-16 lg:grid-cols-2">
          {AREAS.map((a, i) => {
            const Icon = a.icon;
            return (
              <li
                key={a.title}
                data-reveal
                style={{ ["--i" as string]: i % 2 }}
                className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 border-t border-hair-2 py-6 sm:py-7"
              >
                <Icon aria-hidden className="mt-1 size-5 text-accent" strokeWidth={1.6} />
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-[21px] leading-snug tracking-[-0.02em] sm:text-[23px]">
                      {a.title}
                    </h3>
                    <span className="mt-1 flex shrink-0 gap-2">
                      {a.tools.map((t) => (
                        <span key={t} title={brandLabel(t)}>
                          <BrandIcon brand={t} className="size-[18px]" />
                          <span className="sr-only">{brandLabel(t)}</span>
                        </span>
                      ))}
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] leading-[1.65] text-fg-2">{a.items.join(" · ")}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Bespoke: what Claude-assisted development makes affordable for an SME. */}
        <div
          data-reveal
          className="panel-navy mt-10 grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end"
        >
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
