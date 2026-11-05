import { SYMBOL } from "@/components/brand/orchestr-paths";
import { HeroScore } from "@/components/sections/HeroScore";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollDepth } from "@/components/ui/ScrollDepth";
import { delay } from "@/lib/delay";
import { FLAT, HERO_AWAY } from "@/lib/depth";
import { proposalHref, site } from "@/lib/site";

const FACTS = [
  "Desenvolvido à sua medida",
  "Protótipo antes de pagar",
  "Manutenção e suporte incluídos",
];

/* One promise, one action, one picture: a request crossing the company as a score that plays. */
export function Hero() {
  return (
    <section
      id="top"
      data-loop
      className="night hero-solid relative isolate -mt-[76px] overflow-hidden pt-[124px] pb-16 sm:pt-[148px] sm:pb-20 lg:pt-[160px] lg:pb-24"
    >
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-end lg:gap-16">
          <div className="relative z-10">
            <p data-rise className="kicker-n">
              Orchestr · Software, automação e sites para PME
            </p>
            <h1
              data-rise="mask"
              style={delay(80)}
              className="display mt-6 text-[clamp(44px,6.4vw,104px)] text-strong"
            >
              Orchestr, <span className="text-accent-hi">o futuro da sua empresa.</span>
            </h1>
          </div>

          <div className="relative z-10">
            {/* The symbol, very large and very faint, still, behind everything (a watermark). */}
            <div aria-hidden className="hero-wm">
              <div className="hero-wm-spin">
                <svg aria-hidden="true" viewBox="0 0 32 32" className="size-full">
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={SYMBOL.stroke}
                    strokeLinecap="round"
                  >
                    {SYMBOL.arcs.map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </g>
                  <circle
                    cx={SYMBOL.dot.cx}
                    cy={SYMBOL.dot.cy}
                    r={SYMBOL.dot.r}
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            <p
              data-rise
              style={delay(200)}
              className="max-w-[34rem] text-[18px] leading-[1.6] text-nmute"
            >
              Desenvolvemos software, automação e sites que coordenam pessoas, processos e
              programas. Menos horas perdidas, mais controlo e novas oportunidades de negócio. Antes
              de pagar, pode ver um protótipo com os seus dados.
            </p>
            <div
              data-rise
              style={delay(280)}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7"
            >
              <LinkButton href={proposalHref} variant="light" size="lg" className="sm:w-auto">
                {site.cta}
              </LinkButton>
              <a
                href="#conversao"
                className="group inline-flex items-center gap-2 py-2 text-[15px] text-strong underline decoration-nline-2 underline-offset-[6px] transition-colors hover:decoration-accent-hi"
              >
                Ver como funciona
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out-soft group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>

        <div data-rise style={delay(320)} className="relative z-10 mt-14 sm:mt-16 lg:mt-20">
          <ScrollDepth
            trigger="#top"
            start="top top"
            end="bottom 25%"
            origin="50% 100%"
            from={FLAT}
            to={HERO_AWAY}
          >
            <HeroScore />
          </ScrollDepth>
        </div>

        <ul
          data-rise
          style={delay(400)}
          className="kicker-n relative z-10 mt-10 flex flex-col gap-2 text-[10.5px] sm:flex-row sm:gap-8"
        >
          {FACTS.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <span aria-hidden className="size-1.5 bg-accent-hi" />
              {f}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
