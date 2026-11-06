import type { Metadata } from "next";
import { OrchestrLogo } from "@/components/brand/OrchestrLogo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como a ${site.name} trata os dados pessoais neste site.`,
  alternates: { canonical: "/privacidade" },
};

export default function Privacidade() {
  const isExample = site.email.endsWith("@example.com");
  return (
    <main id="conteudo" className="privacy-page">
      <div className="frame">
        <div className="privacy-header">
          <a href="/" aria-label="Orchestr — início">
            <OrchestrLogo id="privacy-logo" />
          </a>
          <a href="/">← Voltar ao site</a>
        </div>
        <article>
          <p className="eyebrow">ORCHESTR · PRIVACIDADE</p>
          <h1>
            Os seus dados.
            <br />
            Com clareza.
          </h1>
          <h2>O que este site guarda</h2>
          <p>
            Este site não utiliza cookies de publicidade, ferramentas de análise nem formulários que
            enviem dados para os nossos servidores. As demonstrações usam dados fictícios. Os
            separadores e as opções de movimento funcionam apenas no seu navegador. A preferência de
            tema claro ou escuro fica guardada neste navegador; os dados do formulário não são
            guardados.
          </p>
          <h2>Pedidos de contacto</h2>
          <p>
            {isExample
              ? "Este é um preview. O formulário prepara uma mensagem apenas no seu navegador, para poder rever e copiar. Nenhum pedido é enviado. Os campos não são guardados quando atualiza ou fecha a página."
              : "O formulário abre o seu programa de email com o pedido preenchido. Só recebemos os dados se decidir enviar a mensagem. Utilizamos essa correspondência para responder ao pedido e preparar a proposta."}
          </p>
          <h2>Serviços externos</h2>
          <p>
            As fontes e imagens são servidas pelo próprio site. Ao seguir uma ligação externa, como
            o LinkedIn, BOOKLIN ou Strict.Dev, aplicam-se as políticas de privacidade desse serviço.
            Ao copiar um pedido, o texto fica na área de transferência do seu dispositivo. Se optar
            por guardar o pedido, é descarregado um ficheiro de texto para o seu dispositivo.
          </p>
          <h2>Contacto</h2>
          <p>
            {isExample ? (
              <>
                O endereço <span>{site.email}</span> é meramente ilustrativo e não recebe pedidos
                neste preview.
              </>
            ) : (
              <>
                Pode pedir acesso, retificação ou eliminação dos dados enviados por email através de{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>. Conservamos a correspondência
                apenas pelo tempo necessário à resposta e ao acompanhamento do projeto.
              </>
            )}
          </p>
          <p>
            Tem o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD).
          </p>
        </article>
      </div>
    </main>
  );
}
