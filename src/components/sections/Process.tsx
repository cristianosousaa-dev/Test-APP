import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { delay } from "@/lib/delay";

/* The process in order, with how long each phase takes and what the client gets from it. */
const STEPS = [
  {
    title: "Diagnóstico",
    time: "30 minutos",
    text: "Uma conversa para perceber como o trabalho é feito hoje e que ficheiros e programas usa.",
  },
  {
    title: "Demonstração",
    time: "2 a 3 dias",
    text: "Mostramos uma versão a funcionar com os seus próprios dados, antes de qualquer compromisso.",
    highlight: true,
  },
  {
    title: "Proposta",
    time: "Em 48 horas",
    text: "Âmbito, prazo e preço fixo por escrito. Nada avança sem a sua aprovação.",
  },
  {
    title: "Construção",
    time: "2 a 12 semanas",
    text: "Entregas semanais para validar. Migramos os dados e formamos a equipa antes de arrancar.",
  },
  {
    title: "Acompanhamento",
    time: "Contínuo",
    text: "Alojamento, manutenção, suporte e pequenas evoluções incluídos na mensalidade.",
  },
] as const;

export function Process() {
  return (
    <section
      id="processo"
      aria-labelledby="processo-title"
      className="night relative overflow-x-clip py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          kicker="Como trabalhamos"
          id="processo-title"
          title={<>Do primeiro contacto à aplicação em uso.</>}
        >
          Um processo curto, com decisões suas em cada passo. Veja o resultado antes de pagar e só
          avance com o preço escrito.
        </SectionHead>

        <ol className="relative mt-12 grid grid-cols-1 sm:mt-16 lg:grid-cols-5">
          <span aria-hidden className="absolute inset-x-0 top-0 hidden h-px bg-nline-2 lg:block" />
          <span
            aria-hidden
            className="pl-fill absolute inset-x-0 top-0 hidden h-[2px] -translate-y-[0.5px] bg-accent-hi lg:block"
          />
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={delay(i * 80)}
              className="relative border-t border-nline-2 py-7 lg:border-t-0 lg:border-l lg:px-6 lg:py-2 lg:first:border-l-0 lg:first:pl-0"
            >
              {/* The timeline's marker: it lights as the step scrolls into view. */}
              <span
                aria-hidden
                className="pl-dot absolute -top-[5px] left-0 size-[10px] rounded-full bg-accent-hi ring-4 ring-[var(--stage-base)] lg:left-6 lg:first:left-0"
              />
              <p className="kicker-n text-[10.5px] tabular-nums">
                {String(i + 1).padStart(2, "0")} · {s.time}
              </p>
              <h3 className="mt-5 font-display text-[24px] leading-[1.15] tracking-[-0.025em] text-strong">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-nmute">{s.text}</p>
              {"highlight" in s && (
                <p className="kicker-n mt-4 text-[10px] text-accent-hi">O que nos distingue</p>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
