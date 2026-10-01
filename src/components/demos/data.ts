import {
  Bell,
  Bot,
  Building2,
  Calculator,
  CalendarCheck,
  ChartColumn,
  CircleAlert,
  CircleCheck,
  Database,
  FileText,
  Globe,
  Inbox,
  type LucideIcon,
  Mail,
  MessageCircle,
  Package,
  Receipt,
  Repeat,
  ScanText,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  Stethoscope,
  Store,
  Truck,
  UserPlus,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";

export type Tone = "accent" | "ok" | "warn" | "neutral";

export type FeedItem =
  | { kind: "in"; who: string; text: string; time: string }
  | { kind: "out"; text: string; time: string }
  | { kind: "event"; icon: LucideIcon; title: string; detail: string; tone: Tone };

export interface FlowNode {
  label: string;
  sub: string;
  icon: LucideIcon;
  /** AI-powered step: gets a subtle badge. */
  ai?: boolean;
}

export interface Demo {
  id: string;
  sector: string;
  sectorIcon: LucideIcon;
  title: string;
  summary: string;
  channel: { label: string; icon: LucideIcon };
  /** Flow order. Node i is activated at step i. */
  nodes: FlowNode[];
  /** steps[i] = feed items revealed when node i activates. */
  steps: FeedItem[][];
  outcomes: string[];
}

export const demos: Demo[] = [
  {
    id: "clinicas",
    sector: "Clínicas e estética",
    sectorIcon: Stethoscope,
    title: "Marcações e lembretes no WhatsApp",
    summary:
      "O cliente pede uma vaga às 21h. A automação percebe o pedido, consulta a agenda, confirma a marcação e lembra-o na véspera.",
    channel: { label: "WhatsApp · Receção", icon: MessageCircle },
    nodes: [
      { label: "Mensagem recebida", sub: "WhatsApp", icon: MessageCircle },
      { label: "Percebe o pedido", sub: "Assistente IA", icon: Bot, ai: true },
      { label: "Consulta a agenda", sub: "Google Calendar", icon: CalendarCheck },
      { label: "Confirma ao cliente", sub: "Resposta automática", icon: Send },
      { label: "Lembrete na véspera", sub: "Agendado", icon: Bell },
    ],
    steps: [
      [
        {
          kind: "in",
          who: "Marta",
          text: "Olá! Têm vaga para uma limpeza esta semana?",
          time: "21:47",
        },
      ],
      [
        {
          kind: "out",
          text: "Olá Marta! Tenho quinta às 10:00 ou sexta às 15:30. Qual prefere?",
          time: "21:47",
        },
      ],
      [
        { kind: "in", who: "Marta", text: "Sexta às 15:30, por favor 😊", time: "21:48" },
        {
          kind: "event",
          icon: CalendarCheck,
          title: "Marcação criada",
          detail: "Sexta, 15:30 · Limpeza · Marta C.",
          tone: "ok",
        },
      ],
      [{ kind: "out", text: "Está marcado ✅ Sexta, 15:30. Até lá!", time: "21:48" }],
      [
        {
          kind: "event",
          icon: Bell,
          title: "Lembrete agendado",
          detail: "Enviado automaticamente na véspera, às 18:00",
          tone: "accent",
        },
      ],
    ],
    outcomes: [
      "Respostas em segundos, mesmo fora de horas",
      "Agenda preenchida sem chamadas",
      "Menos faltas com lembretes automáticos",
    ],
  },
  {
    id: "servicos",
    sector: "Serviços e oficinas",
    sectorIcon: Wrench,
    title: "Do pedido ao orçamento aceite",
    summary:
      "Um pedido chega pelo site. A IA prepara o orçamento, aprova-o com um clique e a automação envia-o e faz o seguimento.",
    channel: { label: "Painel de pedidos", icon: Inbox },
    nodes: [
      { label: "Novo pedido", sub: "Formulário do site", icon: Globe },
      { label: "Prepara orçamento", sub: "Assistente IA", icon: FileText, ai: true },
      { label: "Aprova com 1 clique", sub: "No telemóvel", icon: CircleCheck },
      { label: "Envia ao cliente", sub: "Email + WhatsApp", icon: Send },
      { label: "Faz seguimento", sub: "Após 3 dias", icon: Repeat },
    ],
    steps: [
      [
        {
          kind: "event",
          icon: Inbox,
          title: "Novo pedido: reparação de esquentador",
          detail: "Rui A. · Lisboa · via site",
          tone: "neutral",
        },
      ],
      [
        {
          kind: "event",
          icon: Sparkles,
          title: "Rascunho de orçamento pronto",
          detail: "Mão de obra + peças · €185,00",
          tone: "accent",
        },
      ],
      [
        {
          kind: "event",
          icon: CircleCheck,
          title: "Orçamento aprovado por si",
          detail: "1 clique, a partir do telemóvel",
          tone: "ok",
        },
      ],
      [
        {
          kind: "out",
          text: "Olá Rui, segue o orçamento para a reparação. Pode aceitar diretamente no link.",
          time: "10:12",
        },
      ],
      [
        {
          kind: "event",
          icon: Repeat,
          title: "Seguimento automático",
          detail: "Sem resposta em 3 dias → lembrete enviado",
          tone: "accent",
        },
        { kind: "in", who: "Rui", text: "Aceite! Quando podem vir?", time: "09:03" },
      ],
    ],
    outcomes: [
      "Orçamentos enviados no próprio dia",
      "Nenhum pedido esquecido",
      "Mais orçamentos aceites com seguimento",
    ],
  },
  {
    id: "imobiliario",
    sector: "Imobiliário",
    sectorIcon: Building2,
    title: "Leads respondidos em segundos",
    summary:
      "Cada contacto de um portal é respondido de imediato, qualificado, registado no CRM e passado ao consultor certo com uma visita marcada.",
    channel: { label: "WhatsApp · Comercial", icon: MessageCircle },
    nodes: [
      { label: "Novo lead", sub: "Portal ou site", icon: UserPlus },
      { label: "Responde e qualifica", sub: "Assistente IA", icon: Bot, ai: true },
      { label: "Regista no CRM", sub: "Lead qualificado", icon: Database },
      { label: "Marca a visita", sub: "Agenda do consultor", icon: CalendarCheck },
      { label: "Avisa o consultor", sub: "Resumo completo", icon: Bell },
    ],
    steps: [
      [
        {
          kind: "event",
          icon: UserPlus,
          title: "Novo lead · T2 em Alvalade",
          detail: "Ana P. · via portal imobiliário",
          tone: "neutral",
        },
      ],
      [
        {
          kind: "out",
          text: "Olá Ana! O T2 continua disponível. Procura para compra ou arrendamento?",
          time: "13:02",
        },
        { kind: "in", who: "Ana", text: "Compra, orçamento até 380 mil.", time: "13:04" },
      ],
      [
        {
          kind: "event",
          icon: Database,
          title: "Lead qualificado no CRM",
          detail: "Compra · até €380.000 · prioridade alta",
          tone: "ok",
        },
      ],
      [
        {
          kind: "event",
          icon: CalendarCheck,
          title: "Visita marcada",
          detail: "Sábado, 11:00 · com o consultor da zona",
          tone: "ok",
        },
      ],
      [
        {
          kind: "event",
          icon: Bell,
          title: "Consultor avisado",
          detail: "Resumo da conversa e do perfil enviado",
          tone: "accent",
        },
      ],
    ],
    outcomes: [
      "Resposta em segundos, não em horas",
      "CRM sempre atualizado, sem digitar",
      "Consultores focados em leads qualificados",
    ],
  },
  {
    id: "restauracao",
    sector: "Restauração",
    sectorIcon: UtensilsCrossed,
    title: "Reservas confirmadas e mais avaliações",
    summary:
      "Reservas aceites a qualquer hora, confirmadas no próprio dia e, depois da visita, um pedido de avaliação enviado no momento certo.",
    channel: { label: "WhatsApp · Reservas", icon: MessageCircle },
    nodes: [
      { label: "Pedido de reserva", sub: "WhatsApp ou site", icon: MessageCircle },
      { label: "Confirma a mesa", sub: "Sistema de reservas", icon: CalendarCheck },
      { label: "Lembrete no dia", sub: "Confirmar ou cancelar", icon: Bell },
      { label: "Agradece a visita", sub: "Depois do jantar", icon: Send },
      { label: "Pede avaliação", sub: "Google", icon: Star },
    ],
    steps: [
      [{ kind: "in", who: "João", text: "Boa tarde, mesa para 4 amanhã às 20h?", time: "17:20" }],
      [{ kind: "out", text: "Reservado ✅ Mesa para 4, amanhã às 20:00.", time: "17:20" }],
      [
        {
          kind: "event",
          icon: Bell,
          title: "Lembrete enviado às 16:00",
          detail: "Confirmado pelo cliente com 1 toque",
          tone: "ok",
        },
      ],
      [{ kind: "out", text: "Obrigado pela visita! Gostou da experiência?", time: "22:40" }],
      [
        {
          kind: "event",
          icon: Star,
          title: "Pedido de avaliação enviado",
          detail: "Link direto para a página do Google",
          tone: "accent",
        },
      ],
    ],
    outcomes: [
      "Menos mesas vazias por faltas",
      "Mais avaliações, pedidas no momento certo",
      "Equipa focada no serviço, não no telefone",
    ],
  },
  {
    id: "ecommerce",
    sector: "Lojas online",
    sectorIcon: Store,
    title: "Encomendas, faturas e stock no piloto automático",
    summary:
      "Cada encomenda gera a fatura, atualiza o stock e, quando um produto está a acabar, prepara a encomenda ao fornecedor.",
    channel: { label: "Painel da loja", icon: ShoppingBag },
    nodes: [
      { label: "Nova encomenda", sub: "Loja online", icon: ShoppingBag },
      { label: "Emite a fatura", sub: "Software de faturação", icon: Receipt },
      { label: "Atualiza o stock", sub: "Inventário", icon: Package },
      { label: "Deteta stock baixo", sub: "Regra definida por si", icon: CircleAlert },
      { label: "Prepara encomenda", sub: "Ao fornecedor", icon: Truck },
    ],
    steps: [
      [
        {
          kind: "event",
          icon: ShoppingBag,
          title: "Encomenda #4821",
          detail: "3 artigos · €96,40 · pago",
          tone: "neutral",
        },
      ],
      [
        {
          kind: "event",
          icon: Receipt,
          title: "Fatura emitida e enviada",
          detail: "FT 2026/1187 · por email ao cliente",
          tone: "ok",
        },
      ],
      [
        {
          kind: "event",
          icon: Package,
          title: "Stock atualizado",
          detail: "Sabonete de lavanda: 12 → 9 unidades",
          tone: "neutral",
        },
      ],
      [
        {
          kind: "event",
          icon: CircleAlert,
          title: "Stock abaixo do mínimo",
          detail: "Mínimo definido: 10 unidades",
          tone: "warn",
        },
      ],
      [
        {
          kind: "event",
          icon: Truck,
          title: "Encomenda ao fornecedor pronta",
          detail: "48 unidades · aguarda a sua aprovação",
          tone: "accent",
        },
      ],
    ],
    outcomes: [
      "Faturação sem trabalho manual",
      "Rutura de stock evitada a tempo",
      "Fornecedores contactados no momento certo",
    ],
  },
  {
    id: "contabilidade",
    sector: "Escritórios e contabilidade",
    sectorIcon: Calculator,
    title: "Documentos lidos e lançados por IA",
    summary:
      "As faturas que chegam por email são lidas, validadas e lançadas no software de contabilidade. A gerência recebe o resumo semanal.",
    channel: { label: "Caixa de faturas", icon: Mail },
    nodes: [
      { label: "Fatura por email", sub: "PDF anexo", icon: Mail },
      { label: "Extrai os dados", sub: "Leitura com IA", icon: ScanText, ai: true },
      { label: "Valida", sub: "Contra a encomenda", icon: CircleCheck },
      { label: "Lança na contabilidade", sub: "Software atual", icon: Database },
      { label: "Relatório semanal", sub: "À gerência", icon: ChartColumn },
    ],
    steps: [
      [
        {
          kind: "event",
          icon: Mail,
          title: "Nova fatura recebida",
          detail: "Fornecedor de matérias-primas · PDF",
          tone: "neutral",
        },
      ],
      [
        {
          kind: "event",
          icon: ScanText,
          title: "Dados extraídos",
          detail: "NIF, valor €1.230,00, vencimento 15/10",
          tone: "accent",
        },
      ],
      [
        {
          kind: "event",
          icon: CircleCheck,
          title: "Validada",
          detail: "Valores conferem com a encomenda",
          tone: "ok",
        },
      ],
      [
        {
          kind: "event",
          icon: Database,
          title: "Lançada na contabilidade",
          detail: "Categoria: matérias-primas",
          tone: "ok",
        },
      ],
      [
        {
          kind: "event",
          icon: ChartColumn,
          title: "Relatório semanal enviado",
          detail: "Segunda-feira, 9:00 · à gerência",
          tone: "accent",
        },
      ],
    ],
    outcomes: [
      "Zero digitação manual de faturas",
      "Menos erros nos lançamentos",
      "Relatórios prontos sem esforço",
    ],
  },
];
