import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { contactHref, nav, site, whatsappHref } from "@/lib/site";

export function Closing() {
  const whatsapp = whatsappHref();
  return (
    <section id="contacto" className="pb-12">
      <Container>
        <Reveal className="rounded-[32px] bg-paper px-6 py-16 ring-1 ring-hair sm:px-14 sm:py-20">
          <div className="max-w-[44rem]">
            <h2 className="text-[34px] leading-[1.08] font-medium tracking-[-0.03em] sm:text-[52px]">
              Que tarefa gostava de nunca mais fazer?
            </h2>
            <p className="mt-5 max-w-[34rem] text-[17px] leading-[1.6] text-ink-2">
              Diga-nos qual é. Numa conversa de 30 minutos mostramos-lhe como a automatizar e por
              onde faz sentido começar.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <LinkButton href={contactHref()}>{site.cta}</LinkButton>
              {whatsapp && (
                <LinkButton href={whatsapp} variant="glass">
                  Falar no WhatsApp
                </LinkButton>
              )}
            </div>
            <p className="mt-5 text-[13.5px] text-mute">{site.ctaNote}</p>
          </div>
        </Reveal>

        <footer className="mt-16 flex flex-col gap-8 border-t border-hair pt-8 text-[14px] sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-[18rem]">
            <Logo />
            <p className="mt-3 text-mute">Automações à medida para pequenas e médias empresas.</p>
          </div>
          <nav aria-label="Rodapé" className="flex flex-col gap-2.5">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-ink-2 hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2.5">
            <a href={`mailto:${site.email}`} className="text-ink-2 hover:text-ink">
              {site.email}
            </a>
            <span className="text-mute">Portugal</span>
            <span className="text-mute">© 2026 {site.name}</span>
          </div>
        </footer>
      </Container>
    </section>
  );
}
