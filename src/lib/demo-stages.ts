export type DemoStage = {
  title: string;
  explanation: string;
  from: string;
  to: string;
  facts: readonly (readonly [string, string])[];
  message?: string;
};
export const demoStages: readonly (readonly DemoStage[])[] = [
  [
    {
      title: "O pedido chega por email.",
      explanation:
        "A Ana pede 24 cadeiras para dia 20. A mensagem entra no processo com o cliente, a quantidade e a data de entrega.",
      from: "Email do cliente",
      to: "Entrada de pedidos",
      facts: [
        ["Cliente", "Atelier Norte"],
        ["Produto", "24 cadeiras"],
        ["Entrega pedida", "20 de novembro"],
      ],
    },
    {
      title: "A encomenda ganha um registo.",
      explanation:
        "O pedido fica na encomenda ENC-0250. A equipa passa a consultar o mesmo cliente, os mesmos produtos e o mesmo prazo.",
      from: "Pedido recebido",
      to: "Encomendas",
      facts: [
        ["Referência criada", "ENC-0250"],
        ["Cliente associado", "Atelier Norte"],
        ["Quantidade", "24 cadeiras"],
        ["Responsável", "Equipa comercial"],
      ],
    },
    {
      title: "A produção sabe o que preparar.",
      explanation:
        "A tarefa chega à produção com quantidade e prazo. O estado muda para «Em produção» e o painel passa de 12 para 13 pedidos ativos.",
      from: "Encomendas",
      to: "Equipa de produção",
      facts: [
        ["Tarefa", "Preparar 24 cadeiras"],
        ["Prazo", "20 de novembro"],
        ["Novo estado", "Em produção"],
        ["Pedidos ativos", "12 → 13"],
      ],
    },
    {
      title: "O cliente recebe a confirmação.",
      explanation:
        "A confirmação sai com a referência e a entrega prevista. A mensagem fica ligada à encomenda, para a equipa saber o que foi comunicado.",
      from: "Encomenda ENC-0250",
      to: "Email da Ana",
      facts: [
        ["Para", "Ana · Atelier Norte"],
        ["Assunto", "Encomenda ENC-0250 confirmada"],
        ["Estado", "Confirmação enviada"],
      ],
      message:
        "Olá, Ana. A encomenda de 24 cadeiras ficou registada com a referência ENC-0250. A entrega está prevista para 20 de novembro.",
    },
  ],
  [
    {
      title: "A proposta foi aprovada.",
      explanation:
        "O comercial confirma a proposta 0182. O processo recebe o cliente, os serviços e o valor aprovado, com o IVA já identificado.",
      from: "Proposta aprovada",
      to: "Faturação",
      facts: [
        ["Cliente", "Estúdio Forma"],
        ["Proposta", "0182"],
        ["Total com IVA", "1 230,00 €"],
      ],
    },
    {
      title: "Os dados seguem da ficha do cliente.",
      explanation:
        "Os dados do cliente e os serviços aprovados preenchem o documento. A equipa confere os campos sem voltar a escrever a informação.",
      from: "Ficha de cliente 0032",
      to: "Rascunho de fatura",
      facts: [
        ["Cliente", "Estúdio Forma, Lda."],
        ["Serviços", "Instalação · 1 000,00 €"],
        ["IVA", "23% · 230,00 €"],
        ["Total", "1 230,00 €"],
      ],
    },
    {
      title: "A fatura fica preparada para validação.",
      explanation:
        "O documento reúne os dados e os valores da venda. A pessoa responsável pode conferir a fatura antes da emissão no programa de faturação.",
      from: "Venda confirmada",
      to: "Validação da fatura",
      facts: [
        ["Documento", "FT 2026 / 0148"],
        ["Total", "1 230,00 €"],
        ["Responsável", "Equipa financeira"],
        ["Estado", "Preparada para validar"],
      ],
    },
    {
      title: "O vencimento passa a ser acompanhado.",
      explanation:
        "Fica agendado um lembrete antes do vencimento. O histórico permite ver o documento, a data e a próxima ação sem consultar outra folha.",
      from: "Fatura preparada",
      to: "Agenda de cobranças",
      facts: [
        ["Prazo de pagamento", "30 dias"],
        ["Lembrete", "2 dias antes do vencimento"],
        ["Canal", "Email do cliente"],
        ["Estado", "Agendado"],
      ],
    },
  ],
  [
    {
      title: "A Ana escolhe uma hora.",
      explanation:
        "O pedido chega com o serviço, a data e a hora. Estes dados seguem para a agenda para confirmar se o horário está disponível.",
      from: "Pedido de marcação",
      to: "Disponibilidade",
      facts: [
        ["Cliente", "Ana Martins"],
        ["Serviço", "Consulta inicial · 45 min"],
        ["Data e hora", "Quinta, 12 nov. · 14:30"],
      ],
    },
    {
      title: "A hora fica reservada na agenda.",
      explanation:
        "O horário das 14:30 às 15:15 passa de disponível a reservado. A equipa vê a nova marcação no mesmo calendário.",
      from: "Horário disponível",
      to: "Agenda da equipa",
      facts: [
        ["Cliente", "Ana Martins"],
        ["Início", "14:30"],
        ["Fim", "15:15"],
        ["Estado", "Reservada"],
      ],
    },
    {
      title: "A confirmação chega ao cliente.",
      explanation:
        "A cliente recebe a data, a hora e a duração da consulta. A agenda mostra que a confirmação já foi preparada para envio.",
      from: "Agenda",
      to: "Email da Ana",
      facts: [
        ["Data", "Quinta-feira, 12 de novembro"],
        ["Hora", "14:30 — 15:15"],
        ["Estado", "Confirmada"],
      ],
      message:
        "Olá, Ana. A sua consulta inicial ficou marcada para quinta-feira, dia 12, às 14:30. A duração prevista é de 45 minutos.",
    },
    {
      title: "O lembrete fica agendado.",
      explanation:
        "É preparado um lembrete para a véspera. A equipa pode acompanhar a marcação, a confirmação e o lembrete no mesmo histórico.",
      from: "Marcação confirmada",
      to: "Lembrete ao cliente",
      facts: [
        ["Quando", "24 horas antes"],
        ["Canal", "Email do cliente"],
        ["Marcação", "12 nov. · 14:30"],
        ["Estado", "Lembrete agendado"],
      ],
    },
  ],
];
