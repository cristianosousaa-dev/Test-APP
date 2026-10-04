import { euros, pricing, site } from "@/lib/site";

/* A plain-text summary for AI answer engines (llms.txt convention). Built from site constants. */
export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> ${site.name} é um serviço de automação de processos para pequenas e médias empresas (PME) em Portugal. Desenhamos, implementamos e mantemos automações nos sistemas que a empresa já utiliza: WhatsApp, email, agenda, faturação (Moloni, InvoiceXpress), folhas de cálculo e CRM.

## O que automatizamos
- Atendimento e agenda: respostas a pedidos, marcações, lembretes.
- Vendas e propostas: resposta a contactos, orçamentos, seguimento.
- Faturação e cobranças: emissão de faturas, lembretes com referência MB e MB WAY, conciliação.
- Documentos e contabilidade, operações e stock, marketing, recursos humanos, relatórios.
- À medida: portais para clientes, aplicações internas e assistentes de IA.

## Como funciona
Pedido, diagnóstico de 30 minutos, proposta com preço fixo, implementação com testes, acompanhamento incluído na mensalidade.
${pricing.confirmed ? `\n## Preços (sem IVA)\n- Uma automação: desde ${euros(pricing.single.setup)} + ${euros(pricing.single.monthly)}/mês.\n- Processos ligados: desde ${euros(pricing.bundle.setup)} + ${euros(pricing.bundle.monthly)}/mês.\n` : ""}
## Ligações
- Página principal: ${site.url}/
- Pedido de proposta: ${site.url}/#contacto
- Perguntas frequentes: ${site.url}/#faq
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
