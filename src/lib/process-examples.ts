export const processExamples = [
  {
    id: "encomendas",
    label: "Encomendas",
    title: "Do pedido à produção, com todos os dados.",
    intro:
      "Acompanhe uma encomenda desde o email do cliente até à confirmação de entrega prevista.",
    before: [
      "Ler o email",
      "Copiar os dados para o Excel",
      "Contactar a produção",
      "Responder ao cliente",
    ],
    after: ["Receber pedido", "Criar encomenda", "Atribuir produção", "Confirmar ao cliente"],
    tabs: ["Entrada", "Encomendas", "Produção", "Mensagens"],
    commands: ["Abrir pedido", "Criar encomenda", "Atribuir à produção", "Enviar confirmação"],
    confirmations: [
      "Pedido aberto · 24 cadeiras identificadas",
      "ENC-0250 criada · dados partilhados",
      "Produção notificada · prazo 20 nov.",
      "Confirmação enviada a Ana",
    ],
    sender: "Ana · Atelier Norte",
    subject: "Nova encomenda · 24 cadeiras",
    message:
      "Bom dia. Precisamos de 24 cadeiras para dia 20 de novembro. Podem confirmar a encomenda? Obrigada, Ana.",
    caption: "O mesmo pedido, acompanhado do início ao fim.",
    hero: [
      "O email da Ana chega com quantidade e prazo.",
      "Cliente, produto e prazo preenchem a ENC-0250.",
      "A tarefa segue para a produção. A equipa é notificada.",
      "Ana recebe a referência e a entrega prevista.",
    ],
  },
  {
    id: "faturacao",
    label: "Faturação",
    title: "Da venda aprovada à faturação, sem repetir dados.",
    intro: "Veja os dados da proposta preencherem o documento e o vencimento ficar acompanhado.",
    before: [
      "Confirmar a venda por email",
      "Reescrever os dados do cliente",
      "Conferir os valores",
      "Anotar o vencimento",
    ],
    after: ["Receber aprovação", "Preencher dados", "Preparar validação", "Agendar lembrete"],
    tabs: ["Vendas", "Cliente", "Documento", "Cobranças"],
    commands: [
      "Abrir proposta",
      "Preencher documento",
      "Enviar para validação",
      "Agendar lembrete",
    ],
    confirmations: [
      "Proposta 0182 aprovada · 1 230,00 €",
      "Cliente e valores preenchidos",
      "Documento pronto para validar",
      "Lembrete agendado · 2 dias antes",
    ],
    sender: "Comercial · Estúdio Forma",
    subject: "Proposta 0182 aprovada",
    message:
      "O cliente aprovou a proposta de 1 230,00 €. Podem preparar o documento com os serviços e os dados da ficha de cliente?",
    caption: "A equipa valida. Os dados seguem sem duplicação.",
    hero: [],
  },
  {
    id: "marcacoes",
    label: "Marcações",
    title: "Da marcação ao lembrete, com a agenda alinhada.",
    intro:
      "Veja o horário ser reservado e a confirmação e o lembrete ficarem associados à marcação.",
    before: [
      "Ler a mensagem do cliente",
      "Consultar a agenda",
      "Confirmar por mensagem",
      "Lembrar o cliente à mão",
    ],
    after: ["Receber marcação", "Reservar horário", "Confirmar ao cliente", "Agendar lembrete"],
    tabs: ["Pedidos", "Agenda", "Confirmação", "Lembretes"],
    commands: ["Ver disponibilidade", "Reservar 14:30", "Enviar confirmação", "Agendar lembrete"],
    confirmations: [
      "Pedido recebido · consulta de 45 min.",
      "14:30–15:15 reservado para Ana",
      "Confirmação enviada · consulta marcada",
      "Lembrete agendado · 24 h antes",
    ],
    sender: "Ana Martins",
    subject: "Pedido de marcação · 12 de novembro",
    message:
      "Olá. Têm disponibilidade na quinta-feira, dia 12, às 14:30? Gostaria de marcar uma consulta inicial.",
    caption: "Uma agenda partilhada, com confirmação e lembrete.",
    hero: [],
  },
] as const;
export type ProcessExample = (typeof processExamples)[number];
