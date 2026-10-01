import { HeroBoard } from "@/components/sections/HeroBoard";
import { HeroParticles } from "@/components/sections/HeroParticles";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IsoArt, type IsoKind } from "@/components/ui/IsoArt";
import { delay } from "@/lib/delay";
import { contactHref, site } from "@/lib/site";

const PILLARS: { title: string; text: string; art: IsoKind }[] = [
  {
    title: "Atendimento imediato",
    text: "Pedidos respondidos em segundos, a qualquer hora.",
    art: "chat",
  },
  {
    title: "Sistemas integrados",
    text: "WhatsApp, email, agenda e faturação a trabalhar em conjunto.",
    art: "nodes",
  },
  {
    title: "Rastreável, dia a dia",
    text: "Cada execução fica registada e pode ser consultada.",
    art: "chart",
  },
];

export function Hero() {
  return (
    <section id="top" data-loop className="relative isolate pt-10 pb-20 sm:pt-16 lg:pb-28">
      <Container className="relative">
        <HeroParticles />
        {/* Construction grid: the top rule and the two gutters between columns. */}
        <div aria-hidden className="rule-x load-draw-x absolute inset-x-5 top-0 sm:inset-x-7" />
        <span aria-hidden className="marker load-pop -top-[3px] left-[17px] sm:left-[25px]" />
        <div
          aria-hidden
          className="rule-y load-draw-y absolute -top-16 -bottom-28 left-[calc(33.33%+4px)] hidden lg:block"
        />
        <div
          aria-hidden
          style={delay(150)}
          className="rule-y load-draw-y absolute -top-16 -bottom-28 left-[calc(66.66%-4px)] hidden lg:block"
        />

        <div className="grid grid-cols-1 gap-10 pt-8 lg:grid-cols-3 lg:gap-7 lg:pt-0">
          {/* Statement */}
          <div className="flex flex-col lg:min-h-[680px] lg:pt-9">
            <p data-rise className="label flex items-center gap-2.5 text-[11px] text-fg-2">
              <span className="size-1.5 bg-accent" />
              Automação de processos para PME
            </p>
            <h1
              data-rise="mask"
              style={delay(80)}
              className="display mt-6 text-[clamp(42px,4.5vw,68px)]"
            >
              Automatize o repetitivo. <span className="block text-fg-3">Foque-se no negócio.</span>
            </h1>

            <div aria-hidden className="mt-10 hidden flex-col gap-7 lg:flex">
              <div className="rule-x load-draw-x" style={delay(300)} />
              <div className="rule-x load-draw-x" style={delay(450)} />
            </div>

            <div className="mt-10 lg:mt-auto">
              <p
                data-rise
                style={delay(200)}
                className="max-w-[26rem] text-[16.5px] leading-[1.6] text-fg-2"
              >
                A {site.name} desenha, implementa e mantém automações à medida para pequenas e
                médias empresas, do atendimento à faturação e cobranças, integradas nos sistemas que
                já utiliza.
              </p>
              <div
                data-rise
                style={delay(280)}
                className="mt-8 flex max-w-[26rem] flex-col gap-[2px]"
              >
                <LinkButton href={contactHref()} size="lg" className="w-full">
                  {site.cta}
                </LinkButton>
                <LinkButton href="#como-funciona" variant="mist" size="lg" className="w-full">
                  Como funciona
                </LinkButton>
              </div>
              <p data-rise style={delay(340)} className="kicker mt-5 text-[10.5px] text-fg-2">
                Diagnóstico de 30 minutos · Preço fixo · Sem substituir sistemas
              </p>
            </div>
          </div>

          {/* Product: navy operations board */}
          <div data-rise style={delay(200)} className="lg:min-h-[680px]">
            <HeroBoard />
          </div>

          {/* Three pillars */}
          <ul className="flex flex-col gap-7">
            {PILLARS.map((p, i) => (
              <li key={p.title} data-rise style={delay(320 + i * 120)} className="flex-1">
                <div
                  data-frame
                  className="tile group relative flex h-full min-h-[200px] flex-col overflow-visible p-5"
                >
                  <span className="badge self-start">0{i + 1}</span>
                  <p className="mt-4 text-[17px] tracking-[-0.01em]">{p.title}</p>
                  <p className="mt-1 max-w-[54%] text-[14px] leading-[1.5] text-fg-2">{p.text}</p>
                  <IsoArt
                    kind={p.art}
                    className="absolute right-4 bottom-4 h-[72%] w-[40%] transition-transform duration-700 ease-out-soft group-hover:-translate-y-1"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
