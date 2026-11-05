import { euros, plans, site } from "@/lib/site";

/* A plain-text summary for AI answer engines (llms.txt convention). Built from site constants. */
export const dynamic = "force-static";

export function GET() {
  const prices = plans
    .map((p) => `- ${p.name}: desde ${euros(p.setup)} + ${euros(p.monthly)}/mês.`)
    .join("\n");
  const body = `# ${site.name}

> ${site.name} desenvolve software à medida para pequenas e médias empresas (PME) em Portugal que querem modernizar processos, substituir software antigo e poupar horas: aplicações de gestão, sites, áreas para clientes e fornecedores, ligação aos programas que já utilizam e automação de processos. Feito de raiz para cada empresa, sem aplicações prontas. Proposta escrita antes de começar.

## O que desenvolvemos
- Encomendas e produção, orçamentos e propostas, faturação e cobranças, marcações e agenda.
- Áreas para clientes e fornecedores, stock e armazém, documentos e aprovações, números e relatórios.
- Ligação a sistemas existentes (PHC, Primavera, Moloni, InvoiceXpress, bases de dados e ficheiros).
- Automação de tarefas repetitivas nos sistemas que a empresa já usa.

## Como funciona
Conversa de 30 minutos, demonstração (protótipo com os dados do cliente), proposta escrita, desenvolvimento com entregas semanais, acompanhamento incluído na mensalidade (alojamento, manutenção, suporte).

## Preços (sem IVA, valores de entrada)
${prices}

## Ligações
- Página principal: ${site.url}/
- Pedido de demonstração: ${site.url}/#contacto
- Perguntas frequentes: ${site.url}/#faq
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
