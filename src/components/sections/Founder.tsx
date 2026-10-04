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

/* A real, named person accountable for every project: the strongest trust signal for an SME. */
export function Founder() {
  return (
    <section
      id="quem"
      aria-labelledby="quem-title"
      className="relative overflow-x-clip py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          index="06"
          kicker="Responsável"
          id="quem-title"
          title={
            <>
              Um responsável, <span className="text-accent">do diagnóstico à manutenção.</span>
            </>
          }
        >
          Cada projeto da {site.name} é acompanhado por {founder.name}, especialista em
          desenvolvimento full-stack e automação com inteligência artificial.
        </SectionHead>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="hidden lg:block" />
          <div
            data-reveal
            className="tile grid grid-cols-1 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          >
            {/* Profile */}
            <div className="flex gap-5 p-6 sm:flex-col sm:p-7">
              <div className="relative aspect-[4/5] w-[96px] shrink-0 overflow-hidden sm:w-[132px]">
                <span aria-hidden className="marker top-0 left-0 z-10" />
                <Image
                  src={founder.photo}
                  alt={`Retrato de ${founder.name}, fundador da ${site.name}`}
                  fill
                  sizes="(min-width: 640px) 240px, 180px"
                  className="origin-[50%_32%] scale-[1.8] object-cover"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)]"
                />
              </div>
              <div className="min-w-0">
                <p className="font-display text-[22px] tracking-[-0.02em]">{founder.name}</p>
                <p className="mt-1 text-[14px] leading-[1.5] text-fg-2">Fundador da {site.name}</p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label mt-2 inline-flex items-center gap-2 py-3 text-[11px] text-accent transition-colors hover:text-accent-2"
                >
                  Perfil no LinkedIn <span aria-hidden>↗</span>
                </a>
              </div>
            </div>

            {/* What that means for the client */}
            <div className="relative flex flex-col p-6 sm:p-7">
              <span aria-hidden className="rule-y absolute inset-y-6 left-0 hidden sm:block" />
              <span aria-hidden className="rule-x absolute inset-x-6 top-0 sm:hidden" />
              <dl className="flex flex-col">
                {COMMITMENTS.map(([title, text], i) => (
                  <div key={title} className="relative py-4 first:pt-0">
                    {i > 0 && <span aria-hidden className="rule-x absolute inset-x-0 top-0" />}
                    <dt className="text-[16px] tracking-[-0.01em]">{title}</dt>
                    <dd className="mt-1 text-[14.5px] leading-[1.55] text-fg-2">{text}</dd>
                  </div>
                ))}
              </dl>
              <LinkButton href={proposalHref} className="mt-6 w-full">
                Descrever a minha tarefa
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
