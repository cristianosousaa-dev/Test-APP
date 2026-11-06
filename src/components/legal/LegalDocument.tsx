import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { OrchestrLogo } from "@/components/brand/OrchestrLogo";
import { ThemeSwitch } from "@/components/experience/ThemeSwitch";
import { type LegalSlug, legalLinks, legalReady, legalUpdated } from "@/lib/legal/config";
import { legalDocuments } from "@/lib/legal/content";

export const legalMetadata = (slug: LegalSlug): Metadata => ({
  title: legalDocuments[slug].title,
  description: legalDocuments[slug].intro,
  alternates: { canonical: `/${slug}` },
});

export function LegalDocument({ slug }: { slug: LegalSlug }) {
  const doc = legalDocuments[slug];
  return (
    <div className="legal-shell">
      <header className="legal-header">
        <a className="legal-brand" href="/" aria-label="Orchestr — início">
          <OrchestrLogo id={`legal-${slug}`} />
        </a>
        <a className="legal-back" href="/">
          <ArrowLeft size={14} />
          Voltar ao site
        </a>
        <ThemeSwitch />
      </header>
      <main id="conteudo" className="legal-main">
        <div className="legal-heading">
          <p className="eyebrow">ORCHESTR · INFORMAÇÃO LEGAL</p>
          <h1>{doc.title}</h1>
          <p>{doc.intro}</p>
          <span>Atualizado em {legalUpdated}</span>
        </div>
        <nav className="legal-document-nav" aria-label="Documentos legais">
          {legalLinks.map((item) => (
            <a
              key={item.slug}
              href={`/${item.slug}`}
              aria-current={item.slug === slug ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        {!legalReady && (
          <div className="legal-preview-note">
            <strong>Informação da versão de preview</strong>
            <p>
              Os dados comerciais não são aplicáveis nesta fase de demonstração. Não são concluídas
              contratações nem enviados pedidos neste site. A identificação e o enquadramento do{" "}
              <a href="/aviso-legal">aviso legal</a> serão atualizados antes da ativação comercial.
              O endereço de exemplo não recebe pedidos.
            </p>
          </div>
        )}
        <div className="legal-content-layout">
          <aside>
            <nav aria-label="Índice desta página">
              <span>NESTA PÁGINA</span>
              {doc.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.title.replace(/^\d+\.\s/, "")}
                </a>
              ))}
            </nav>
          </aside>
          <article>
            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                {section.content}
              </section>
            ))}
          </article>
        </div>
        <footer className="legal-footer">
          <p>© {new Date().getFullYear()} Orchestr</p>
          <a href="/">
            Voltar à Orchestr
            <ArrowUpRight size={13} />
          </a>
        </footer>
      </main>
    </div>
  );
}
