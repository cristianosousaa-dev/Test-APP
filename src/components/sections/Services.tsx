import {
  BarChart3,
  Boxes,
  Cable,
  CalendarClock,
  FileCheck2,
  FileText,
  type LucideIcon,
  PackageCheck,
  ReceiptEuro,
  UsersRound,
} from "lucide-react";
import type { CSSProperties } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { ThemedSpotlightCard } from "@/components/ui/ThemedReactBits";
import { delay } from "@/lib/delay";
import { proposalHref } from "@/lib/site";

/* Practical by design: what it replaces, then what the application does about it. */
const SERVICES = [
  {
    title: "Encomendas e produção",
    replaces: "Folhas de Excel e papéis de obra",
    text: "Pedidos, estados, prazos e entregas num só sítio, com toda a equipa a ver o mesmo.",
  },
  {
    title: "Orçamentos e propostas",
    replaces: "Word e Excel",
    text: "Orçamentos com os seus preços, PDF automático, estados e seguimento até à decisão.",
  },
  {
    title: "Faturação e cobranças",
    replaces: "Lançamentos manuais",
    text: "Ligação ao Moloni, InvoiceXpress, PHC ou Primavera. Avisos de vencimento e conciliação.",
  },
  {
    title: "Marcações e agenda",
    replaces: "Agenda de papel e mensagens",
    text: "Agenda partilhada, confirmações e lembretes enviados por email e SMS.",
  },
  {
    title: "Portais de clientes e fornecedores",
    replaces: "Emails e chamadas",
    text: "Acesso seguro a pedidos, documentos e estados, sem ter de pedir informação por telefone.",
  },
  {
    title: "Stock e armazém",
    replaces: "Contagens em folha",
    text: "Entradas, saídas, alertas de stock mínimo e leitura de códigos pelo telemóvel.",
  },
  {
    title: "Documentos e aprovações",
    replaces: "Pastas e circuitos por email",
    text: "Circuito de aprovação com histórico, responsáveis e arquivo organizado.",
  },
  {
    title: "Painéis e relatórios",
    replaces: "Relatórios feitos no fim do mês",
    text: "Os números da empresa atualizados todos os dias, por cliente, produto e período.",
  },
  {
    title: "Ligação a sistemas antigos",
    replaces: "Copiar e colar entre programas",
    text: "Ligamos a aplicação ao PHC, ao Primavera, a bases de dados e a ficheiros que já tem.",
  },
] as const;

const ICONS: Record<string, LucideIcon> = {
  "Encomendas e produção": PackageCheck,
  "Orçamentos e propostas": FileText,
  "Faturação e cobranças": ReceiptEuro,
  "Marcações e agenda": CalendarClock,
  "Portais de clientes e fornecedores": UsersRound,
  "Stock e armazém": Boxes,
  "Documentos e aprovações": FileCheck2,
  "Painéis e relatórios": BarChart3,
  "Ligação a sistemas antigos": Cable,
};

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="relative overflow-x-clip py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          kicker="Serviços"
          id="servicos-title"
          title={<>O que construímos, em termos práticos.</>}
        >
          Cada projeto parte do processo que a sua empresa já tem. Estes são os pontos de partida
          mais comuns. Se o seu não está na lista, descreva-o: é quase sempre possível.
        </SectionHead>

        <ul className="cells mt-12 sm:mt-16">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.title] ?? Cable;
            return (
              <li key={s.title} data-reveal style={delay((i % 3) * 70)} className="group min-w-0">
                <ThemedSpotlightCard
                  className="flex h-full min-h-[220px] flex-col rounded-none! p-7! sm:p-8!"
                  style={
                    {
                      "--spotlight-card-shadow": "none",
                      "--spotlight-card-surface": "var(--cell-surface)",
                    } as CSSProperties
                  }
                >
                  <span
                    aria-hidden
                    className="absolute top-6 right-6 grid size-10 place-items-center bg-fg/5 text-fg-2 transition-[background-color,color,transform] duration-500 ease-out-soft group-hover:-translate-y-0.5 group-hover:bg-accent group-hover:text-white"
                  >
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <p className="kicker pr-14 text-[10.5px]">
                    Substitui <span className="text-fg">{s.replaces}</span>
                  </p>
                  <h3 className="mt-5 font-display text-[24px] leading-[1.15] tracking-[-0.025em]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-fg-2">{s.text}</p>
                </ThemedSpotlightCard>
              </li>
            );
          })}
        </ul>

        <div
          data-reveal
          className="mt-8 flex flex-col items-start justify-between gap-6 bg-fg p-7 text-onfg sm:flex-row sm:items-center sm:p-10"
        >
          <p className="max-w-[34rem] font-display text-[clamp(22px,2.4vw,30px)] leading-[1.2] tracking-[-0.025em]">
            Precisa de algo que não está na lista? Construímos à medida, a partir do seu processo.
          </p>
          <LinkButton href={proposalHref} variant="light" size="lg" className="shrink-0">
            Descrever o que preciso
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
