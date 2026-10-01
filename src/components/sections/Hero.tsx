import { Check } from "lucide-react";
import { HeroFeed } from "@/components/sections/HeroFeed";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { delay } from "@/lib/delay";
import { contactHref, site } from "@/lib/site";

const PROMISES = ["Diagnóstico gratuito", "Preço fechado", "Sem mudar de software"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[radial-gradient(60%_50%_at_85%_10%,rgb(212_255_58/0.22),transparent),radial-gradient(50%_40%_at_0%_0%,rgb(107_78_255/0.08),transparent)] pt-8 pb-20 sm:pt-14 lg:pb-28"
    >
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div>
          <p
            data-rise
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-ink-2 ring-1 ring-line"
          >
            <span className="size-2 rounded-full bg-lime ring-[3px] ring-lime/30" />
            Automações à medida para PME
          </p>
          <h1
            data-rise
            style={delay(60)}
            className="mt-6 text-[42px] leading-[1.02] font-semibold tracking-[-0.04em] sm:text-[58px] lg:text-[64px]"
          >
            As tarefas repetitivas do seu negócio, <span className="mark">feitas sozinhas</span>.
          </h1>
          <p
            data-rise
            style={delay(120)}
            className="mt-6 max-w-[34rem] text-[18px] leading-[1.6] text-ink-2"
          >
            Respostas a clientes, marcações, orçamentos, faturas e cobranças. Ligamos as ferramentas
            que já usa para que este trabalho aconteça sem si.
          </p>
          <div data-rise style={delay(180)} className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton href={contactHref()} size="lg" arrow>
              {site.cta}
            </LinkButton>
            <LinkButton href="#exemplos" variant="line" size="lg">
              Ver exemplos
            </LinkButton>
          </div>
          <ul
            data-rise
            style={delay(240)}
            className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-ink-2"
          >
            {PROMISES.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-lime text-ink">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div data-rise style={delay(200)}>
          <HeroFeed />
        </div>
      </Container>
    </section>
  );
}
