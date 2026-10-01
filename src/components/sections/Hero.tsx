import { HeroMotion } from "@/components/hero/HeroMotion";
import { HeroStage } from "@/components/hero/HeroStage";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { contactHref, site } from "@/lib/site";

const LINES: { words: string[]; mute?: boolean }[] = [
  { words: ["O", "seu", "negócio", "responde,"] },
  { words: ["marca,", "fatura", "e", "cobra."] },
  { words: ["Mesmo", "quando", "não", "está."], mute: true },
];

/** Each word rises out of its own mask. Pure CSS, so it starts before hydration. */
function Headline() {
  let i = 0;
  return (
    <h1 className="mt-5 text-[40px] leading-[1.06] font-medium tracking-[-0.035em] text-ink sm:text-[52px] lg:text-[46px] xl:text-[52px]">
      {LINES.map((line) => (
        <span key={line.words.join(" ")} className={line.mute ? "block text-mute" : "block"}>
          {line.words.map((w) => {
            const delay = 80 + i++ * 45;
            return (
              <span
                key={w}
                className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
              >
                <span
                  className="inline-block animate-rise"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {w}
                </span>
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  return (
    <section id="top" className="pt-32 pb-20 sm:pt-40 sm:pb-28">
      <Container>
        <HeroMotion
          copy={
            <>
              <p className="animate-fade-up text-[14px] text-ink-2">
                Automações à medida para pequenas e médias empresas
              </p>
              <Headline />
              <p
                className="mt-6 max-w-[32rem] animate-fade-up text-[17px] leading-[1.6] text-ink-2 sm:text-[18px]"
                style={{ animationDelay: "520ms" }}
              >
                Desenhamos automações para o trabalho que se repete todos os dias, ligadas ao
                WhatsApp, ao email, à agenda e ao software de faturação que já usa.
              </p>
              <div
                className="mt-9 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-4"
                style={{ animationDelay: "620ms" }}
              >
                <Magnetic>
                  <LinkButton href={contactHref()} size="lg" arrow>
                    {site.cta}
                  </LinkButton>
                </Magnetic>
                <LinkButton href="#exemplos" variant="text" className="group text-[15px]" arrow>
                  Ver como funciona
                </LinkButton>
              </div>
              <p
                className="mt-5 animate-fade-up text-[13.5px] text-mute"
                style={{ animationDelay: "720ms" }}
              >
                {site.ctaNote}
              </p>
            </>
          }
          stage={
            <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
              <HeroStage />
              <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-ink-2">
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-ink" />
                  Notificação: uma automação a trabalhar
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-px w-4 bg-ink" />O que ela atualizou
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-go" />
                  Feito, sem ninguém tocar
                </li>
              </ul>
            </div>
          }
        />
      </Container>
    </section>
  );
}
