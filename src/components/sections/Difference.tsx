import { Check, Minus } from "lucide-react";
import { OrchestrMark } from "@/components/brand/OrchestrLogo";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { site } from "@/lib/site";

/* What the service commits to (see Methodology and FAQ). Compared with doing it in-house. */
const ROWS = [
  {
    topic: "Implementação",
    diy: "A cargo da equipa, em paralelo com o trabalho diário",
    us: "Assegurada pela Orchestr, de ponta a ponta",
  },
  {
    topic: "Sistemas",
    diy: "Novas plataformas para aprender e gerir",
    us: "Integração com os sistemas existentes",
  },
  {
    topic: "Custo",
    diy: "Horas internas e subscrições difíceis de prever",
    us: "Preço fixo, aprovado antes do início",
  },
  {
    topic: "Evolução",
    diy: "Reconfiguração sempre que o negócio muda",
    us: "Ajustes contínuos com acompanhamento dedicado",
  },
];

/* The Orchestr column brightens row by row: navy at the top, lit from below. */
const SHADES = ["#061024", "#0a1c40", "#10295a", "#1b3f80", "#2a5aa6"];
const GRID = "grid grid-cols-2 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1fr)]";

export function Difference() {
  return (
    <section aria-labelledby="diferenca-title" className="relative py-20 sm:py-28">
      <Container>
        <SectionHead
          index="06"
          kicker="Diferenciação"
          id="diferenca-title"
          title="Não vendemos software. Entregamos processos a funcionar."
        >
          Assumimos a análise, a implementação e a manutenção das automações, à medida da operação
          da sua empresa.
        </SectionHead>

        <div className="mt-14">
          <div className={GRID}>
            <div className="hidden lg:block" />
            <p className="label flex items-end px-4 pb-4 text-[11px] text-fg-3 sm:px-6">
              Equipa interna
            </p>
            <p
              className="label relative flex items-center gap-2.5 px-4 pt-6 pb-4 text-[11px] text-white sm:px-6"
              style={{ background: SHADES[0] }}
            >
              <span aria-hidden className="marker top-0 left-0" />
              <OrchestrMark className="size-5" id="orx-diff" />
              Com a {site.name}
            </p>
          </div>
          {ROWS.map((r, i) => (
            <div key={r.topic} data-reveal style={{ ["--i" as string]: i }} className={GRID}>
              <p className="label relative col-span-2 flex items-center py-3 text-[11px] text-fg-2 lg:col-span-1 lg:py-6">
                <span aria-hidden className="rule-x absolute inset-x-0 top-0" />
                <span className="mr-3 font-mono text-fg-3">0{i + 1}</span>
                {r.topic}
              </p>
              <p className="relative flex items-start gap-2.5 px-4 py-5 text-[15px] text-fg-2 sm:px-6 lg:py-6">
                <span aria-hidden className="rule-x absolute inset-x-0 top-0" />
                <Minus className="mt-0.5 size-4 shrink-0 text-fg-3" />
                {r.diy}
              </p>
              <p
                className="relative flex items-start gap-2.5 px-4 py-5 text-[15px] text-white sm:px-6 lg:py-6"
                style={{ background: SHADES[i + 1] }}
              >
                <span aria-hidden className="rule-x rule-light absolute inset-x-0 top-0" />
                <span
                  data-pop
                  className="mt-[3px] grid size-[17px] shrink-0 place-items-center bg-accent text-white"
                >
                  <Check className="size-[11px]" strokeWidth={3} />
                </span>
                {r.us}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
