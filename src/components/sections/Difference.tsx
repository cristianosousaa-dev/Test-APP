import { Check, Minus } from "lucide-react";
import { OrchestrMark } from "@/components/brand/OrchestrLogo";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { site } from "@/lib/site";

/* What the service commits to (see Process and FAQ). Compared with doing it yourself, not with named competitors. */
const ROWS = [
  {
    topic: "Quem configura",
    diy: "Você, ao fim do dia, entre tutoriais",
    us: "Nós, de ponta a ponta",
  },
  {
    topic: "Ferramentas",
    diy: "Mais uma plataforma para aprender",
    us: "As que o seu negócio já usa",
  },
  {
    topic: "Custo",
    diy: "Horas e subscrições difíceis de prever",
    us: "Proposta com preço fechado, antes de começar",
  },
  {
    topic: "Quando algo muda",
    diy: "Volta a configurar tudo",
    us: "Ajustamos nós, com acompanhamento",
  },
];

export function Difference() {
  return (
    <section aria-labelledby="diferenca-title" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-[420px] max-w-[900px] rounded-full bg-[radial-gradient(closest-side,rgb(110_123_255/0.10),transparent)]"
      />
      <Container>
        <SectionHead
          index="06"
          kicker="A diferença"
          id="diferenca-title"
          align="center"
          className="mx-auto"
          title={<>Não é mais uma ferramenta. É o trabalho feito.</>}
        >
          Não lhe vendemos um software para configurar. Tratamos das automações por si, à medida do
          seu negócio.
        </SectionHead>

        <div className="mx-auto mt-14 grid max-w-[980px] gap-4 md:grid-cols-2">
          <div data-reveal className="surface p-6 sm:p-8">
            <p className="kicker !text-fg-3">Fazer sozinho</p>
            <dl className="mt-6 flex flex-col">
              {ROWS.map((r) => (
                <div
                  key={r.topic}
                  className="border-t border-hair py-4 first:border-t-0 first:pt-0"
                >
                  <dt className="font-mono text-[11px] tracking-[0.06em] text-fg-3 uppercase">
                    {r.topic}
                  </dt>
                  <dd className="mt-1.5 flex items-start gap-2.5 text-[15.5px] text-fg-2">
                    <Minus className="mt-1 size-4 shrink-0 text-fg-3" />
                    {r.diy}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal style={{ ["--i" as string]: 1 }}>
            <div
              data-spot
              className="surface h-full p-6 shadow-[inset_0_0_0_1px_rgb(61_224_160/0.3),inset_0_1px_0_rgb(255_255_255/0.08),0_30px_80px_-40px_rgb(61_224_160/0.35)] sm:p-8"
            >
              <span className="spot-glow" />
              <p className="kicker flex items-center gap-2.5 !text-fg">
                <OrchestrMark className="size-5" id="orx-diff" />
                Com a {site.name}
              </p>
              <dl className="mt-6 flex flex-col">
                {ROWS.map((r) => (
                  <div
                    key={r.topic}
                    className="border-t border-hair py-4 first:border-t-0 first:pt-0"
                  >
                    <dt className="font-mono text-[11px] tracking-[0.06em] text-fg-3 uppercase">
                      {r.topic}
                    </dt>
                    <dd className="mt-1.5 flex items-start gap-2.5 text-[15.5px] font-medium text-fg">
                      <span className="mt-[3px] grid size-[17px] shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                        <Check className="size-[11px]" strokeWidth={3} />
                      </span>
                      {r.us}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
