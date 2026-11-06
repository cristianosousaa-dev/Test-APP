export const briefPresets = {
  "Aplicação à medida": {
    systems: ["Excel", "Email"],
    objective: "Centralizar informação e acompanhar o trabalho da equipa",
    cases: [
      {
        name: "Encomendas e produção",
        text: "Queremos reunir encomendas, prazos e responsáveis numa aplicação. Hoje a informação passa por folhas de cálculo, emails e mensagens. Precisamos de acompanhar cada pedido e partilhar os estados com a equipa.",
      },
      {
        name: "Stock e armazém",
        text: "Queremos acompanhar entradas, saídas e níveis de stock numa aplicação, com alertas de reposição e informação atualizada para toda a equipa.",
      },
      {
        name: "Orçamentos e propostas",
        text: "Queremos criar propostas com os nossos preços, acompanhar respostas e transformar os orçamentos aprovados em trabalho, sem voltar a escrever os dados.",
      },
      {
        name: "Portal de clientes",
        text: "Queremos uma área onde clientes e equipa possam consultar pedidos, documentos e estados, com acessos por função e ligação aos processos da empresa.",
      },
    ],
  },
  Automação: {
    systems: ["Email", "Faturação"],
    objective: "Reduzir tarefas repetitivas e evitar informação duplicada",
    cases: [
      {
        name: "Faturação e cobranças",
        text: "Queremos ligar as vendas à faturação, reutilizar os dados do cliente e acompanhar vencimentos com lembretes. O objetivo é reduzir lançamentos manuais e esquecimentos.",
      },
      {
        name: "Pedidos por email",
        text: "Queremos organizar os pedidos que chegam por email, registá-los no sistema certo e notificar a pessoa responsável, mantendo um histórico do que foi tratado.",
      },
      {
        name: "Marcações e lembretes",
        text: "Queremos ligar os pedidos de marcação à agenda e enviar confirmações e lembretes, para reduzir mensagens de ida e volta e faltas por esquecimento.",
      },
    ],
  },
  "Site ou loja": {
    systems: ["Email"],
    objective: "Melhorar a presença digital e receber mais pedidos",
    cases: [
      {
        name: "Site institucional",
        text: "Queremos um site profissional que apresente os serviços, funcione bem no telemóvel e facilite os pedidos de contacto. Gostaríamos de ligar os contactos recebidos ao acompanhamento comercial.",
      },
      {
        name: "Loja online",
        text: "Queremos uma loja online com catálogo, pagamentos e gestão de encomendas, ligada ao stock e à faturação para evitar trabalho duplicado.",
      },
      {
        name: "Site com marcações",
        text: "Queremos apresentar os serviços e permitir que o cliente escolha uma data e hora online, com confirmação e lembretes ligados à nossa agenda.",
      },
    ],
  },
} as const;
export type BriefService = keyof typeof briefPresets;
export const briefSystems = [
  "Excel",
  "Email",
  "WhatsApp",
  "Faturação",
  "Agenda",
  "Site ou loja",
  "Outro",
];
