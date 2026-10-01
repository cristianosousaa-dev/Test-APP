import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const GROUPS = [
  {
    title: "Clientes",
    items: [
      "Responder a mensagens e perguntas frequentes",
      "Marcações, confirmações e lembretes",
      "Pedidos de avaliação depois do serviço",
    ],
  },
  {
    title: "Vendas",
    items: [
      "Resposta e qualificação de novos contactos",
      "Orçamentos e propostas com seguimento",
      "Registo automático no seu CRM",
    ],
  },
  {
    title: "Finanças",
    items: ["Emissão e envio de faturas", "Lembretes de pagamento", "Conciliação de recebimentos"],
  },
  {
    title: "Operações",
    items: [
      "Leitura de faturas e documentos com IA",
      "Stock e encomendas a fornecedores",
      "Relatórios semanais no seu email",
    ],
  },
];

export function Automations() {
  return (
    <section id="servicos" className="py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
        <Reveal className="max-w-[26rem]">
          <p className="text-[14px] text-mute">O que automatizamos</p>
          <h2 className="mt-3 text-[34px] leading-[1.1] font-medium tracking-[-0.028em] sm:text-[44px]">
            Começamos pelo que lhe tira mais tempo.
          </h2>
          <p className="mt-4 text-[17px] leading-[1.6] text-ink-2">
            Estes são os pedidos mais comuns. Se o seu não está aqui, pergunte: se a tarefa se
            repete e segue regras, provavelmente pode ser automatizada.
          </p>
        </Reveal>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.05}>
              <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{g.title}</h3>
              <ul className="mt-3 border-t border-hair">
                {g.items.map((item) => (
                  <li key={item} className="border-b border-hair py-3 text-[15.5px] text-ink-2">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
