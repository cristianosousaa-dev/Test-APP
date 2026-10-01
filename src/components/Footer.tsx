import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { contactHref, nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-paper pt-16 pb-10">
      <Container>
        <div className="grid gap-10 border-b border-line pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-[22rem]">
            <a href="#top" aria-label={`${site.name}, início`} className="inline-block">
              <Logo />
            </a>
            <p className="mt-4 text-[15px] leading-[1.6] text-ink-2">
              Automações à medida para pequenas e médias empresas. Ligamos as ferramentas que já usa
              para que o trabalho repetitivo aconteça sozinho.
            </p>
          </div>
          <nav aria-label="Rodapé">
            <p className="text-[13px] font-semibold tracking-wide text-mute uppercase">Página</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-ink-2 transition-colors hover:text-ink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[13px] font-semibold tracking-wide text-mute uppercase">Contacto</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
              <li>
                <a href={contactHref()} className="text-ink-2 transition-colors hover:text-ink">
                  {site.email}
                </a>
              </li>
              <li className="text-ink-2">Portugal</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-6 text-[13.5px] text-mute sm:flex-row">
          <p>© 2026 {site.name}. Todos os direitos reservados.</p>
          <p>Os exemplos nesta página são ilustrativos.</p>
        </div>
      </Container>
    </footer>
  );
}
