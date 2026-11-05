import {
  DatabaseBackup,
  FileCheck2,
  LayoutTemplate,
  type LucideIcon,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { delay } from "@/lib/delay";

/* What the client can hold us to. Each line is a commitment already made elsewhere on the page. */
const ITEMS: readonly { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: FileCheck2,
    title: "Proposta escrita antes de começar",
    text: "A proposta define o que fazemos, o valor e o prazo. Só começamos depois de a aprovar.",
  },
  {
    icon: LayoutTemplate,
    title: "Protótipo antes de pagar",
    text: "Veja como a aplicação ficaria, com os seus dados, antes de qualquer pagamento.",
  },
  {
    icon: DatabaseBackup,
    title: "Os dados são seus",
    text: "Pode exportá-los a qualquer momento. As condições do software ficam por escrito na proposta.",
  },
  {
    icon: ShieldCheck,
    title: "Alojamento na União Europeia",
    text: "Com cópias de segurança e boas práticas do RGPD. Cada pessoa vê só o que o seu perfil permite.",
  },
];

export function Guarantees() {
  return (
    <section
      id="garantias"
      aria-labelledby="garantias-title"
      className="relative overflow-x-clip py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <SectionHead kicker="Garantias" id="garantias-title" title={<>O que pode exigir de nós.</>}>
          Quatro compromissos que valem para todos os projetos, qualquer que seja o plano.
        </SectionHead>

        <ul className="mt-12 grid grid-cols-1 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <li
                key={it.title}
                data-reveal
                style={delay(i * 70)}
                className="border-t border-hair-2 py-7 sm:pr-8"
              >
                <Icon aria-hidden className="size-5 text-accent-hi" strokeWidth={1.6} />
                <h3 className="mt-5 font-display text-[21px] leading-[1.15] tracking-[-0.02em]">
                  {it.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-fg-2">{it.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
