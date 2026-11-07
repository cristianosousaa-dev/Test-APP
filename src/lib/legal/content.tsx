import type { ReactNode } from "react";
import { CookiePreferences } from "@/components/legal/CookiePreferences";
import { founder, site } from "@/lib/site";
import { type LegalSlug, legalOperator } from "./config";

export type LegalSection = { id: string; title: string; content: ReactNode };
export type LegalContent = { title: string; intro: string; sections: LegalSection[] };
const link = (url: string, label: string) => (
  <a href={url} target="_blank" rel="noreferrer">
    {label}
  </a>
);
const contact = legalOperator.email ? (
  <a href={`mailto:${legalOperator.email}`}>{legalOperator.email}</a>
) : (
  <span>
    canal de contacto operacional a indicar pelo titular; <strong>{site.email}</strong> é
    ilustrativo e não recebe pedidos
  </span>
);

export const legalDocuments: Record<LegalSlug, LegalContent> = {
  privacidade: {
    title: "Política de privacidade",
    intro:
      "Que informação é utilizada, para quê e como pode gerir os seus direitos nesta versão do site.",
    sections: [
      {
        id: "responsavel",
        title: "1. Responsável e âmbito",
        content: (
          <>
            <p>
              A Orchestr apresenta serviços de desenvolvimento de software, automação e experiências
              digitais. Esta política descreve o site e as suas demonstrações, não o tratamento de
              dados em aplicações de clientes.
            </p>
            <p>
              O responsável legal será identificado no <a href="/aviso-legal">aviso legal</a>. A
              denominação, identificação fiscal, morada e contacto operacional ainda não foram
              disponibilizados nesta preview. Pessoa apresentada no site: {founder.name}. Esta
              indicação não substitui a identificação jurídica do titular.
            </p>
          </>
        ),
      },
      {
        id: "dados",
        title: "2. Informação utilizada",
        content: (
          <>
            <ul>
              <li>
                <strong>Navegação:</strong> o pedido de uma página comunica à infraestrutura dados
                técnicos, como endereço IP, URL, data e hora e informação do navegador. Podem
                existir registos técnicos de acesso e segurança.
              </li>
              <li>
                <strong>Contacto:</strong> nome, email, assunto, plano escolhido e mensagem opcional
                permanecem na memória da página. Nesta versão, o formulário não envia esses campos a
                um servidor nem cria uma base de contactos.
              </li>
              <li>
                <strong>Preferência visual:</strong> o tema escolhido é guardado no navegador. O
                inventário está na <a href="/cookies">política de cookies e preferências</a>.
              </li>
              <li>
                <strong>Demonstrações:</strong> os nomes, documentos, montantes e processos
                apresentados são fictícios. Não são dados de clientes.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "finalidades",
        title: "3. Finalidades e fundamento",
        content: (
          <>
            <p>
              Os dados técnicos permitem entregar as páginas, detetar falhas e proteger o serviço. O
              fundamento é o interesse legítimo na disponibilidade e segurança, ponderado com os
              direitos de quem visita o site. O tema serve uma preferência expressamente escolhida.
            </p>
            <p>
              O pedido de contacto é preparado por iniciativa do visitante e fica localmente no
              navegador. Caso um canal de email real seja ativado, os dados enviados para responder
              a pedidos pré-contratuais serão tratados para esse fim e a informação operacional será
              atualizada antes da ativação. Não há subscrição de marketing, venda de contactos ou
              publicidade personalizada nesta versão.
            </p>
          </>
        ),
      },
      {
        id: "formulario",
        title: "4. Formulário, cópia e ficheiro",
        content: (
          <>
            <p>
              O botão «Pedir uma conversa» prepara um resumo local e apresenta uma confirmação de
              demonstração. Não envia um email. Fechar ou atualizar a página elimina os campos da
              memória da aplicação; o navegador pode conservar dados de preenchimento automático nas
              suas próprias definições.
            </p>
            <p>
              Se escolher copiar, o resumo passa para a área de transferência do dispositivo. Se
              escolher guardar, é descarregado um ficheiro de texto. Essas cópias ficam sob o seu
              controlo e não são apagadas ao fechar a página. Evite incluir informação sensível ou
              dados pessoais de terceiros que não sejam necessários ao pedido.
            </p>
          </>
        ),
      },
      {
        id: "prestadores",
        title: "5. Alojamento e destinatários",
        content: (
          <>
            <p>
              O site é alojado na Vercel. A infraestrutura pode tratar dados técnicos necessários à
              entrega, proteção e diagnóstico do serviço. A Vercel descreve as suas práticas na{" "}
              {link("https://vercel.com/legal/privacy-notice", "nota de privacidade")} e no{" "}
              {link("https://vercel.com/legal/dpa", "acordo de tratamento de dados")}. A
              configuração e os registos técnicos do alojamento são distintos dos campos locais do
              formulário.
            </p>
            <p>
              As fontes, imagens e bibliotecas são disponibilizadas pelo próprio site; não há
              ferramentas de analítica, pixels publicitários, mapas ou vídeos externos incorporados
              no código atual. Ligações para LinkedIn, BOOKLIN, Strict.Dev e fontes oficiais abrem
              outros sites, sujeitos às respetivas políticas.
            </p>
          </>
        ),
      },
      {
        id: "conservacao",
        title: "6. Conservação e transferências",
        content: (
          <>
            <p>
              Os campos do formulário duram apenas enquanto a página mantém o seu estado. A
              preferência de tema fica até ser alterada, removida nas definições do site ou apagada
              pelo navegador. Os registos técnicos seguem o período operacional do alojamento e são
              limitados à necessidade de disponibilizar o serviço, investigar falhas ou incidentes e
              cumprir obrigações aplicáveis.
            </p>
            <p>
              O alojamento pode envolver tratamento fora do Espaço Económico Europeu. A Vercel
              publica mecanismos contratuais para transferências internacionais no seu acordo de
              tratamento. O titular deve confirmar a configuração, os destinatários e as garantias
              aplicáveis ao serviço efetivamente contratado; não é afirmado alojamento exclusivo em
              Portugal ou na União Europeia.
            </p>
          </>
        ),
      },
      {
        id: "direitos",
        title: "7. Os seus direitos",
        content: (
          <>
            <p>
              Nos termos aplicáveis, pode pedir acesso, retificação, apagamento e limitação, opor-se
              a tratamentos baseados em interesse legítimo e exercer portabilidade quando os
              requisitos legais se verificarem. Quando existir consentimento, pode retirá-lo sem
              afetar o tratamento anterior. Não existem decisões automatizadas com efeitos jurídicos
              ou definição de perfis neste site.
            </p>
            <p>
              Para exercer direitos, utilize o {contact}. A resposta deve ser prestada, em regra, no
              prazo de um mês; uma extensão legalmente admissível deve ser justificada. Pode
              reclamar junto da{" "}
              {link("https://www.cnpd.pt/", "Comissão Nacional de Proteção de Dados — CNPD")}, sem
              prejuízo de outros meios de tutela.
            </p>
          </>
        ),
      },
      {
        id: "seguranca",
        title: "8. Segurança e alterações",
        content: (
          <>
            <p>
              O site utiliza HTTPS no alojamento e políticas de segurança para restringir scripts e
              conteúdos. Nenhum sistema é isento de risco. Os conteúdos são dirigidos a um contexto
              profissional; não solicitamos dados de menores nem categorias especiais de dados.
            </p>
            <p>
              Alterações relevantes às finalidades, ferramentas ou canais de contacto devem ser
              refletidas nesta política antes da sua utilização. A data de atualização consta no
              início desta página.
            </p>
          </>
        ),
      },
      {
        id: "fontes",
        title: "Fontes e enquadramento",
        content: (
          <p>
            {link(
              "https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=pt",
              "Regulamento Geral sobre a Proteção de Dados",
            )}
            ;{" "}
            {link(
              "https://diariodarepublica.pt/dr/detalhe/lei/58-2019-123815982",
              "Lei n.º 58/2019",
            )}
            ; <a href="/cookies">cookies e armazenamento local</a>.
          </p>
        ),
      },
    ],
  },
  termos: {
    title: "Termos de utilização",
    intro:
      "Condições de acesso ao site, utilização das demonstrações e apresentação dos serviços da Orchestr.",
    sections: [
      {
        id: "ambito",
        title: "1. Objeto e titular",
        content: (
          <>
            <p>
              Estes termos regulam a utilização informativa do site Orchestr. A identificação do
              titular e o estado dos contactos constam no <a href="/aviso-legal">aviso legal</a>. A
              navegação não celebra um contrato de desenvolvimento, manutenção ou alojamento.
            </p>
            <p>
              Os serviços são apresentados sobretudo a empresas e profissionais. Qualquer
              contratação depende de uma proposta e de aceitação expressa das condições específicas.
              Os direitos legais que sejam imperativos mantêm-se aplicáveis.
            </p>
          </>
        ),
      },
      {
        id: "acesso",
        title: "2. Acesso e utilização adequada",
        content: (
          <>
            <p>
              Pode consultar o site, explorar exemplos e preparar um pedido de contacto para fins
              lícitos. Não é permitida a introdução de código malicioso, tentativa de acesso não
              autorizado, interferência com a infraestrutura, usurpação de identidade ou utilização
              dos conteúdos de forma que infrinja direitos de terceiros.
            </p>
            <p>
              As medidas necessárias à segurança podem limitar acessos abusivos. Não é exigida
              criação de conta para consultar esta aplicação.
            </p>
          </>
        ),
      },
      {
        id: "demonstracoes",
        title: "3. Demonstrações e funcionalidades",
        content: (
          <>
            <p>
              As interfaces animadas são simulações ilustrativas. Os dados, empresas, documentos e
              confirmações são fictícios. Não são enviadas encomendas, emitidas faturas, reservados
              horários nem disparadas mensagens reais ao explorar uma demo.
            </p>
            <p>
              A disponibilidade de uma integração ou automação num projeto concreto depende dos
              sistemas existentes, acessos, licenças, APIs, qualidade dos dados e regras acordadas.
              Um exemplo visual não constitui garantia de compatibilidade com qualquer software ou
              de um resultado económico específico.
            </p>
          </>
        ),
      },
      {
        id: "precos",
        title: "4. Preços e propostas",
        content: (
          <>
            <p>
              Os valores apresentados são pontos de partida, sem IVA, e distinguem implementação de
              acompanhamento mensal. Âmbito, integrações, utilizadores, horas de suporte, exclusões,
              prazos, pagamentos e demais condições devem ser confirmados numa proposta escrita.
            </p>
            <p>
              Não existe checkout ou pagamento no site. Selecionar um plano prepara o contexto de
              uma conversa e não adjudica trabalho, inicia uma subscrição ou autoriza uma cobrança.
              Os preços e prazos indicativos podem ser atualizados; uma proposta aceite rege-se
              pelos seus próprios termos.
            </p>
          </>
        ),
      },
      {
        id: "contratacao",
        title: "5. Prestação dos serviços",
        content: (
          <>
            <p>
              Antes de qualquer contratação devem ser acordados os requisitos, entregas, critérios
              de aceitação, responsabilidades de cada parte, tratamento de alterações, direitos
              sobre os resultados, suporte, renovação e cessação. A prestação de serviços não se
              inicia com a mera utilização do site.
            </p>
            <p>
              Se um projeto envolver dados pessoais, as funções e instruções das partes, medidas de
              segurança e eventual acordo de subcontratação devem ser definidos para esse
              tratamento. Estes termos de navegação não substituem esse acordo.
            </p>
          </>
        ),
      },
      {
        id: "contacto",
        title: "6. Pedidos e informação fornecida",
        content: (
          <>
            <p>
              Nesta preview, o formulário guarda os campos apenas na memória da página e prepara um
              resumo. Não envia pedidos nem emails. A cópia para a área de transferência ou o
              download são ações escolhidas pelo visitante.
            </p>
            <p>
              Forneça informação exata e apenas os dados necessários. A utilização dos dados é
              explicada na <a href="/privacidade">política de privacidade</a>. O email {site.email}{" "}
              é ilustrativo.
            </p>
          </>
        ),
      },
      {
        id: "propriedade",
        title: "7. Conteúdos e propriedade intelectual",
        content: (
          <>
            <p>
              Os textos, elementos visuais e identidade apresentados estão sujeitos aos direitos dos
              respetivos titulares. A consulta do site não transfere direitos de exploração
              comercial, marcas ou código de projetos futuros. O uso permitido por lei, incluindo
              citações admissíveis, não é restringido por esta disposição.
            </p>
            <p>
              Marcas de integrações e componentes de terceiros conservam os seus direitos e
              licenças. A presença de um logótipo identifica um exemplo de sistema ou integração e
              não afirma parceria, certificação ou aprovação desse titular.
            </p>
          </>
        ),
      },
      {
        id: "disponibilidade",
        title: "8. Disponibilidade e responsabilidade",
        content: (
          <>
            <p>
              Procuramos manter os conteúdos atualizados e o site disponível. Podem existir
              manutenção, falhas técnicas ou incorreções, que serão tratadas quando identificadas.
              As demonstrações não devem ser usadas como sistema operacional da sua empresa.
            </p>
            <p>
              As limitações decorrentes da natureza informativa do site não afastam
              responsabilidades ou direitos que não possam ser excluídos por lei. Não é estabelecida
              uma exclusão geral de responsabilidade por atos ilícitos, dolo ou incumprimento de
              normas imperativas.
            </p>
          </>
        ),
      },
      {
        id: "terceiros",
        title: "9. Ligações e preferências",
        content: (
          <p>
            Os sites externos têm regras próprias. Não controlamos os respetivos serviços. A
            preferência de tema e o armazenamento utilizado estão descritos em{" "}
            <a href="/cookies">cookies e preferências</a>. Pode explorar as demonstrações com pausa,
            etapas manuais e movimento reduzido.
          </p>
        ),
      },
      {
        id: "lei",
        title: "10. Lei, litígios e atualização",
        content: (
          <>
            <p>
              Aplica-se a lei portuguesa, sem prejuízo das normas imperativas que protejam quem
              utiliza ou contrata um serviço. A competência dos tribunais segue as regras legais
              aplicáveis; não é imposto aqui um foro exclusivo que retire direitos ao consumidor.
            </p>
            <p>
              A informação sobre reclamações e resolução alternativa de litígios está no{" "}
              <a href="/aviso-legal#consumo">aviso legal</a>. Estes termos podem ser atualizados
              para alterações do site, com a data indicada nesta página. As condições de um contrato
              já celebrado só se alteram de acordo com esse contrato e a lei.
            </p>
          </>
        ),
      },
    ],
  },
  cookies: {
    title: "Cookies e preferências",
    intro:
      "Um inventário claro do que esta aplicação guarda no navegador e dos controlos que estão disponíveis.",
    sections: [
      {
        id: "utilizacao",
        title: "1. O que esta versão utiliza",
        content: (
          <>
            <p>
              O código da aplicação não define cookies HTTP de analítica, publicidade ou rastreio.
              Não incorpora ferramentas de medição, redes publicitárias nem conteúdos de terceiros
              que exijam aceitação para serem carregados. A preferência visual é guardada em
              armazenamento local, que é uma tecnologia diferente de um cookie, mas também deve ser
              explicado.
            </p>
            <p>
              Esta política descreve a aplicação. A proteção de acesso a uma preview e a
              infraestrutura de alojamento podem acrescentar mecanismos técnicos de autenticação ou
              segurança, dependentes da configuração do fornecedor. Esses mecanismos não constituem
              autorização para carregar publicidade ou analítica. Consulte também a{" "}
              {link(
                "https://vercel.com/legal/privacy-notice",
                "informação do fornecedor de alojamento",
              )}
              .
            </p>
          </>
        ),
      },
      {
        id: "inventario",
        title: "2. Inventário de armazenamento",
        content: (
          <section
            className="legal-table-wrap"
            // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users must be able to scroll the complete storage table.
            tabIndex={0}
            aria-label="Inventário de armazenamento, com deslocação horizontal quando necessário"
          >
            <table>
              <caption>Armazenamento do código atual da aplicação</caption>
              <thead>
                <tr>
                  <th>Elemento</th>
                  <th>Finalidade e conteúdo</th>
                  <th>Duração</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>orchestr-theme</code>
                  </td>
                  <td>
                    Armazenamento local. Guarda apenas <code>light</code> ou <code>dark</code>{" "}
                    quando escolhe um tema. Não contém um identificador de visitante.
                  </td>
                  <td>Até ser alterado, removido ou apagado pelo navegador.</td>
                </tr>
                <tr>
                  <td>
                    <code>theme</code>
                  </td>
                  <td>
                    Chave antiga, consultada apenas por compatibilidade quando a preferência atual
                    não existe. A interface atual grava a chave acima.
                  </td>
                  <td>Até ser removida ou apagada pelo navegador.</td>
                </tr>
                <tr>
                  <td>Campos do formulário</td>
                  <td>
                    Memória temporária da página. Nome, email, assunto e mensagem, sem envio nesta
                    preview.
                  </td>
                  <td>
                    Até atualizar ou fechar a página. Cópias ou ficheiros guardados pelo utilizador
                    permanecem no dispositivo.
                  </td>
                </tr>
                <tr>
                  <td>Etapas e movimento</td>
                  <td>
                    Estado temporário da interface. Exemplo selecionado, etapa, pausa e menu aberto.
                  </td>
                  <td>Até atualizar ou fechar a página.</td>
                </tr>
              </tbody>
            </table>
          </section>
        ),
      },
      {
        id: "preferencias",
        title: "3. Gerir a preferência do tema",
        content: (
          <>
            <p>
              Pode alternar o tema no cabeçalho. Para remover a escolha guardada e voltar à
              preferência do sistema operativo, use o controlo abaixo. A ação remove exclusivamente
              as duas chaves de tema indicadas no inventário.
            </p>
            <CookiePreferences />
          </>
        ),
      },
      {
        id: "consentimento",
        title: "4. Consentimento e ferramentas opcionais",
        content: (
          <>
            <p>
              Não é apresentado um banner para aceitar analítica ou publicidade porque esses
              recursos não estão instalados na aplicação. Guardar o tema responde a uma escolha
              expressa de apresentação. As regras de acesso ao equipamento terminal constam do
              artigo 5.º da Lei n.º 41/2004.
            </p>
            <p>
              Se forem introduzidas tecnologias opcionais, o inventário terá de identificar
              fornecedor, finalidade e duração e o respetivo carregamento deverá respeitar o
              consentimento exigível, com opção de recusa e alteração. Nesta versão, não existem
              categorias opcionais ativas nem um botão que finja desligá-las.
            </p>
          </>
        ),
      },
      {
        id: "navegador",
        title: "5. Controlos do navegador",
        content: (
          <p>
            As definições de privacidade do navegador permitem consultar ou apagar dados deste site,
            bloquear armazenamento e gerir preenchimento automático. Se o armazenamento estiver
            bloqueado, o tema continua a poder mudar durante a visita, mas pode não ser recordado.
            As preferências de movimento e transparência reduzidos são respeitadas quando suportadas
            pelo sistema e pelo navegador.
          </p>
        ),
      },
      {
        id: "contactos",
        title: "6. Mais informação e atualização",
        content: (
          <>
            <p>
              A relação entre navegação, alojamento e dados pessoais está na{" "}
              <a href="/privacidade">política de privacidade</a>. A identificação e os contactos do
              titular constam no <a href="/aviso-legal">aviso legal</a>. Esta página deve ser
              atualizada antes de mudar as ferramentas de armazenamento ou medição.
            </p>
            <p>
              Fontes:{" "}
              {link(
                "https://diariodarepublica.pt/dr/detalhe/lei/41-2004-480710",
                "Lei n.º 41/2004",
              )}
              ;{" "}
              {link(
                "https://www.cnpd.pt/media/x2zdus50/nota-informativa-cnpd_cookies_20210625.pdf",
                "nota da CNPD sobre cookies",
              )}
              .
            </p>
          </>
        ),
      },
    ],
  },
  "aviso-legal": {
    title: "Aviso legal",
    intro:
      "Identificação do site, informação comercial e meios de reclamação e resolução de litígios.",
    sections: [
      {
        id: "identificacao",
        title: "1. Identificação",
        content: (
          <>
            <dl className="legal-identity">
              <div>
                <dt>Designação do site</dt>
                <dd>Orchestr</dd>
              </div>
              <div>
                <dt>Titular / denominação</dt>
                <dd>{legalOperator.name || "Não aplicável nesta fase de demonstração"}</dd>
              </div>
              <div>
                <dt>NIF / NIPC</dt>
                <dd>{legalOperator.taxId || "Não aplicável nesta fase de demonstração"}</dd>
              </div>
              <div>
                <dt>Morada profissional</dt>
                <dd>{legalOperator.address || "Não aplicável nesta fase de demonstração"}</dd>
              </div>
              <div>
                <dt>Registo público, quando aplicável</dt>
                <dd>
                  {legalOperator.registry ||
                    "Não aplicável à demonstração; a definir antes da ativação comercial"}
                </dd>
              </div>
              <div>
                <dt>Email de contacto</dt>
                <dd>{legalOperator.email || `${site.email} — exemplo sem receção de pedidos`}</dd>
              </div>
            </dl>
            <p>
              O site apresenta {founder.name} como fundador e pessoa de contacto. Essa apresentação
              não permite presumir uma sociedade, identificação fiscal, sede ou registo que não
              tenham sido confirmados.
            </p>
          </>
        ),
      },
      {
        id: "atividade",
        title: "2. Atividade e informação comercial",
        content: (
          <p>
            São apresentados serviços de software à medida, automação, integrações, sites e lojas.
            Os valores são indicativos, sem IVA, e não permitem compra automática. A contratação
            depende de proposta escrita. Consulte os <a href="/termos">termos de utilização</a> para
            o âmbito das demonstrações e da informação comercial.
          </p>
        ),
      },
      {
        id: "consumo",
        title: "3. Reclamações e litígios de consumo",
        content: (
          <>
            <p>
              O fornecimento de serviços a consumidores pode implicar informação e meios específicos
              de reclamação e resolução alternativa de litígios. A aplicação concreta depende da
              atividade, estabelecimento e enquadramento do titular. Não há contratação nesta
              demonstração; esses elementos serão definidos para a atividade comercial.
            </p>
            <dl className="legal-identity">
              <div>
                <dt>Livro de Reclamações</dt>
                <dd>
                  {legalOperator.complaintsUrl
                    ? link(legalOperator.complaintsUrl, "Aceder ao Livro de Reclamações")
                    : "Não aplicável à demonstração; a definir para a atividade comercial"}
                </dd>
              </div>
              <div>
                <dt>Entidade RAL competente / adesão</dt>
                <dd>
                  {legalOperator.adrName ||
                    "Não aplicável à demonstração; a definir para a atividade comercial"}
                  {legalOperator.adrUrl && (
                    <> — {link(legalOperator.adrUrl, "Consultar entidade")}</>
                  )}
                </dd>
              </div>
            </dl>
            <p>
              Informação oficial:{" "}
              {link("https://www.livroreclamacoes.pt/INICIO/", "portal do Livro de Reclamações")} e{" "}
              {link(
                "https://www.gov.pt/guias/resolucao-de-conflitos-de-consumo",
                "guia de resolução de conflitos de consumo",
              )}
              . A ligação ao portal não afirma que este prestador já esteja registado ou que adira a
              uma entidade específica.
            </p>
            <p>
              A antiga plataforma europeia ODR foi descontinuada em 20 de julho de 2025. Não é usada
              como canal de reclamação deste site. Consulte a{" "}
              {link(
                "https://consumer-redress.ec.europa.eu/dispute-resolution-bodies",
                "lista europeia atual de entidades de resolução de litígios",
              )}
              .
            </p>
          </>
        ),
      },
      {
        id: "alojamento",
        title: "4. Alojamento e desenvolvimento",
        content: (
          <p>
            A preview é disponibilizada através da Vercel. O desenvolvimento é creditado a{" "}
            {link("https://strict-dev.com/", "Strict.Dev")}. O crédito técnico não substitui a
            identificação do titular nem transfere para o estúdio as obrigações do responsável pelo
            site.
          </p>
        ),
      },
      {
        id: "documentos",
        title: "5. Outros documentos",
        content: (
          <p>
            <a href="/privacidade">Privacidade</a>; <a href="/termos">termos de utilização</a>;{" "}
            <a href="/cookies">cookies e preferências</a>;{" "}
            <a href="/acessibilidade">informação de acessibilidade</a>. Estes documentos descrevem a
            versão atual e devem acompanhar alterações da atividade e das funcionalidades.
          </p>
        ),
      },
      {
        id: "enquadramento",
        title: "Fontes e enquadramento",
        content: (
          <p>
            {link(
              "https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2004-73199154-73197494",
              "Artigo 10.º do Decreto-Lei n.º 7/2004",
            )}
            ;{" "}
            {link(
              "https://diariodarepublica.pt/dr/detalhe/lei/144-2015-70215248",
              "Lei n.º 144/2015",
            )}
            ;{" "}
            {link(
              "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R3228",
              "Regulamento (UE) 2024/3228",
            )}
            . A identificação e o enquadramento aplicáveis devem ser atualizados antes da ativação
            comercial.
          </p>
        ),
      },
    ],
  },
  acessibilidade: {
    title: "Informação de acessibilidade",
    intro:
      "Recursos disponíveis para navegar, ler e explorar as demonstrações de forma confortável.",
    sections: [
      {
        id: "navegacao",
        title: "1. Navegação e leitura",
        content: (
          <p>
            O site inclui uma ligação para saltar para o conteúdo, títulos organizados, controlos
            com nomes acessíveis, indicação de foco e navegação por teclado. O menu móvel permite
            fechar com Escape e contém o foco enquanto está aberto. Os separadores das demos aceitam
            setas, Home e End; o seletor do formulário permite setas, pesquisa por letras, Enter,
            Escape e Tab.
          </p>
        ),
      },
      {
        id: "movimento",
        title: "2. Movimento e apresentação",
        content: (
          <p>
            Pode pausar as animações no controlo geral do hero e selecionar manualmente as etapas
            das demos. A preferência de movimento reduzido do sistema desativa a reprodução
            automática. O tema claro/escuro pode ser alternado no cabeçalho. A preferência de
            transparência reduzida utiliza superfícies opacas quando suportada pelo navegador.
          </p>
        ),
      },
      {
        id: "estado",
        title: "3. Estado da avaliação",
        content: (
          <p>
            Foram efetuadas verificações automáticas de acessibilidade e testes de teclado, toque e
            diferentes dimensões de ecrã nesta preview. A verificação automática não substitui uma
            avaliação manual com tecnologias de apoio; esta página não declara uma certificação ou
            conformidade integral com um referencial. O conteúdo é revisto à medida que a interface
            evolui.
          </p>
        ),
      },
      {
        id: "apoio",
        title: "4. Comunicar dificuldades",
        content: (
          <p>
            Se encontrar uma barreira, indique a página, o controlo, o navegador e a tecnologia de
            apoio utilizados, sem incluir informação sensível. Para o efeito, utilize o {contact}. A
            identificação do titular está no <a href="/aviso-legal">aviso legal</a>.
          </p>
        ),
      },
    ],
  },
};
