import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { contactHref, site, whatsappHref } from "@/lib/site";
import { CtaLines } from "./CtaLines";

export function FinalCta() {
  const whatsapp = whatsappHref();
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="relative overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-center sm:px-16 sm:py-24">
        <div className="bg-dots-dark absolute inset-0" aria-hidden />
        <CtaLines />
        {/* Radial gradient instead of a large blurred layer: same glow, no blur cost. */}
        <div
          className="absolute inset-0 bg-[radial-gradient(45%_55%_at_50%_0%,rgb(91_91_240/0.38),transparent_70%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-[34px] leading-[1.05] font-semibold tracking-[-0.04em] text-white sm:text-[52px]">
            Que tarefa gostava de nunca mais fazer?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/70">
            Conte-nos como trabalha. Numa conversa de 30 minutos dizemos-lhe o que pode ser
            automatizado e por onde faz sentido começar.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={contactHref()} variant="inverse" arrow>
              {site.cta}
            </Button>
            {whatsapp && (
              <Button href={whatsapp} variant="ghost-dark">
                Falar no WhatsApp
              </Button>
            )}
          </div>
          <p className="mt-5 text-[13px] text-white/60">{site.ctaNote}</p>
        </div>
      </Reveal>
    </section>
  );
}
