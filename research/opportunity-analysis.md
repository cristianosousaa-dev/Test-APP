# Procura de oportunidade: análise de 6 candidatas

*Data: 2026-10-01. Pesquisa feita com web search (indexação centrada nos EUA, por isso as fontes europeias estão sub-representadas). Cada afirmação factual tem fonte; o que é hipótese minha está marcado como **[hipótese]**.*

---

## 1. Veredicto

1. **Work Graph como produto horizontal: não construir.** É o território mais disputado do software empresarial neste momento (Microsoft, Atlassian, Glean, Notion, mais uma vaga de startups financiadas por teses de VC). Uma equipa pequena não ganha uma guerra de camada contra quem detém os dados e a distribuição.
2. **Work Graph como arquitectura, sim.** A tese de "context graph" da Foundation Capital diz que o grafo de decisões é construído por quem está *no caminho de execução* do trabalho, não por quem indexa depois. Isso aponta para construir um **sistema de acção vertical onde passa dinheiro**, e deixar o grafo nascer como subproduto.
3. **Procurement OS e Founder Dependency OS (como produtos autónomos): descartar.** Razões na secção 3.
4. **A direcção mais forte que encontrei não está na tua lista como tal. É uma síntese de Field Service + Accounts Receivable + Work Graph:** *Job-to-Cash* para empresas de serviços técnicos na Europa, com um *grafo de compromissos* (o que foi prometido, alterado, aprovado) como moat de longo prazo. Detalhe na secção 5.
5. **Terceira opção (menos validada): compliance com "forcing function"**, ao estilo da Vanta, mas para a operação física.

---

## 2. O que as evidências dizem (padrões, não opiniões)

**Padrão 1: as camadas horizontais de contexto estão a ser consolidadas por quem detém os dados.**
- Glean: ARR de $300M em Maio de 2026 (+89% YoY), valorização de $7,2B ([TechCrunch](https://techcrunch.com/2026/05/28/gleans-top-line-crosses-300m-as-ai-budget-cutting-becomes-its-major-selling-point/), [Futurum](https://futurumgroup.com/insights/glean-doubles-arr-to-200m-can-its-knowledge-graph-beat-copilot/)). O maior risco que a própria análise identifica é a Microsoft vender o Copilot a custo marginal quase zero dentro de licenças já pagas.
- Atlassian apresentou o **Teamwork Graph** no Team '26, ligando Jira, Confluence, Salesforce, Workday, Figma, GitHub, M365 e Google ([Product Impact](https://productimpactpod.com/news/atlassian-teamwork-graph-context-2026/)).
- Microsoft: **Work IQ APIs em GA a 16 de Junho de 2026** e "Microsoft IQ" como camada de contexto para agentes ([Marc Pope](https://www.marcpope.com/blog/microsoft-work-iq-api-goes-ga-the-intelligence-layer-enterprise-agents-have-been-waiting-for), [Windows News](https://windowsnews.ai/article/microsoft-iq-at-build-2026-context-layer-powering-enterprise-agents-work-iq-fabric-iq.423529)).
- A tese "context graphs, a oportunidade de um trilião de dólares" (Foundation Capital, 22 Dez 2025) já foi amplificada pela Forbes e por dezenas de blogs ([Foundation Capital](https://foundationcapital.com/ideas/context-graphs-ais-trillion-dollar-opportunity), [Forbes](https://www.forbes.com/sites/josipamajic/2026/04/03/vcs-say-context-graphs-might-be-the-next-big-thing-in-ai/)). Quando a ideia já tem o seu próprio hype cycle, "nova categoria" deixou de ser o ângulo.

**Padrão 2: onde há fluxo de dinheiro dentro do software, a retenção é de outra liga.**
ServiceTitan, FY2026: receita de **$961M (+24%)**, **$82,1B de volume transaccionado**, ~10.800 clientes, retenção bruta **>95%**, líquida **>110%** ([transcrição Q4](https://www.fool.com/earnings/call-transcripts/2026/03/12/servicetitan-ttan-q4-2026-earnings-transcript/), [GuruFocus](https://www.gurufocus.com/news/8705066/servicetitan-ttan-reports-strong-q4-2026-earnings-with-revenue-growth)). É o análogo mais próximo de "Stripe para um sector": o sistema de registo onde o dinheiro passa.

**Padrão 3: o capital está a inundar o mesmo vertical com IA de voz e agentes.**
Avoca (voz para HVAC, canalização, electricidade): **$125M a $1B de valorização em Abril 2026**, ~800 clientes ([Goodmunity](https://goodmunity.com/funding/avoca-125m-funding-ai-home-services-automation-2026/), [ai2.work](https://ai2.work/blog/avoca-raises-125m-to-bring-ai-agents-to-home-services)). Isto valida o mercado e **encurta a janela**.

**Padrão 4: a "forcing function" cria categorias.**
Vanta chegou a **$300M ARR (Abril 2026, +69% YoY)**, valorizada em $4,15B ([SaaS Rise](https://www.saasrise.com/news/vanta-reaches-300m-arr-as-truststack-market-swells-to-13b-cfd77d0d-42d1-4a87-921e-691a694ff7fc), [Sacra](https://sacra.com/c/vanta/)). Mais de 70% dos compradores enterprise exigem SOC 2 antes de assinar: um terceiro **obriga** a empresa a provar algo. É um padrão mais forte do que "ajudar a ser mais eficiente".

**Padrão 5: o contexto vive onde as plataformas não chegam.**
Os grafos da Microsoft/Atlassian/Glean indexam SaaS empresarial. O trabalho de PMEs operacionais vive em WhatsApp, chamadas e áudios. Penetração do WhatsApp ≈ 90%+ em Portugal, Espanha, Irlanda e Itália, >94% na DACH ([LINK Mobility](https://www.linkmobility.com/blog/whatsapp-use-in-europe-and-adoption-across-countries)). Atenção: a Meta **proíbe chatbots de IA de uso geral** na WhatsApp Business API desde 15 Jan 2026, mas permite bots estruturados (suporte, marcações, notificações) ([respond.io](https://respond.io/blog/whatsapp-general-purpose-chatbots-ban), [TechCrunch](https://techcrunch.com/2025/10/18/whatssapp-changes-its-terms-to-bar-general-purpose-chatbots-from-its-platform)). O produto tem de ser especificamente de negócio, nunca "um assistente".

---

## 3. As 5 oportunidades da tua lista + Work Graph, analisadas

Os 20 pontos que pediste, agrupados.

### 3.1 Work Graph (horizontal)

**Problema / quem / frequência / custo (1–4):** perda de contexto entre ferramentas; sofre qualquer equipa >50 pessoas; diário. Custo difícil de quantificar, o que é parte do problema: o orçamento sai de "produtividade", não de uma dor com euros associados.

**Como se resolve hoje / ferramentas / porque não chega (5–7):** pesquisa e reuniões. Glean, Atlassian Rovo, Microsoft Copilot/Work IQ. Não chegam porque indexam *o que* aconteceu, não *porquê*, e porque não vêem WhatsApp/telefone.

**Quem já constrói (8):** todos os grandes. Interloom (Munique) levantou **$16,5M** para um "context graph" a partir de tickets, emails e transcrições, com Commerzbank, Volkswagen e Zurich como clientes ([Fortune](https://fortune.com/2026/03/23/interloom-ai-agents-raises-16-million-venture-funding/)). Scribe (captura de processos): **$1,3B de valorização**, 6M de utilizadores, ~$100M ARR ([SiliconANGLE](https://siliconangle.com/2025/11/10/scribe-raises-75m-process-documentation-platform/), [Yahoo Finance](https://finance.yahoo.com/news/scribe-hits-1-3b-valuation-130000209.html)).

**Mercado / quem paga / quanto (9–11):** enorme (Glean prova disposição para pagar). Paga o CIO/COO, preços enterprise.

**Wedge / começar pequeno / plataforma (12–14):** o problema do arranque a frio: o grafo só tem valor com muitas integrações e muitos dados. Não há wedge pequeno natural.

**IA / dificuldade técnica / risco / moat / MVP (15–20):** IA é central, mas permissões, ingestão multi-fonte e qualidade de extracção são pesadas. Risco de negócio: ser absorvido pela plataforma. Moat fraco sem propriedade dos dados. MVP com equipa pequena: não de forma convincente.

**Conclusão:** mercado real, posição indefensável para uma equipa pequena.

---

### 3.2 Field Service OS

**Problema / quem / frequência / custo:** da chamada do cliente ao pagamento passam 8-10 passos, normalmente em ferramentas separadas (telefone, WhatsApp, Excel, software de facturação). Sofrem empresas de manutenção, instalações, AVAC, eléctricas, solar. Diário. Custo: trabalho executado e **não facturado** (benchmarks de fornecedores apontam 1–5% da receita, e **[hipótese]** o dado é de vendor blogs: [ServiceTrade](https://servicetrade.com/resources/blog/field-service-invoicing-contractor-billing-software/), [BigTime](https://www.bigtime.net/blogs/revenue-leakage/), [Praxedo](https://www.praxedo.com/our-blog/are-you-underbilling-for-your-services-plugging-the-revenue-leaks-in-field-maintenance/)), mais horas administrativas e atraso de caixa.

**Como se resolve / ferramentas / limitações:** ServiceTitan (empresas >$2M, complexo), Jobber, Housecall Pro (pequenas). Na Europa: Joblogic (UK, 7.000 empresas, **>£100M da Vista**, Set 2025: [Vista](https://www.vistaequitypartners.com/news/joblogic-announces-strategic-growth-investment-from-vista-equity-partners/)), Praxedo, Plancraft (DE, **€38M Série B**, >20.000 clientes em 11 países, foco declarado em IA e "voz como única interface": [EU-Startups](https://www.eu-startups.com/2025/08/e38-million-for-german-saas-startup-plancraft-to-lead-ai-transformation-in-european-construction/)). Limitação: o software é desenhado em torno do *agendamento*; o fecho (provas, extras, facturação completa, cobrança) continua manual.

**Quem constrói algo semelhante:** ver acima, mais Avoca (voz). **Mercado:** FSM ≈ $5,1–5,5B em 2025 (duas casas de análise: [GM Insights](https://www.gminsights.com/industry-analysis/field-service-management-market), [MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/field-service-management-market-209977425.html)); estimativas variam muito, ordem de grandeza apenas.

**Quem paga / quanto:** o dono ou gestor da empresa; **[hipótese]** €50–300/mês por empresa pequena, mais por técnico.

**Wedge:** *não* o "OS" completo (isso é perder para ServiceTitan/Joblogic/Plancraft). Ver 5.1.

**Moat / dificuldade:** sistema de registo + pagamentos = retenção >95% (ServiceTitan). Dificuldade: mobile offline-first, integrações com contabilidade por país.

**Conclusão:** o mercado mais validado da lista; o erro seria entrar pela porta da frente.

---

### 3.3 Procurement OS

**Evidência dominante:** é um espaço enorme e **já saturado de capital**. Zip: $371M levantados; Levelpath: $99,5M (Benchmark, Redpoint, Battery); Omnea: $75M+ (Série B de $50M, Set 2025, Insight/Khosla); as 48 principais startups do espaço levantaram **$1,5B** ([Seedtable](https://seedtable.com/best-procurement-startups), [TechCrunch](https://techcrunch.com/2025/06/30/next-gen-procurement-platform-levelpath-nabs-55m), [PR Newswire](https://www.prnewswire.com/news-releases/omnea-raises-50m-to-make-procurement-every-cfos-competitive-advantage-302559153.html), [Sacra](https://sacra.com/c/zip/)).

**Porque descarto:** ciclo de venda enterprise longo, integrações com SAP/Coupa/Oracle, concorrentes com 10-50x o nosso capital, diferenciação difícil de manter. Compras de PMEs (a parte desfavorecida) tem baixo ticket e baixa frequência por empresa.

---

### 3.4 Founder Dependency OS

**Problema real, mas latente.** Interloom afirma que cerca de 70% das decisões operacionais nunca foram documentadas ([Fortune](https://fortune.com/2026/03/23/interloom-ai-agents-raises-16-million-venture-funding/)); nos EUA, ~2,3M PMEs de *boomers* devem mudar de mãos na próxima década e só ~54% têm plano de sucessão ([Fox Business](https://www.foxbusiness.com/small-business/millions-jobs-vulnerable-silver-tsunami-looms-us-small-businesses-experts-warn), dados dos EUA, não da Europa).

**Porque não é um produto autónomo:**
- **Vitamina, não analgésico:** ninguém tem orçamento para isto até alguém sair. Frequência baixa, urgência tardia.
- **O comprador é o problema:** o dono *é* a dependência. A resistência é psicológica.
- **A captura apodrece:** documentação que não está no caminho do trabalho fica desactualizada. E, como diz a literatura, "nenhuma IA extrai o que nunca foi expresso" ([arXiv 2512.05122](https://arxiv.org/pdf/2512.05122)).
- Espaço já ocupado por quem tem $100M ARR (Scribe) e por quem sobe ao enterprise (Interloom).

**O que aproveitar:** a *técnica* (extrair regras e excepções de conversas e registos) é exactamente o que alimenta o "grafo de compromissos" da opção B. Fica como capacidade, não como produto.

---

### 3.5 Accounts Receivable OS

**Problema / custo:** a dor mais **quantificável** da lista. Intrum: pagamentos atrasados custam às empresas europeias **€275 mil milhões/ano**, cada empresa gasta ~€9.194/ano a perseguir pagamentos, e leva em média 74 dias a resolver ([Intrum](https://www.intrum.com/press/press-releases/press-release-article/?id=1e4c441e-c9f4-467e-a3a8-f5d0fbc8dc6e)). O relatório de 2026 indica prazo concedido de 43 dias contra pagamento efectivo aos 63 (diferença que subiu de 16 para 20 dias desde 2023); **[a verificar na fonte primária]**: vi o número num resumo, não no relatório ([Intrum Insight Hub](https://www.intrum.com/insights/insight-hub/)).

**Regulação:** o regulamento europeu de prazos de pagamento (tecto de 30 dias) **encravou** por oposição quase unânime da indústria ([Embat](https://www.embat.io/blog/eu-late-payment-regulation-blocked), [LatePayClaim](https://latepayclaim.com/blog/eu-late-payment-regulation-2026)). **Não contar com vento regulatório de cauda.**

**Concorrência (a parte decisiva):** incumbentes (Billtrust: $1,7B pela EQT: [BusinessWire](https://www.businesswire.com/news/home/20220928005565/en/Billtrust-to-be-Acquired-by-EQT-Private-Equity-for-Equity-Value-of-$1.7-Billion); Upflow, Tesorio, Chaser) e uma **vaga nativa de IA, bem financiada, em formação**: Fazeshift $22M ([Fintech Global](https://fintech.global/2026/05/08/fazeshift-raises-22m-to-automate-accounts-receivable/)), Stuut $29,5M liderado pela a16z ([PR Newswire](https://www.prnewswire.com/news-releases/stuut-technologies-raises-29-5-million-series-a-led-by-andreessen-horowitz-to-automate-accounts-receivable-work-302621866.html)); Monk ($25M Série A) e Tabs ($55M Série B) aparecem em listagens do sector ([Techloy](https://www.techloy.com/best-ai-native-accounts-receivable-software-for-2026/)), de menor confiança. Mercado: $2,8–4,5B em 2025, consoante a casa de análise ([MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/accounts-receivable-automation-market-186013726.html)).

**O sinal mais útil:** o **Siteline** (cobrança vertical para subempreiteiros de construção) levantou só $18,4M ([Crunchbase](https://www.crunchbase.com/organization/siteline)) e cobre $14B+ de recebíveis. Ou seja, o AR *vertical* funciona e a atenção do capital está no AR *horizontal*.

**Moat potencial:** um dataset de comportamento de pagamento de devedores através de muitos clientes (efeito de rede) e, a prazo, pagamentos/financiamento (a lógica Stripe).

**Conclusão:** dor excelente, mas "agente de cobranças" horizontal é uma corrida. Vale como **peça de um produto maior**, não como produto.

---

### 3.6 Compliance / Operations OS

**Evidência:** a categoria compliance automation vale ≈ $1,3B e cresce 18–22%/ano; a Vanta passou os $300M ARR e a Drata ronda os $98M ([SaaS Rise](https://www.saasrise.com/news/vanta-reaches-300m-arr-as-truststack-market-swells-to-13b-cfd77d0d-42d1-4a87-921e-691a694ff7fc), [Sacra/Drata](https://sacra.com/c/drata/)). A pilha regulatória europeia (NIS2, DORA, AI Act, CSRD…) está a empilhar-se.

**O que não encontrei:** startups financiadas de compliance *operacional* (licenças, certificações, seguros, segurança no trabalho). Pode ser lacuna real **ou** limitação da minha pesquisa (índice US-centric). **[hipótese]** Existem incumbentes de pré-qualificação de subcontratados que não verifiquei.

**Dificuldade estrutural:** cada regulamento e jurisdição exige conteúdo curado; é o custo e o moat ao mesmo tempo. "Compliance genérico" é um pântano; funciona com **um comprador forçado** (alguém que exige prova).

**Conclusão:** padrão fortíssimo (Vanta), mas tese específica por validar.

---

## 4. Matriz de avaliação (1–5, 5 = mais favorável; concorrência e complexidade invertidas: 5 = pouca concorrência / simples)

| Critério | Work Graph | Field Service | Procurement | Founder Dep. | AR | Compliance |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Intensidade do problema | 3 | 4 | 3 | 3 | 5 | 4 |
| Frequência | 5 | 5 | 3 | 2 | 5 | 3 |
| Disposição para pagar | 4 | 5 | 4 | 2 | 5 | 4 |
| Tamanho do mercado | 5 | 4 | 5 | 3 | 4 | 4 |
| Concorrência (5 = pouca) | 1 | 2 | 1 | 3 | 2 | 2 |
| Diferenciação possível | 2 | 3 | 2 | 3 | 2 | 3 |
| Potencial internacional | 5 | 4 | 4 | 4 | 4 | 3 |
| Potencial de expansão | 5 | 5 | 3 | 3 | 4 | 4 |
| Nova categoria | 2 | 2 | 1 | 3 | 2 | 3 |
| Facilidade de começar pequeno | 1 | 3 | 1 | 3 | 5 | 3 |
| Complexidade técnica (5 = simples) | 1 | 3 | 2 | 3 | 4 | 3 |
| Potencial de IA | 5 | 4 | 4 | 4 | 4 | 4 |
| Retenção | 4 | 5 | 3 | 2 | 4 | 5 |
| Moat | 2 | 4 | 3 | 3 | 4 | 4 |

**Raciocínio sobre os critérios que decidem (os números sozinhos enganam):**

- **Concorrência e "começar pequeno" eliminam o Work Graph e o Procurement.** Ambos têm mercado enorme; nenhum tem uma porta de entrada que uma equipa pequena consiga defender.
- **Retenção e moat separam o que vale a pena:** o Field Service (retenção >95% no líder) e o Compliance (a prova tem de ser mantida todos os anos) *prendem* o cliente. O Founder Dependency é uma "vitamina" com retenção fraca.
- **"Nova categoria" é baixa em quase todos, e isso é informação:** nenhuma das tuas ideias, *isoladamente*, é uma categoria nova; todas já têm concorrentes financiados. Uma categoria nova só surge da **combinação** (secção 5).
- **O AR tem as melhores pontuações de dor e de arranque, mas a pior de diferenciação:** a disputa em "agente de cobranças" já começou. Por isso entra como motor dentro de um produto vertical, não sozinho.

---

## 5. As 3 oportunidades a explorar

### 5.1 **Job-to-Cash**: do trabalho concluído ao dinheiro recebido (recomendada como wedge)

**Product thesis**
> O sistema que garante que cada trabalho concluído por uma empresa de serviços técnicos é facturado por inteiro, em conformidade com a facturação electrónica e cobrado a tempo, a partir do telemóvel do técnico, sem obrigar a trocar o software que já usam.

**ICP**
Empresa de serviços técnicos com 5–40 pessoas (AVAC, eléctricas, manutenção, instalações solares/bombas de calor) que factura a partir de Excel ou de um programa de facturação simples, com alguém no *back-office* a reconstruir manualmente "o que foi feito". **[hipótese]** Começar em Portugal/Espanha (língua, WhatsApp, mercado de aprendizagem rápida) e expandir para DACH quando o produto estiver provado.

**Core problem**
O trabalho acaba no terreno e a informação para o facturar chega tarde, incompleta ou nunca chega: extras acordados de palavra, materiais, deslocações, horas. Depois, a factura sai e o cliente paga aos 63 dias em vez dos 43 acordados (Intrum).

**Current workflow**
Técnico acaba, manda fotos e áudio por WhatsApp ao escritório; alguém reconstrói a factura de memória/Excel; envia por email; semanas depois, alguém "se lembra" de ligar ao cliente.

**New workflow**
O técnico fecha o trabalho com **um áudio de 20 segundos + fotos**. O sistema devolve as linhas de factura propostas (mão-de-obra, materiais, deslocação, extras), assinala **"isto não estava no orçamento, cobrar?"**, emite a factura no formato exigido e inicia uma cadência de cobrança **adaptada ao comportamento passado daquele cliente**. O dono vê um número por semana: *"€X trabalhados e não facturados · €Y facturados e em atraso"*.

**Killer feature**
**"Fecho de trabalho"**: o momento em que um áudio vira factura completa. A prova de valor é em euros: *"encontrámos €X de trabalho nunca facturado nos últimos 90 dias"*.

**MVP** (equipa de 2–3 pessoas)
1. Importação dos trabalhos e facturas existentes (CSV/API) e reconciliação: relatório "trabalhado vs. facturado vs. cobrado".
2. Número de WhatsApp Business (uso estruturado, permitido pela política da Meta) para o fecho de trabalho por voz.
3. Cadência de cobrança com 1–2 canais e tom adaptável.
4. Dashboard de uma página, não mais.

**Expansion (2–3 anos)**
Sobreposição → sistema de registo dos trabalhos (orçamento, agenda) → **pagamentos e financiamento** (sabemos que facturas vão ser pagas e quando; antecipar recebíveis é a extensão natural, a lógica Stripe) → expansão por país seguindo os calendários de facturação electrónica obrigatória (Bélgica já em 2026; França, recepção desde 1 Set 2026 e emissão pelas PME em Set 2027; Alemanha, emissão por todos em 2028; [Invoice Navigator](https://www.invoicenavigator.eu/deadlines), [SPS Commerce](https://www.spscommerce.com/community/articles/e-invoicing-mandates-in-europe-the-2026-business-guide)). Os calendários de e-invoicing são *forcing functions* que obrigam as empresas a mexer no seu processo de facturação, o que abre a porta.

**Business model** **[hipótese a testar]**
Subscrição mensal por empresa (€99–299) + componente variável sobre o valor recuperado/acelerado; mais tarde, take-rate de pagamentos/financiamento.

**Go-to-market**
- **10:** auditoria gratuita de 90 dias, feita à mão: "dá-nos os teus trabalhos e facturas, mostramos o que ficou por facturar". O resultado é a venda.
- **100:** **contabilistas** como canal (vêem as facturas de dezenas de clientes e ganham com o dashboard); integrações com softwares de facturação locais; conteúdo sobre e-invoicing.
- **1.000:** parcerias com FSMs/ERPs pequenos que não têm este módulo; marketplaces de integrações; expansão por país.

**Moat:** dataset de comportamento de pagamento entre clientes (efeito de rede); estar no caminho de execução (o fecho do trabalho); depois pagamentos.
**Principal risco:** **a prova do pressuposto central**. Os 1–5% de receita por facturar vêm de blogs de fornecedores; tem de se confirmar em 5 empresas reais antes de escrever uma linha de produto. Segundo risco: Plancraft/Joblogic (com capital novo e IA no *roadmap*) alargarem-se para este fecho.

---

### 5.2 **Grafo de compromissos**: a memória do que foi prometido (a visão de longo prazo; Work Graph reduzido ao essencial)

**Product thesis**
> Transforma as conversas de uma empresa de projecto (WhatsApp, email, chamadas) em compromissos rastreáveis (o que foi prometido, alterado e aprovado) e avisa quando algo acordado não foi orçamentado, agendado, executado ou facturado.

**ICP**
Subempreiteiros e empresas de instalação/obra com 10–100 pessoas, onde o âmbito muda verbalmente durante a obra.

**Core problem**
Alterações e aprovações verbais ("aproveita e muda também esta tomada") nunca chegam ao orçamento, e depois não se consegue provar o que foi acordado: extras não pagos e disputas.

**Current workflow**
Grupos de WhatsApp, telefonemas, a memória do encarregado ou do dono.

**New workflow**
O dono/encarregado reencaminha ou dita; a IA extrai um **objecto de compromisso** (cliente, obra, alteração, valor, prazo) para **confirmação com um toque** (humano no circuito: essencial para a confiança). O cliente recebe *"confirmas +€450 para trocar X?"* e aprova por link. Fica um rasto. As perguntas do teu Work Graph passam a ter resposta *com dinheiro associado*: *"Que decisões foram tomadas mas nunca transformadas em tarefas ou facturas?"*

**Killer feature**
**Aprovação do cliente num toque** que cria rasto e vira linha de factura (liga directamente à 5.1).

**MVP**
Assistente de negócio no WhatsApp (estruturado, não "chatbot geral") + painel de compromissos por obra + alerta "acordado e não facturado".

**Expansion**
Compromissos com fornecedores, clientes, funcionários; o grafo completo (cliente→projecto→decisão→tarefa→pessoa→dependência→resultado) como camada, agora com **dados que nenhuma plataforma tem** e com *outcomes* associados (euros).

**Business model / GTM**
Preço por empresa; mesmo canal e mesmos clientes que 5.1 (a venda cruzada é natural).

**Principal risco técnico (a sério):** a API oficial do WhatsApp **não lê grupos existentes**; o fluxo depende de reencaminhamento, número de negócio ou exportação, o que cria fricção. É o maior risco desta opção. **[a validar]** com um fornecedor BSP e com a política da Meta antes de qualquer arquitectura.
**Moat:** o grafo de decisões com resultados, capturado no *momento do compromisso*, é o "decision trace" da tese Foundation Capital; é difícil de reconstituir *a posteriori*.

---

### 5.3 **Compliance com comprador forçado**: "Vanta para a operação física" (alternativa menos validada)

**Product thesis**
> As provas de conformidade (seguros, formações, certificações, licenças, segurança) que clientes e donos de obra exigem a subcontratados, mantidas automaticamente e partilhadas num clique.

**ICP**
Subcontratados industriais e de construção na Europa que trabalham para grandes adjudicatários que exigem documentação para os deixar entrar em obra.

**Core problem / workflow actual**
Dezenas de documentos com validades diferentes, pedidos por email por cada cliente, geridos em pastas e Excel; perda de contratos ou paragem de obra por documento expirado.

**Novo workflow / killer feature**
Cofre com alertas de validade e **"link de conformidade"** que o cliente aceita como prova; a empresa deixa de responder a pedidos um a um.

**MVP**
Cofre + extracção automática de validades + link partilhável + alertas. Sem módulos regulatórios no início.

**Expansion**
Do cofre ao motor de obrigações ("mostra-me o que a minha empresa tem de cumprir"), com conteúdo regulatório por sector.

**Business model:** subscrição por empresa; possível lado do adjudicatário a pagar.
**GTM:** vender ao adjudicatário que *exige* a prova (um cliente força centenas de fornecedores a adoptar), a lógica do SOC 2.
**Risco principal:** **não encontrei evidência directa deste mercado**; pode haver incumbentes que não vi. É a opção com mais incerteza e a que mais ganha com *customer discovery* antes de qualquer decisão.

---

## 6. O que não consegui verificar (lê isto antes de decidir)

- **Os 1–5% de trabalho não facturado** vêm de blogs de fornecedores com interesse comercial. É o pressuposto-chave da 5.1 e **tem de ser medido em empresas reais**.
- **Tamanhos de mercado** variam 60%+ entre casas de análise; usei-os só como ordem de grandeza.
- **Dados de sucessão (*silver tsunami*)** são dos EUA.
- **Uso do WhatsApp por trades europeus:** só encontrei dados gerais de PMEs e de penetração do canal; não encontrei um estudo específico por ofício. A tua premissa é plausível, mas não está provada por esta pesquisa.
- **Intrum 2026 (43 vs. 63 dias):** vi o número num resumo; confirmar no relatório.
- **Monk e Tabs** (AR com IA): fonte de menor confiança (listagens).
- **Específicos de Portugal** (obrigações de software certificado, facturação electrónica B2B, integrações locais): não verificados; faltam na pesquisa.
- **Compliance operacional:** ausência de resultados ≠ ausência de mercado, num índice centrado nos EUA.
- **Preços da concorrência** (Plancraft, Joblogic, Jobber): não verificados; os preços do meu modelo são hipóteses.

---

## 7. Recomendação e próximo passo

**Uma empresa, duas camadas:** **Job-to-Cash (5.1) como wedge** e **grafo de compromissos (5.2) como arquitectura e moat de longo prazo**. É o Work Graph que descreveste, mas construído a partir de um fluxo de dinheiro, num segmento que as plataformas não cobrem, com ROI mensurável em euros desde o primeiro dia. A 5.3 fica como alternativa se a discovery matar a 5.1.

**Validação em 2 semanas, antes de escrever código de produto:**

| Experiência | Critério de sucesso | Critério de morte |
|---|---|---|
| 15 conversas com empresas de serviços técnicos (PT/ES) | ≥10 descrevem o fecho de trabalho como processo manual e doloroso | <5 reconhecem o problema |
| 5 auditorias de 90 dias (trabalhos vs. facturas vs. cobranças) | ≥1% da receita por facturar identificada em ≥3 das 5 | <0,5% em 4 das 5 |
| 5 propostas de preço (€99–299 + variável) | ≥3 dizem sim a pagar | 0–1 |
| Spike técnico WhatsApp | Fluxo de fecho por voz funcional dentro da política da Meta | Impossível sem violar política |

**Decisões que preciso de ti:**
1. Aceitas a síntese **5.1 + 5.2**, ou preferes explorar a 5.3?
2. **Geografia inicial** (Portugal/Espanha vs. DACH) e se tens contactos em algum ofício específico.
3. Posso preparar o guião das 15 entrevistas e o modelo de auditoria dos 90 dias (a parte que não exige código)? Só depois de passar os critérios é que passo a construir o MVP real (base de dados, API, autenticação, interface).

---

## Fontes

Todas as fontes estão ligadas inline nas secções acima. Principais: [TechCrunch/Glean](https://techcrunch.com/2026/05/28/gleans-top-line-crosses-300m-as-ai-budget-cutting-becomes-its-major-selling-point/) · [Foundation Capital](https://foundationcapital.com/ideas/context-graphs-ais-trillion-dollar-opportunity) · [ServiceTitan Q4 FY26](https://www.fool.com/earnings/call-transcripts/2026/03/12/servicetitan-ttan-q4-2026-earnings-transcript/) · [Avoca](https://goodmunity.com/funding/avoca-125m-funding-ai-home-services-automation-2026/) · [Plancraft](https://www.eu-startups.com/2025/08/e38-million-for-german-saas-startup-plancraft-to-lead-ai-transformation-in-european-construction/) · [Joblogic/Vista](https://www.vistaequitypartners.com/news/joblogic-announces-strategic-growth-investment-from-vista-equity-partners/) · [Intrum](https://www.intrum.com/press/press-releases/press-release-article/?id=1e4c441e-c9f4-467e-a3a8-f5d0fbc8dc6e) · [Interloom/Fortune](https://fortune.com/2026/03/23/interloom-ai-agents-raises-16-million-venture-funding/) · [Vanta](https://www.saasrise.com/news/vanta-reaches-300m-arr-as-truststack-market-swells-to-13b-cfd77d0d-42d1-4a87-921e-691a694ff7fc) · [Invoice Navigator](https://www.invoicenavigator.eu/deadlines) · [WhatsApp AI policy](https://respond.io/blog/whatsapp-general-purpose-chatbots-ban)
