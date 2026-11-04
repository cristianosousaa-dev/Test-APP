import { euros, plans, site } from "@/lib/site";

/* A plain-text summary for AI answer engines (llms.txt convention). Built from site constants. */
export const dynamic = "force-static";

export function GET() {
  const prices = plans
    .map((p) => `- ${p.name}: desde ${euros(p.setup)} + ${euros(p.monthly)}/mês.`)
    .join("\n");
  const body = `# ${site.name}

> ${site.name} constrói software à medida para pequenas e médias empresas (PME) em Portugal que ainda trabalham em Excel e papel: aplicações de gestão, portais, integrações com os sistemas que já utilizam e automação de processos. Prazo e preço fixos, escritos antes de começar.

## O que construímos
- Encomendas e produção, orçamentos e propostas, faturação e cobranças, marcações e agenda.
- Portais de clientes e fornecedores, stock e armazém, documentos e aprovações, painéis e relatórios.
- Ligação a sistemas existentes (PHC, Primavera, Moloni, InvoiceXpress, bases de dados e ficheiros).
- Automação de tarefas repetitivas nos sistemas que a empresa já usa.

## Como funciona
Diagnóstico de 30 minutos, demonstração com os dados do cliente, proposta com preço fixo, construção com entregas semanais, acompanhamento incluído na mensalidade (alojamento, manutenção, suporte).

## Preços (sem IVA, valores de entrada)
${prices}

## Ligações
- Página principal: ${site.url}/
- Pedido de diagnóstico: ${site.url}/#contacto
- Perguntas frequentes: ${site.url}/#faq
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
