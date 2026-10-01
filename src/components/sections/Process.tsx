import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

const STEPS = [
  {
    title: "Conversa de 30 minutos",
    text: "Explica-nos como trabalha. Mostramos o que faz sentido automatizar primeiro.",
    gets: "Lista das tarefas a automatizar",
  },
  {
    title: "Proposta com preço fechado",
    text: "Sabe o que vai pagar e quando fica pronto, antes de começarmos.",
    gets: "Preço, prazo e o que fica incluído",
  },
  {
    title: "Construção e testes",
    text: "Ligamos às ferramentas que já usa e testamos com casos reais do seu negócio.",
    gets: "A automação a funcionar",
  },
  {
    title: "Acompanhamento",
    text: "Ficamos atentos e ajustamos quando o seu negócio muda.",
    gets: "Suporte quando precisar",
  },
];

export function Process() {
  return (
    <section id="processo" aria-labelledby="processo-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHead
          index="07"
          kicker="Processo"
          id="processo-title"
          title="Do primeiro contacto à automação a funcionar."
        >
          Quatro passos, sem surpresas. Em cada um sabe exatamente o que recebe.
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
                      Recebe
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
