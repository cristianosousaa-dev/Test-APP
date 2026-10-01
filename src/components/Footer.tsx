import { type Brand, BrandIcon, brandLabel } from "@/components/brand/BrandIcon";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
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
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Algumas integrações">
              {INTEGRATIONS.map((b) => (
                <li
                  key={b}
                  title={brandLabel(b)}
                  className="grid size-9 place-items-center rounded-xl bg-white shadow-[0_0_0_1px_var(--color-line)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <BrandIcon brand={b} className="size-[18px]" />
                  <span className="sr-only">{brandLabel(b)}</span>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Rodapé">
            <p className="text-[13px] font-semibold tracking-wide text-mute uppercase">Página</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-ink-2 underline-offset-4 transition-colors hover:text-brand hover:underline"
                  >
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
                <a
                  href={contactHref()}
                  className="text-ink-2 underline-offset-4 transition-colors hover:text-brand hover:underline"
                >
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
