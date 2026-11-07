import { euros, plans } from "@/lib/site";

export const FAQS = [
  {
    q: "O que pode ser feito à medida da minha empresa?",
    a: "Aplicações de gestão, plataformas, portais de clientes, sites e lojas online. Também modernizamos software antigo e automatizamos tarefas nos programas que já utiliza. O ponto de partida é o processo da sua empresa.",
  },
  {
    q: "A primeira conversa e a demonstração têm custos?",
    a: "Não. A conversa inicial e a demonstração são feitas antes de qualquer compromisso. A demonstração é um protótipo para explorar o seu processo; a aplicação completa é construída depois de aprovar a proposta.",
  },
  {
    q: "Quanto custa e quanto tempo demora?",
    a: `Uma automação começa nos ${euros(plans.find((p) => p.id === "automacao")?.setup ?? 490)} e demora normalmente 1 a 2 semanas. Uma aplicação começa nos ${euros(plans.find((p) => p.id === "aplicacao")?.setup ?? 3400)}, com um prazo típico de 2 a 4 semanas. Uma plataforma começa nos ${euros(plans.find((p) => p.id === "plataforma")?.setup ?? 8900)} e demora normalmente 6 a 12 semanas. Acresce manutenção mensal e IVA. O âmbito, o preço e o prazo finais ficam escritos na proposta antes de começar.`,
  },
  {
    q: "Posso manter os programas e os dados que já tenho?",
    a: "Sim. Avaliamos as ligações ao PHC, Primavera, Moloni, InvoiceXpress e outros sistemas. A viabilidade depende das interfaces de cada programa. Importamos os dados existentes e combinamos uma transição que permita à equipa continuar a trabalhar.",
  },
  {
    q: "O que acontece depois da entrega?",
    a: "A mensalidade inclui alojamento, cópias de segurança, manutenção e suporte. Nas aplicações e plataformas inclui também as horas de evolução indicadas em cada plano. O acompanhamento é feito por quem construiu o projeto.",
  },
  {
    q: "De quem são os dados e o software?",
    a: "Os dados são seus e podem ser exportados. A propriedade, a licença do software e as condições de saída ficam definidas por escrito na proposta. Cada pessoa tem o acesso adequado à sua função.",
  },
  {
    q: "Funciona no telemóvel?",
    a: "Sim. As aplicações são adaptadas ao computador, tablet e telemóvel e funcionam a partir do navegador. A interface é desenhada para as tarefas e para as pessoas que a vão utilizar.",
  },
  {
    q: "Utilizam inteligência artificial?",
    a: "Quando ajuda o processo: por exemplo, na leitura de documentos ou na preparação de respostas. Usamos regras previsíveis quando são suficientes e definimos consigo as situações que exigem aprovação humana.",
  },
];
