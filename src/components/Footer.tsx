import { type Brand, BrandIcon, brandLabel } from "@/components/brand/BrandIcon";
import { OrchestrLogo } from "@/components/brand/OrchestrLogo";
import { Container } from "@/components/ui/Container";
import { contactHref, nav, site } from "@/lib/site";

const INTEGRATIONS: Brand[] = [
  "whatsapp",
  "gmail",
  "outlook",
  "googleCalendar",
  "excel",
  "stripe",
  "hubspot",
  "shopify",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-16">
      <Container>
        <div className="relative grid gap-12 pt-10 pb-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
          <div data-draw="x" aria-hidden className="rule-x absolute inset-x-0 top-0" />
          <span data-pop aria-hidden className="marker -top-[3px] -left-[3px]" />
          <div className="max-w-[24rem]">
            <a href="#top" aria-label={`${site.name}, voltar ao início`} className="inline-block">
              <OrchestrLogo tone="on-light" className="h-[26px]" id="orx-footer" />
            </a>
            <p className="mt-5 text-[15px] leading-[1.65] text-fg-2">
              Automação de processos à medida para pequenas e médias empresas, integrada nos
              sistemas que já utiliza.
            </p>
            <ul className="mt-6 flex flex-wrap gap-[2px]" aria-label="Algumas integrações">
              {INTEGRATIONS.map((b) => (
                <li
                  key={b}
                  title={brandLabel(b)}
                  className="grid size-9 place-items-center bg-tile grayscale transition-[filter,background-color] duration-300 hover:bg-white hover:grayscale-0"
                >
                  <BrandIcon brand={b} className="size-[18px]" />
                  <span className="sr-only">{brandLabel(b)}</span>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Rodapé">
            <p className="label text-fg-3">Navegação</p>
            <ul className="mt-5 flex flex-col gap-[2px]">
              {nav.map((n, i) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="group flex items-center justify-between bg-tile px-4 py-3 text-[15px] transition-colors duration-300 hover:bg-fg hover:text-white"
                  >
                    {n.label}
                    <span className="font-mono text-[10.5px] text-fg-3 transition-colors group-hover:text-white/60">
                      0{i + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="label text-fg-3">Contacto</p>
            <ul className="mt-5 flex flex-col gap-3 text-[15px]">
              <li>
                <a
                  href={contactHref()}
                  className="underline decoration-hair-2 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-fg-2">Portugal</li>
              <li>
                <a
                  href={contactHref()}
                  className="group label inline-flex items-center gap-2 text-[11.5px] text-accent"
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
        <div className="relative flex flex-col justify-between gap-3 pt-6 font-mono text-[11px] tracking-[0.02em] text-fg-3 sm:flex-row">
          <div aria-hidden className="rule-x absolute inset-x-0 top-0" />
          <p>© 2026 {site.name}. Todos os direitos reservados.</p>
          <p>Os exemplos nesta página são ilustrativos.</p>
        </div>
      </Container>
      {/* Oversized wordmark, cropped by the page edge: a quiet signature. */}
      <div aria-hidden className="pointer-events-none mt-16 -mb-[3.5vw] px-5 select-none sm:px-7">
        <OrchestrLogo
          tone="on-light"
          className="mx-auto h-auto w-full max-w-[1360px] opacity-[0.07]"
          id="orx-footer-xl"
        />
      </div>
    </footer>
  );
}
