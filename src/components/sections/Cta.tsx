import { Check } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { delay } from "@/lib/delay";
import { contactHref, site, whatsappHref } from "@/lib/site";

const TAKEAWAYS = [
  "As tarefas que mais tempo lhe tiram, por ordem",
  "Que ferramentas ligamos e como fica o fluxo",
  "Uma proposta com preço fechado e prazo",
];

export function Cta() {
  const whatsapp = whatsappHref();
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-[32px] bg-lime">
        {/* Static depth: two soft shapes, no animation. */}
        <div className="pointer-events-none absolute -top-32 -right-24 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.55),transparent)]" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 size-[380px] rounded-full bg-[radial-gradient(closest-side,rgb(14_15_18/0.08),transparent)]" />
        <Container className="relative grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
          <div data-reveal>
            <h2
              id="contacto-title"
              className="text-[40px] leading-[1.02] font-semibold tracking-[-0.04em] sm:text-[64px]"
            >
              Que tarefa gostava de nunca mais fazer?
            </h2>
            <p className="mt-6 max-w-[34rem] text-[18px] leading-[1.6] text-ink/75">
              Diga-nos qual é. Numa conversa de 30 minutos mostramos como a automatizar e por onde
              faz sentido começar.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <LinkButton href={contactHref()} variant="dark" size="lg" arrow>
                {site.cta}
              </LinkButton>
              {whatsapp && (
                <LinkButton href={whatsapp} variant="line" size="lg">
                  Falar no WhatsApp
                </LinkButton>
              )}
            </div>
            <p className="mt-4 text-[14px] text-ink/60">{site.ctaNote}</p>
          </div>

          <div data-reveal style={delay(120)} className="rounded-[28px] bg-night p-7 text-white">
            <p className="text-[13px] font-semibold tracking-wide text-lime uppercase">
              Diagnóstico gratuito
            </p>
            <p className="mt-2 text-[22px] font-semibold tracking-[-0.02em]">
              O que leva desta conversa
            </p>
            <ul className="mt-5 flex flex-col gap-3.5">
              {TAKEAWAYS.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15.5px] text-white/85">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </section>
  );
}
