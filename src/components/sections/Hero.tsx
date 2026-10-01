import { Check, ToggleRight } from "lucide-react";
import { type Brand, BrandIcon } from "@/components/brand/BrandIcon";
import { HeroFeed } from "@/components/sections/HeroFeed";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { delay } from "@/lib/delay";
import { contactHref, site } from "@/lib/site";

const RUNNING: { brand: Brand; name: string; last: string }[] = [
  { brand: "whatsapp", name: "Marcações por WhatsApp", last: "há 2 min" },
  { brand: "gmail", name: "Orçamentos a partir do email", last: "há 6 min" },
  { brand: "googleCalendar", name: "Lembretes de consulta", last: "há 3 min" },
  { brand: "stripe", name: "Cobrança de faturas", last: "há 9 min" },
];

export function Hero() {
  return (
    <section
      id="top"
      data-loop
      className="relative isolate overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28"
    >
      {/* Atmosphere: static light and a fading grid. Glows drift slightly with the scroll. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <div
          data-parallax
          style={{ ["--depth" as string]: "60px" }}
          className="absolute -top-56 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(61_224_160/0.18),transparent)]"
        />
        <div
          data-parallax
          style={{ ["--depth" as string]: "-40px" }}
          className="absolute top-[38%] -right-40 h-[520px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgb(110_123_255/0.16),transparent)]"
        />
      </div>

      <Container className="flex flex-col items-center text-center">
        <p
          data-rise
          className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-[13px] text-fg-2"
        >
          <span className="relative grid size-5 place-items-center rounded-full bg-accent/15">
            <span className="absolute size-2 animate-ping rounded-full bg-accent/50 motion-reduce:hidden" />
            <span className="size-2 rounded-full bg-accent" />
          </span>
          Automações à medida para PME em Portugal
        </p>

        <h1 data-rise style={delay(80)} className="display mt-7 text-[clamp(44px,8.4vw,96px)]">
          <span className="ink-sheen">O seu negócio,</span>
          <br />
          <span className="bg-[linear-gradient(100deg,#b6f7dd,#3de0a0_45%,#8fa0ff)] bg-clip-text text-transparent">
            em piloto automático.
          </span>
        </h1>

        <p
          data-rise
          style={delay(160)}
          className="mt-7 max-w-[40rem] text-[17px] leading-[1.65] text-fg-2 sm:text-[19px]"
        >
          A {site.name} cria automações à medida para pequenas e médias empresas: respostas a
          clientes, marcações, orçamentos, faturas e cobranças, ligadas às ferramentas que já usa.
        </p>

        <div
          data-rise
          style={delay(240)}
          className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <LinkButton href={contactHref()} size="lg" arrow>
            {site.cta}
          </LinkButton>
          <LinkButton href="#como-funciona" variant="glass" size="lg">
            Ver como funciona
          </LinkButton>
        </div>
        <p data-rise style={delay(320)} className="kicker mt-6 !text-[10.5px] !text-fg-3">
          30 minutos · Preço fechado · Sem mudar de software
        </p>
      </Container>

      {/* Product composition */}
      <Container className="relative mt-16 sm:mt-20">
        <div data-rise style={delay(380)}>
          <div data-zoom className="relative mx-auto max-w-[1080px]">
            <FloatingCards />
            <div className="glass rounded-[28px] p-2 sm:p-2.5">
              <div className="flex items-center gap-2 px-3 pt-1.5 pb-3 sm:px-4">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                </span>
                <span className="mx-auto font-mono text-[11px] tracking-wide text-fg-3">
                  orchestr · o seu negócio hoje
                </span>
                <span className="hidden font-mono text-[10.5px] tracking-wider text-fg-3 uppercase sm:inline">
                  Ilustração
                </span>
              </div>
              <div className="grid gap-2 rounded-[22px] bg-base-2/80 p-3 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)] sm:p-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-6">
                <RunningList />
                <HeroFeed />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The automations running for this (illustrative) business. */
function RunningList() {
  return (
    <div className="hidden flex-col rounded-[18px] bg-white/[0.025] p-4 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)] lg:flex">
      <p className="kicker !text-[10.5px]">Automações ativas</p>
      <ul className="mt-4 flex flex-col gap-2">
        {RUNNING.map((r) => (
          <li
            key={r.name}
            className="flex items-center gap-3 rounded-[14px] bg-white/[0.03] px-3 py-2.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.04)]"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-white">
              <BrandIcon brand={r.brand} className="size-5" />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-[14px] font-medium">{r.name}</span>
              <span className="block font-mono text-[10.5px] text-fg-3">
                Última execução {r.last}
              </span>
            </span>
            <ToggleRight className="size-6 shrink-0 text-accent" aria-hidden />
          </li>
        ))}
      </ul>
      <p className="mt-auto flex items-center gap-2 pt-5 text-[13px] text-fg-2">
        <span className="grid size-5 place-items-center rounded-full bg-accent/15 text-accent">
          <Check className="size-3" strokeWidth={3} />
        </span>
        Tudo a correr. Nada para fazer.
      </p>
    </div>
  );
}

/** Glass cards floating around the window at different depths (parallax on scroll). */
function FloatingCards() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden md:block">
      <div
        data-parallax
        style={{ ["--depth" as string]: "34px" }}
        className="absolute top-[20%] -left-8 lg:-left-20"
      >
        <div className="glass flex w-[260px] animate-bob bg-[rgb(16_20_24/0.94)] items-start gap-3 rounded-[18px] p-3.5 text-left [animation-duration:8s]">
          <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-white">
            <BrandIcon brand="whatsapp" className="size-5" />
          </span>
          <span>
            <span className="block font-mono text-[10px] tracking-wider text-fg-3 uppercase">
              Marta Costa · 21:47
            </span>
            <span className="mt-0.5 block text-[13.5px] leading-snug">
              Olá! Têm vaga na sexta à tarde?
            </span>
          </span>
        </div>
      </div>
      <div
        data-parallax
        style={{ ["--depth" as string]: "-26px" }}
        className="absolute top-[36%] -right-8 lg:-right-14"
      >
        <div className="glass flex w-[230px] animate-bob bg-[rgb(16_20_24/0.94)] items-center gap-3 rounded-[18px] p-3.5 text-left [animation-delay:-3s] [animation-duration:7s]">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
            <Check className="size-4" strokeWidth={3} />
          </span>
          <span>
            <span className="block text-[13.5px] font-medium">Fatura FT 1187 paga</span>
            <span className="block font-mono text-[10.5px] text-fg-3">185,00 € · lançada</span>
          </span>
        </div>
      </div>
      <div
        data-parallax
        style={{ ["--depth" as string]: "48px" }}
        className="absolute -bottom-8 left-[18%]"
      >
        <div className="glass flex w-[250px] animate-bob bg-[rgb(16_20_24/0.94)] items-center gap-3 rounded-[18px] p-3.5 text-left [animation-delay:-5s] [animation-duration:9s]">
          <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-white">
            <BrandIcon brand="googleCalendar" className="size-5" />
          </span>
          <span>
            <span className="block text-[13.5px] font-medium">Sex 15:30 · Limpeza</span>
            <span className="block font-mono text-[10.5px] text-fg-3">Marcado sozinho</span>
          </span>
        </div>
      </div>
    </div>
  );
}
