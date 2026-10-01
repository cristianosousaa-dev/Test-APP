import {
  CalendarCheck,
  ChartColumn,
  FileText,
  type LucideIcon,
  MessageCircle,
  Package,
  Receipt,
  ScanText,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const capabilities: { icon: LucideIcon; title: string; text: string; example: string }[] = [
  {
    icon: MessageCircle,
    title: "Atendimento e WhatsApp",
    text: "Respostas imediatas a perguntas frequentes, pedidos e reservas.",
    example: "“Qual é o horário?” respondido às 23h",
  },
  {
    icon: CalendarCheck,
    title: "Marcações e lembretes",
    text: "Agenda online, confirmações e lembretes que reduzem faltas.",
    example: "Lembrete na véspera com confirmação",
  },
  {
    icon: Users,
    title: "Vendas e CRM",
    text: "Leads respondidos, qualificados e registados sem digitar.",
    example: "Lead do site → CRM → comercial",
  },
  {
    icon: FileText,
    title: "Orçamentos e propostas",
    text: "Do pedido ao orçamento enviado, com seguimento automático.",
    example: "Seguimento após 3 dias sem resposta",
  },
  {
    icon: Receipt,
    title: "Faturação e cobranças",
    text: "Faturas emitidas e lembretes de pagamento enviados a tempo.",
    example: "Fatura em atraso → lembrete educado",
  },
  {
    icon: ScanText,
    title: "Documentos com IA",
    text: "Faturas, recibos e formulários lidos e lançados automaticamente.",
    example: "PDF no email → dados na contabilidade",
  },
  {
    icon: Package,
    title: "Operações e stock",
    text: "Encomendas, inventário e fornecedores sempre sincronizados.",
    example: "Stock baixo → encomenda ao fornecedor",
  },
  {
    icon: ChartColumn,
    title: "Relatórios e alertas",
    text: "Os números do negócio no seu email ou telemóvel, sem pedir.",
    example: "Resumo semanal à segunda às 9:00",
  },
];

export function Capabilities() {
  return (
    <section id="servicos" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeader
        eyebrow="O que automatizamos"
        title="Do primeiro contacto ao relatório final"
        description="Automatizamos as tarefas que se repetem em qualquer área do negócio. Começamos pelo que lhe poupa mais tempo."
      />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal
              as="li"
              key={c.title}
              delay={(i % 4) * 0.06}
              className="group relative flex flex-col rounded-2xl border border-line bg-surface p-6 transition-[box-shadow,transform,border-color] duration-300 ease-premium hover:-translate-y-0.5 hover:border-line-strong hover:shadow-float"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-page text-ink-2 ring-1 ring-line transition-colors duration-300 group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-[16px] font-semibold tracking-[-0.015em] text-ink">
                {c.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{c.text}</p>
              <p className="mt-5 border-t border-dashed border-line pt-4 text-[12.5px] leading-snug text-ink-2">
                {c.example}
              </p>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
