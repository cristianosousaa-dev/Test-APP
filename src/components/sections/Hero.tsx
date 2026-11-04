import { HeroDemo } from "@/components/sections/HeroDemo";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemedShinyText } from "@/components/ui/ThemedReactBits";
import { delay } from "@/lib/delay";
import { proposalHref, site } from "@/lib/site";

const FACTS = ["Preço e prazo fixos", "Demonstração com os seus dados", "Manutenção incluída"];

/* One promise, one action, one picture: the application that replaces the spreadsheet. */
export function Hero() {
  return (
    <section
      id="top"
      data-loop
      className="night hero-solid relative isolate -mt-[76px] overflow-hidden pt-[124px] pb-20 sm:pt-[148px] sm:pb-28 lg:pt-[164px] lg:pb-32"
    >
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-8">
          <div className="relative z-10">
            <p data-rise className="kicker-n">
              <ThemedShinyText text="Software à medida para PME" speed={3.5} delay={1.2} />
            </p>
            <h1
              data-rise="mask"
              style={delay(80)}
              className="display mt-6 text-[clamp(44px,5.7vw,94px)] text-strong"
            >
              Do Excel e do papel a uma{" "}
              <span className="text-accent-hi">aplicação feita à medida.</span>
            </h1>
            <p
              data-rise
              style={delay(200)}
              className="mt-7 max-w-[34rem] text-[18px] leading-[1.6] text-nmute"
            >
              Desenhamos e construímos o software que o processo da sua empresa precisa, com prazo e
              preço fixos. Veja a aplicação a funcionar com os seus dados antes de decidir.
            </p>
            <div
              data-rise
              style={delay(280)}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7"
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
            <ul
              data-rise
              style={delay(360)}
              className="kicker-n mt-12 flex flex-col gap-2 text-[10.5px] sm:flex-row sm:gap-8"
            >
              {FACTS.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span aria-hidden className="size-1.5 bg-accent-hi" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div data-rise style={delay(240)} className="relative z-10">
            <HeroDemo />
          </div>
        </div>
      </Container>
    </section>
  );
}
