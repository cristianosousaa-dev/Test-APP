import { OrchestrMark } from "@/components/brand/OrchestrLogo";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { delay } from "@/lib/delay";
import { contactHref, site, whatsappHref } from "@/lib/site";

const INCLUDES = [
  "Levantamento dos processos com maior impacto",
  "Sistemas a integrar e desenho do fluxo",
  "Proposta com preço fixo e prazo definido",
];

/* A rising line across the panel, drawn by the scroll. Decorative. */
const LINE = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    pts.push(
      `${(t * 100).toFixed(2)} ${(92 - (t * t * 0.55 + t * 0.35) * 80 + Math.sin(i) * 0.8).toFixed(2)}`,
    );
  }
  return `M${pts.join("L")}`;
})();

export function Cta() {
  const whatsapp = whatsappHref();
  return (
    <section
      id="contacto"
      data-loop
      aria-labelledby="contacto-title"
      className="relative overflow-x-clip pt-8 pb-3 sm:pb-4"
    >
      <Container>
        <div data-reveal="scale" className="panel-navy">
          {/* Construction grid on navy. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="rule-x rule-light absolute inset-x-0 top-[22%]" />
            <div className="rule-x rule-light absolute inset-x-0 top-[78%]" />
            <div className="rule-y rule-light absolute inset-y-0 left-[58%] hidden lg:block" />
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="line-draw-scroll absolute inset-x-0 bottom-0 h-[70%] w-full"
            >
              <path
                d={LINE}
                fill="none"
                stroke="rgb(255 255 255 / 0.55)"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="absolute top-1/2 right-[-6%] hidden -translate-y-1/2 opacity-[0.07] lg:block">
              <OrchestrMark className="size-[560px] animate-orbit" id="orx-cta-orbit" />
            </div>
          </div>
          <span aria-hidden className="marker top-0 left-0" />

          <div className="grid grid-cols-1 gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:gap-0 lg:px-14">
            <div className="lg:pr-14">
              <p className="flex items-center gap-3">
                <span className="badge badge-light">09</span>
                <span className="label text-white/70">Próximo passo</span>
              </p>
              <h2
                id="contacto-title"
                data-reveal="mask"
                className="display mt-8 text-[clamp(40px,5.4vw,76px)] text-white"
              >
                Comece por um diagnóstico gratuito.
              </h2>
              <p className="mt-6 max-w-[32rem] text-[17px] leading-[1.6] text-white/75">
                Em 30 minutos analisamos os seus processos, identificamos as oportunidades de
                automação e indicamos por onde começar.
              </p>
              <div className="mt-10 flex flex-col gap-[2px] sm:flex-row sm:flex-wrap">
                <LinkButton href={contactHref()} variant="light" size="lg">
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
              <p className="mt-5 font-mono text-[11px] tracking-[0.04em] text-white/55">
                {site.ctaNote}
              </p>
            </div>

            <div className="lg:pl-14">
              <p className="label text-white/60">O que inclui</p>
              <ul className="mt-6 flex flex-col">
                {INCLUDES.map((t, i) => (
                  <li
                    key={t}
                    data-reveal="right"
                    style={{ ...delay(i * 120), ["--i" as string]: i }}
                    className="relative flex items-start gap-4 py-5 text-[16px] text-white/85"
                  >
                    <span aria-hidden className="rule-x rule-light absolute inset-x-0 top-0" />
                    <span className="badge badge-light mt-0.5 shrink-0">0{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
