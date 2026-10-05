import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { founder, proposalHref, site } from "@/lib/site";

const COMMITMENTS = [
  ["Um único interlocutor", "Diagnóstico, implementação e manutenção a cargo da mesma pessoa."],
  ["Sem intermediários", "As decisões técnicas são tomadas por quem conhece o seu processo."],
  ["Contacto direto", "Por email, telefone ou videochamada, sem centrais de atendimento."],
] as const;

/* The process, in one line per phase: what happens and what the client gets. */
const STEPS = [
  ["Pedido", "Descreve a tarefa com as suas palavras. Dizemos se é viável, sem custos."],
  ["Diagnóstico", "Uma conversa de 30 minutos para ver como a tarefa é feita hoje."],
  ["Proposta", "Âmbito, prazo e preço fixo por escrito. Nada avança sem a sua aprovação."],
  ["Implementação", "Ligamos os seus sistemas e testamos com casos reais antes de arrancar."],
  [
    "Acompanhamento",
    "Monitorizamos cada execução e corrigimos o que mudar. Incluído na mensalidade.",
  ],
] as const;

/* A real, named person accountable for every project, and how a project runs. */
export function Founder() {
  return (
    <section
      id="quem"
      aria-labelledby="quem-title"
      className="relative overflow-x-clip py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          kicker="Quem e como"
          id="quem-title"
          title={<>Um responsável, do diagnóstico à manutenção.</>}
        >
          Cada projeto da {site.name} é acompanhado por {founder.name}, especialista em
          desenvolvimento full-stack e automação com inteligência artificial.
        </SectionHead>

        <div className="mt-12 grid grid-cols-1 gap-14 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
          <div data-reveal>
            <div className="flex items-center gap-5">
              <div className="relative aspect-[4/5] w-[88px] shrink-0 overflow-hidden">
                <Image
                  src={founder.photo}
                  alt={`Retrato de ${founder.name}, fundador da ${site.name}`}
                  fill
                  sizes="180px"
                  className="origin-[50%_32%] scale-[1.8] object-cover"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)]"
                />
              </div>
              <div className="min-w-0">
                <p className="font-display text-[22px] tracking-[-0.02em]">{founder.name}</p>
                <p className="mt-0.5 text-[14px] text-fg-2">Fundador da {site.name}</p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-2 text-[14px] text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  LinkedIn <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
            <dl className="mt-8">
              {COMMITMENTS.map(([title, text]) => (
                <div key={title} className="border-t border-hair-2 py-4">
                  <dt className="text-[16px] tracking-[-0.01em]">{title}</dt>
                  <dd className="mt-1 text-[14.5px] leading-[1.55] text-fg-2">{text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal>
            <p className="label text-[11px] text-fg-3">Como decorre um projeto</p>
            <ol className="mt-5">
              {STEPS.map(([title, text], i) => (
                <li
                  key={title}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-hair-2 py-5 sm:grid-cols-[3.5rem_minmax(0,11rem)_minmax(0,1fr)] sm:items-baseline sm:gap-x-6"
                >
                  <span className="font-display text-[22px] tracking-[-0.03em] text-accent tabular-nums">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-[20px] tracking-[-0.02em]">{title}</h3>
                  <p className="col-start-2 mt-1 text-[15px] leading-[1.6] text-fg-2 sm:col-start-3 sm:mt-0">
                    {text}
                  </p>
                </li>
              ))}
            </ol>
            <LinkButton href={proposalHref} className="mt-8 w-full sm:w-auto">
              Descrever a minha tarefa
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
