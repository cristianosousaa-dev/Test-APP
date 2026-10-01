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
    <footer className="relative overflow-hidden pt-20">
      <Container>
        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-[24rem]">
            <a href="#top" aria-label={`${site.name}, voltar ao início`} className="inline-block">
              <OrchestrLogo className="h-[28px]" id="orx-footer" />
            </a>
            <p className="mt-5 text-[15px] leading-[1.65] text-fg-2">
              Automação de processos à medida para pequenas e médias empresas, integrada nos
              sistemas que já utiliza.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Algumas integrações">
              {INTEGRATIONS.map((b) => (
                <li
                  key={b}
                  title={brandLabel(b)}
                  className="grid size-9 place-items-center rounded-xl bg-white/[0.05] shadow-[inset_0_0_0_1px_var(--color-hair)] grayscale transition-[transform,filter,background-color] duration-300 ease-out-soft hover:-translate-y-0.5 hover:bg-white hover:grayscale-0"
                >
                  <BrandIcon brand={b} className="size-[18px]" />
                  <span className="sr-only">{brandLabel(b)}</span>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Rodapé">
            <p className="kicker !text-fg-3">Navegação</p>
            <ul className="mt-5 flex flex-col gap-3 text-[15px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-fg-2 transition-colors hover:text-fg">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="kicker !text-fg-3">Contacto</p>
            <ul className="mt-5 flex flex-col gap-3 text-[15px]">
              <li>
                <a href={contactHref()} className="text-fg-2 transition-colors hover:text-fg">
                  {site.email}
                </a>
              </li>
              <li className="text-fg-2">Portugal</li>
              <li>
                <a
                  href={contactHref()}
                  className="group inline-flex items-center gap-2 font-medium text-accent transition-colors hover:text-accent-2"
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
        <div className="flex flex-col justify-between gap-3 border-t border-hair pt-6 font-mono text-[11.5px] tracking-[0.02em] text-fg-3 sm:flex-row">
          <p>© 2026 {site.name}. Todos os direitos reservados.</p>
          <p>Os exemplos nesta página são ilustrativos.</p>
        </div>
      </Container>
      {/* Oversized wordmark, cropped by the page edge: a quiet signature. */}
      <div aria-hidden className="pointer-events-none mt-16 -mb-[3.5vw] select-none px-3 sm:px-4">
        <OrchestrLogo
          className="mx-auto h-auto w-full max-w-[1400px] opacity-[0.06]"
          id="orx-footer-xl"
        />
      </div>
    </footer>
  );
}
