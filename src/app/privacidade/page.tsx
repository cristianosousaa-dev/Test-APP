import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como a ${site.name} trata os dados pessoais enviados através deste site.`,
  alternates: { canonical: "/privacidade" },
};

/*
 * Describes what the site actually does today: no forms posted to a server, no cookies, no
 * analytics. TODO: add the controller's legal name, NIF and address before launch.
 */
export default function Privacidade() {
  return (
    <main id="conteudo" className="py-24 sm:py-32">
      <Container>
        <div className="max-w-[44rem]">
          <a href="/" className="label text-[11px] text-accent">
            ← Voltar
          </a>
          <h1 className="h2 mt-8">Política de privacidade</h1>
          <div className="mt-10 space-y-6 text-[16px] leading-[1.7] text-fg-2">
            <p>
              Este site não utiliza cookies, ferramentas de análise nem formulários que enviem dados
              para os nossos servidores.
            </p>
            <p>
              Quando descreve uma tarefa e pede uma proposta, o site abre o seu programa de email
              (ou o WhatsApp) com a mensagem já escrita. Os dados só nos chegam se decidir enviar
              essa mensagem e são usados apenas para responder ao seu pedido.
            </p>
            <p>
              Conservamos a correspondência enquanto for necessária para preparar a proposta e
              acompanhar o projeto. Pode pedir, a qualquer momento, o acesso, a retificação ou a
              eliminação dos seus dados através de{" "}
              <a className="text-fg underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              . Tem ainda o direito de apresentar reclamação à Comissão Nacional de Proteção de
              Dados (CNPD).
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
