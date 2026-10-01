import { Check } from "lucide-react";
import { type Brand, BrandIcon } from "@/components/brand/BrandIcon";
import { HeroFeed } from "@/components/sections/HeroFeed";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { delay } from "@/lib/delay";
import { contactHref, site } from "@/lib/site";

const PROMISES = ["Diagnóstico gratuito", "Preço fechado", "Sem mudar de software"];

/* Official logos floating around the live feed: the tools the automations connect. */
const FLOATERS: { brand: Brand; className: string; r: string; dur: string }[] = [
  { brand: "whatsapp", className: "-top-6 -left-6", r: "-6deg", dur: "6s" },
  { brand: "gmail", className: "top-20 -right-7", r: "5deg", dur: "7s" },
  { brand: "outlook", className: "top-[52%] -left-8", r: "-4deg", dur: "7.5s" },
  { brand: "googleCalendar", className: "bottom-20 -right-6", r: "4deg", dur: "6.5s" },
  { brand: "stripe", className: "-top-7 right-24", r: "6deg", dur: "5.5s" },
];

export function Hero() {
  return (
    <section
      id="top"
      data-loop
      className="relative overflow-hidden bg-[radial-gradient(55%_45%_at_88%_12%,rgb(31_111_74/0.1),transparent),radial-gradient(40%_35%_at_0%_0%,rgb(242_179_61/0.1),transparent)] pt-8 pb-20 sm:pt-14 lg:pb-28"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div>
          <p
            data-rise
            className="inline-flex items-center gap-1.5 rounded-full bg-white py-1.5 pr-3.5 pl-2 text-[13px] font-medium text-ink-2 shadow-[0_0_0_1px_var(--color-line)]"
          >
            <span className="relative grid size-5 place-items-center">
              <span className="absolute size-2 animate-ping rounded-full bg-brand/40 motion-reduce:hidden" />
              <span className="size-2 rounded-full bg-brand" />
            </span>
            Automações à medida para PME portuguesas
          </p>
          <h1
            data-rise
            style={delay(80)}
            className="mt-6 text-[42px] leading-[1.03] font-semibold tracking-[-0.04em] sm:text-[58px] lg:text-[62px]"
          >
            As tarefas repetitivas do seu negócio,{" "}
            <span className="relative inline-block whitespace-nowrap text-brand">
              feitas sozinhas
              <svg
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                aria-hidden
                className="draw-line absolute -bottom-2 left-0 h-3 w-full text-amber"
              >
                <path
                  d="M3 14 C 70 4, 150 4, 297 11"
                  pathLength={1}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>
          <p
            data-rise
            style={delay(160)}
            className="mt-7 max-w-[34rem] text-[18px] leading-[1.6] text-ink-2"
          >
            Respostas a clientes, marcações, orçamentos, faturas e cobranças. Ligamos as ferramentas
            que já usa para que este trabalho aconteça sem si.
          </p>
          <div data-rise style={delay(240)} className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton href={contactHref()} size="lg" arrow>
              {site.cta}
            </LinkButton>
            <LinkButton href="#exemplos" variant="line" size="lg">
              Ver exemplos
            </LinkButton>
          </div>
          <ul
            data-rise
            style={delay(320)}
            className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-ink-2"
          >
            {PROMISES.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-brand-soft text-brand">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div data-rise style={delay(200)} className="relative">
          {FLOATERS.map((f) => (
            <span
              key={f.brand}
              aria-hidden
              className={`absolute z-10 hidden transition-transform duration-300 ease-out-soft hover:scale-110 sm:block ${f.className}`}
            >
              <span
                className="grid size-14 animate-bob place-items-center rounded-2xl bg-white shadow-[0_0_0_1px_rgb(17_19_21/0.06),0_18px_30px_-16px_rgb(17_19_21/0.35)]"
                style={{ ["--r" as string]: f.r, animationDuration: f.dur }}
              >
                <BrandIcon brand={f.brand} className="size-7" />
              </span>
            </span>
          ))}
          <HeroFeed />
        </div>
      </Container>
    </section>
  );
}
