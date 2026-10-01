import { Check } from "lucide-react";
import { type Brand, BrandIcon } from "@/components/brand/BrandIcon";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { delay } from "@/lib/delay";
import { contactHref, site, whatsappHref } from "@/lib/site";

const TAKEAWAYS = [
  "As tarefas que mais tempo lhe tiram, por ordem",
  "Que ferramentas ligamos e como fica o fluxo",
  "Uma proposta com preço fechado e prazo",
];

const FLOATERS: { brand: Brand; className: string; r: string; dur: string }[] = [
  { brand: "excel", className: "-top-7 -left-6", r: "-5deg", dur: "6.5s" },
  { brand: "googleCalendar", className: "-top-8 right-10", r: "6deg", dur: "6s" },
  { brand: "whatsapp", className: "-right-5 -bottom-6", r: "4deg", dur: "7s" },
];

export function Cta() {
  const whatsapp = whatsappHref();
  return (
    <section
      id="contacto"
      data-loop
      aria-labelledby="contacto-title"
      className="px-3 pb-3 sm:px-4 sm:pb-4"
    >
      <div className="relative overflow-hidden rounded-[32px] bg-night text-white">
        {/* Static light: no animation cost. */}
        <div className="pointer-events-none absolute -top-40 -left-32 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(31_111_74/0.55),transparent)]" />
        <div className="pointer-events-none absolute -right-40 -bottom-48 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(242_179_61/0.14),transparent)]" />

        <Container className="relative grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <div data-reveal>
            <p className="inline-flex items-center gap-2 text-[13.5px] font-semibold tracking-wide text-mint uppercase">
              <span className="size-2.5 rounded-[3px] bg-mint" />
              Próximo passo
            </p>
            <h2
              id="contacto-title"
              className="mt-4 text-[40px] leading-[1.02] font-semibold tracking-[-0.04em] sm:text-[62px]"
            >
              Que tarefa gostava de nunca mais fazer?
            </h2>
            <p className="mt-6 max-w-[34rem] text-[18px] leading-[1.6] text-white/70">
              Diga-nos qual é. Numa conversa de 30 minutos mostramos como a automatizar e por onde
              faz sentido começar.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <LinkButton href={contactHref()} variant="light" size="lg" arrow>
                {site.cta}
              </LinkButton>
              {whatsapp && (
                <LinkButton
                  href={whatsapp}
                  variant="line"
                  size="lg"
                  className="text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.25)] hover:bg-white/10"
                >
                  Falar no WhatsApp
                </LinkButton>
              )}
            </div>
            <p className="mt-4 text-[14px] text-white/50">{site.ctaNote}</p>
          </div>

          <div data-reveal style={delay(120)} className="relative">
            {FLOATERS.map((f) => (
              <span
                key={f.brand}
                aria-hidden
                className={`absolute z-10 hidden sm:block ${f.className}`}
              >
                <span
                  className="grid size-14 animate-bob place-items-center rounded-2xl bg-white/95 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)]"
                  style={{ ["--r" as string]: f.r, animationDuration: f.dur }}
                >
                  <BrandIcon brand={f.brand} className="size-7" />
                </span>
              </span>
            ))}
            <div data-spot className="card p-7 text-ink">
              <p className="text-[13px] font-semibold tracking-wide text-brand uppercase">
                Diagnóstico gratuito
              </p>
              <p className="mt-2 text-[22px] font-semibold tracking-[-0.02em]">
                O que leva desta conversa
              </p>
              <ul className="seq mt-5 flex flex-col gap-3.5">
                {TAKEAWAYS.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15.5px] text-ink-2">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
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
