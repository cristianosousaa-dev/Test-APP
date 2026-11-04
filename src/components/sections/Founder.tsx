import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { delay } from "@/lib/delay";
import { founder, proposalHref, site } from "@/lib/site";

const COMMITMENTS = [
  ["Um único interlocutor", "Diagnóstico, construção e manutenção a cargo da mesma pessoa."],
  ["Sem intermediários", "As decisões técnicas são tomadas por quem conhece o seu processo."],
  ["Contacto direto", "Por email, telefone ou videochamada, sem centrais de atendimento."],
  [
    "Produtos próprios",
    "Também desenvolvemos o BOOKLIN, uma plataforma de marcações e gestão para negócios locais.",
  ],
] as const;

/* A real, named person accountable for every project. */
export function Founder() {
  return (
    <section
      id="quem"
      aria-labelledby="quem-title"
      className="relative overflow-x-clip py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead kicker="Quem constrói" id="quem-title" title={<>Uma só pessoa responsável.</>}>
          Cada projeto da {site.name} é acompanhado por {founder.name}, especialista em
          desenvolvimento full-stack e em engenharia assistida por inteligência artificial, o que
          permite entregar em semanas o que costuma demorar meses.
        </SectionHead>

        <div className="mt-12 grid grid-cols-1 gap-12 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
          <div data-reveal className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-6">
            {/* A matte frame: hairline, soft shadow, rounded corners. Black and white at rest; on hover it
                lifts, the colour comes in and a light passes over. */}
            <div className="portrait group w-[112px] shrink-0 lg:w-[272px]">
              <div className="portrait-inner relative aspect-[4/5] overflow-hidden">
                <Image
                  src={founder.photo}
                  alt={`Retrato de ${founder.name}, fundador da ${site.name}`}
                  fill
                  sizes="(min-width: 1024px) 544px, 224px"
                  className="object-cover object-[50%_18%] grayscale transition-[filter,transform] duration-[900ms] ease-out-soft group-hover:scale-[1.04] group-hover:grayscale-0 group-focus-within:grayscale-0 [@media(hover:none)]:grayscale-0"
                />
                <span aria-hidden className="portrait-sheen" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="font-display text-[24px] tracking-[-0.02em]">{founder.name}</p>
              <p className="mt-0.5 text-[14px] text-fg-2">Fundador da {site.name}</p>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 py-2 text-[14px] text-accent-hi underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
              >
                LinkedIn <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          <div>
            <dl className="grid border-t border-l border-hair-2 sm:grid-cols-2">
              {COMMITMENTS.map(([title, text], i) => (
                <div
                  key={title}
                  data-reveal
                  style={delay(i * 70)}
                  className="border-r border-b border-hair-2 p-7"
                >
                  <dt className="font-display text-[21px] tracking-[-0.02em]">{title}</dt>
                  <dd className="mt-2 text-[15px] leading-[1.6] text-fg-2">{text}</dd>
                </div>
              ))}
            </dl>
            <LinkButton href={proposalHref} size="lg" className="mt-8 w-full sm:w-auto">
              Falar com o responsável
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
