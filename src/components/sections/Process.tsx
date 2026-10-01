import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

const STEPS = [
  {
    title: "Diagnóstico",
    text: "Analisamos os seus processos e identificamos as automações com maior impacto.",
    gets: "Mapa de processos prioritários",
  },
  {
    title: "Proposta",
    text: "Âmbito, prazo e preço fixo definidos por escrito, antes de iniciar.",
    gets: "Proposta com âmbito, prazo e preço",
  },
  {
    title: "Implementação e testes",
    text: "Integramos os sistemas existentes e validamos com casos reais da sua operação.",
    gets: "Automação em produção",
  },
  {
    title: "Acompanhamento",
    text: "Monitorizamos o funcionamento e ajustamos à medida que o negócio evolui.",
    gets: "Suporte e melhoria contínua",
  },
];

export function Process() {
  return (
    <section id="processo" aria-labelledby="processo-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHead
          index="07"
          kicker="Metodologia"
          id="processo-title"
          title="Do diagnóstico à automação em produção."
        >
          Quatro fases, com entregáveis definidos em cada etapa.
        </SectionHead>

        <div className="relative mt-16">
          {/* Rail that fills as the steps scroll through (desktop: horizontal, mobile: vertical). */}
          <div
            aria-hidden
            className="absolute top-[27px] right-[12%] left-[12%] hidden h-px bg-hair-2 lg:block"
          >
            <span className="process-fill absolute inset-0 origin-left bg-gradient-to-r from-accent to-indigo" />
          </div>
          <div aria-hidden className="absolute top-2 bottom-2 left-[27px] w-px bg-hair-2 lg:hidden">
            <span className="process-fill-y absolute inset-0 origin-top bg-gradient-to-b from-accent to-indigo" />
          </div>

          <ol className="relative grid gap-5 lg:grid-cols-4 lg:gap-4">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                data-reveal
                style={{ ["--i" as string]: i }}
                className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 lg:flex lg:flex-col lg:items-center lg:gap-0"
              >
                <span className="relative z-10 grid size-14 place-items-center rounded-full bg-base font-mono text-[15px] font-medium text-accent shadow-[inset_0_0_0_1px_rgb(61_224_160/0.35),0_0_0_6px_var(--color-base)]">
                  0{i + 1}
                </span>
                <div data-spot className="surface group flex h-full flex-col p-6 lg:mt-6 lg:w-full">
                  <span className="spot-glow" />
                  <h3 className="text-[19px] font-semibold tracking-[-0.02em] [font-stretch:106%]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-fg-2">{s.text}</p>
                  <p className="mt-auto border-t border-hair pt-4 text-[14px]">
                    <span className="block font-mono text-[10.5px] tracking-[0.08em] text-fg-3 uppercase">
                      Entregável
                    </span>
                    <span className="mt-1 block font-medium text-fg">{s.gets}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
