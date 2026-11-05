import { type Brand, BrandIcon, brandLabel } from "@/components/brand/BrandIcon";
import { OrchestrLogo } from "@/components/brand/OrchestrLogo";
import { Container } from "@/components/ui/Container";
import { contactHref, nav, proposalHref, site } from "@/lib/site";

const INTEGRATIONS: Brand[] = [
  "excel",
  "outlook",
  "gmail",
  "whatsapp",
  "googleCalendar",
  "googleSheets",
  "stripe",
  "hubspot",
];

export function Footer() {
  return (
    <footer className="night relative overflow-hidden border-t border-nline pt-16">
      <Container>
        <div className="relative grid gap-12 pt-4 pb-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div className="max-w-[24rem]">
            <a href="#top" aria-label={`${site.name}, voltar ao início`} className="inline-block">
              <OrchestrLogo tone="on-light" className="h-[26px] dark:hidden" id="orx-footer-l" />
              <OrchestrLogo
                tone="on-dark"
                className="hidden h-[26px] dark:block"
                id="orx-footer-d"
              />
            </a>
            <p className="mt-5 text-[15px] leading-[1.65] text-nmute">
              Software, automação e sites desenvolvidos para pequenas e médias empresas.
            </p>
            <ul className="mt-6 flex flex-wrap gap-[2px]" aria-label="Algumas integrações">
              {INTEGRATIONS.map((b) => (
                <li
                  key={b}
                  title={brandLabel(b)}
                  className="grid size-9 place-items-center bg-nfill opacity-70 grayscale transition-[filter,opacity,background-color] duration-300 hover:bg-white hover:opacity-100 hover:grayscale-0"
                >
                  <BrandIcon brand={b} className="size-[18px]" />
                  <span className="sr-only">{brandLabel(b)}</span>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Rodapé">
            <p className="kicker-n">Navegação</p>
            <ul className="mt-5 flex flex-col gap-[2px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="flex items-center justify-between bg-nfill px-4 py-3 text-[15px] text-ntext transition-colors duration-300 hover:bg-fg hover:text-onfg"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="kicker-n">Contacto</p>
            <ul className="mt-5 flex flex-col gap-3 text-[15px]">
              <li>
                <a
                  href={contactHref()}
                  className="inline-block py-2 text-strong underline decoration-nline-2 underline-offset-4 transition-colors hover:decoration-accent-hi"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-nmute">Portugal</li>
              <li>
                <a
                  href={proposalHref}
                  className="group label inline-flex items-center gap-2 py-2.5 text-[11.5px] text-accent-hi"
                >
                  {site.cta}
                  <span className="transition-transform duration-300 ease-out-soft group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      {/* Oversized wordmark as the closing signature, shown whole, then the legal line. */}
      <Container>
        <div aria-hidden className="pointer-events-none mt-6 select-none sm:mt-10">
          <OrchestrLogo
            tone="on-light"
            className="h-auto w-full opacity-[0.06] dark:hidden"
            id="orx-footer-xl-l"
          />
          <OrchestrLogo
            tone="on-dark"
            className="hidden h-auto w-full opacity-[0.07] dark:block"
            id="orx-footer-xl-d"
          />
        </div>
        <div className="relative mt-8 flex flex-col justify-between gap-3 border-t border-nline pt-6 pb-8 font-mono text-[11px] tracking-[0.02em] text-nmute sm:flex-row sm:pb-6">
          <p>© 2026 {site.name}. Todos os direitos reservados.</p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <span>Os exemplos nesta página são ilustrativos.</span>
            <a
              href="#top"
              className="inline-block py-2 underline underline-offset-4 transition-colors hover:text-strong sm:py-0"
            >
              Voltar ao topo
            </a>
            <a
              href="/privacidade"
              className="inline-block py-2 underline underline-offset-4 transition-colors hover:text-strong sm:py-0"
            >
              Política de privacidade
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
