import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { HeroFlow } from "@/components/sections/HeroFlow";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { delay } from "@/lib/delay";
import { proposalHref, site } from "@/lib/site";

/* One statement, one action, one visual. The task form lives in the closing section. */
export function Hero() {
  return (
    <section
      id="top"
      data-loop
      className="relative isolate -mt-[76px] pt-[100px] pb-20 sm:pt-[124px] sm:pb-28 lg:pt-[136px] lg:pb-32"
    >
      <HeroBackdrop />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 pt-4 sm:pt-8 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] lg:gap-0 lg:pt-0">
          <div className="relative z-10 flex flex-col lg:pr-14">
            <p data-rise className="label text-[11px] text-fg-2">
              Automação de processos para PME em Portugal
            </p>
            <h1
              data-rise="mask"
              style={delay(80)}
              className="display mt-6 text-[clamp(42px,4.6vw,72px)]"
            >
              Quantas horas perde a sua equipa{" "}
              <span className="text-accent">em tarefas repetitivas?</span>
            </h1>
            <p
              data-rise
              style={delay(200)}
              className="mt-6 max-w-[32rem] text-[17.5px] leading-[1.6] text-fg-2"
            >
              A {site.name} automatiza o trabalho administrativo da sua empresa, nos programas que
              já utiliza. Preço fixo, acordado por escrito antes de começar.
            </p>
            <div
              data-rise
              style={delay(280)}
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7"
            >
              <LinkButton href={proposalHref} size="lg" className="sm:w-auto">
                {site.cta}
              </LinkButton>
              <a
                href="#exemplos"
                className="group inline-flex items-center gap-2 py-2 text-[15px] text-fg underline decoration-hair-2 underline-offset-[6px] transition-colors hover:decoration-accent"
              >
                Ver automações a funcionar
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out-soft group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </div>
          </div>

          <div data-rise style={delay(200)} className="relative z-10 lg:pl-6">
            <HeroFlow />
          </div>
        </div>
      </Container>
    </section>
  );
}
