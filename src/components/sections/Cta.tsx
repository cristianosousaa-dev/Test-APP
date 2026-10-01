import { Check } from "lucide-react";
import { type Brand, BrandIcon } from "@/components/brand/BrandIcon";
import { OrchestrMark } from "@/components/brand/OrchestrLogo";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { delay } from "@/lib/delay";
import { contactHref, site, whatsappHref } from "@/lib/site";

const TAKEAWAYS = [
  "Levantamento dos processos com maior impacto",
  "Sistemas a integrar e desenho do fluxo",
  "Proposta com preço fixo e prazo definido",
];

const FLOATERS: { brand: Brand; className: string; dur: string }[] = [
  { brand: "googleCalendar", className: "-top-7 -left-6", dur: "6.5s" },
  { brand: "whatsapp", className: "-top-8 right-8", dur: "6s" },
  { brand: "gmail", className: "-right-5 -bottom-7", dur: "7s" },
];

export function Cta() {
  const whatsapp = whatsappHref();
  return (
    <section
      id="contacto"
      data-loop
      aria-labelledby="contacto-title"
      className="px-3 pt-8 pb-3 sm:px-4 sm:pb-4"
    >
      <div className="relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-base-2 shadow-[inset_0_0_0_1px_var(--color-hair)]">
        {/* Atmosphere: static light, a fine grid, and the symbol turning slowly. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 -left-40 -z-10 size-[640px] rounded-full bg-[radial-gradient(closest-side,rgb(61_224_160/0.22),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-48 -bottom-56 -z-10 size-[620px] rounded-full bg-[radial-gradient(closest-side,rgb(110_123_255/0.2),transparent)]"
        />
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-[72%] -z-10 hidden -translate-1/2 opacity-[0.05] lg:block"
        >
          <OrchestrMark className="size-[640px] animate-orbit" id="orx-cta-orbit" />
        </div>

        <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div data-reveal>
            <p className="kicker flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
              Próximo passo
            </p>
            <h2 id="contacto-title" className="display ink-sheen mt-5 text-[clamp(38px,6vw,68px)]">
              Comece por um diagnóstico gratuito.
            </h2>
            <p className="mt-6 max-w-[34rem] text-[18px] leading-[1.6] text-fg-2">
              Em 30 minutos analisamos os seus processos, identificamos as oportunidades de
              automação e indicamos por onde começar.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <LinkButton href={contactHref()} variant="accent" size="lg" arrow>
                {site.cta}
              </LinkButton>
              {whatsapp ? (
                <LinkButton href={whatsapp} variant="glass" size="lg">
                  Falar no WhatsApp
                </LinkButton>
              ) : (
                <LinkButton href="#exemplos" variant="glass" size="lg">
                  Ver casos de uso
                </LinkButton>
              )}
            </div>
            <p className="mt-5 font-mono text-[11.5px] tracking-[0.04em] text-fg-3">
              {site.ctaNote}
            </p>
          </div>

          <div data-reveal style={delay(120)} className="relative">
            {FLOATERS.map((f) => (
              <span
                key={f.brand}
                aria-hidden
                className={`absolute z-10 hidden sm:block ${f.className}`}
              >
                <span
                  className="grid size-14 animate-bob place-items-center rounded-2xl bg-white shadow-[0_20px_40px_-18px_rgb(0_0_0/0.8)]"
                  style={{ animationDuration: f.dur }}
                >
                  <BrandIcon brand={f.brand} className="size-7" />
                </span>
              </span>
            ))}
            <div className="glass rounded-[28px] p-7 sm:p-8">
              <p className="kicker !text-accent">Diagnóstico gratuito</p>
              <p className="mt-3 text-[22px] font-semibold tracking-[-0.02em] [font-stretch:106%]">
                O que inclui
              </p>
              <ul className="seq mt-6 flex flex-col gap-4">
                {TAKEAWAYS.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15.5px] text-fg-2">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
