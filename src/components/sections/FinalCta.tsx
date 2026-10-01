import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { contactHref, site, whatsappHref } from "@/lib/site";

const lines = [
  "M -10 70 C 40 70, 60 30, 110 30",
  "M -10 50 C 30 50, 70 75, 110 75",
  "M -10 85 C 50 85, 55 55, 110 55",
];

export function FinalCta() {
  const whatsapp = whatsappHref();
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="relative overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-center sm:px-16 sm:py-24">
        <div className="bg-dots-dark absolute inset-0" aria-hidden />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full opacity-40"
          aria-hidden
          role="presentation"
        >
          {lines.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="url(#cta-gradient)"
              strokeWidth="0.35"
              strokeDasharray="2 1.5"
              className="animate-dash"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <defs>
            <linearGradient id="cta-gradient" x1="0" x2="1">
              <stop offset="0%" stopColor="#5b5bf0" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div
          className="absolute -top-40 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-accent/35 blur-[120px]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-[34px] leading-[1.05] font-semibold tracking-[-0.04em] text-white sm:text-[52px]">
            Que tarefa gostava de nunca mais fazer?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/65">
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
          <p className="mt-5 text-[13px] text-white/45">{site.ctaNote}</p>
        </div>
      </Reveal>
    </section>
  );
}
