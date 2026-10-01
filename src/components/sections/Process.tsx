import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    title: "Conversa de 30 minutos",
    text: "Explica-nos como trabalha. Mostramos-lhe o que faz sentido automatizar primeiro. Sem custos.",
  },
  {
    title: "Proposta com preço fechado",
    text: "Sabe o que vai pagar e quando fica pronto, antes de começarmos.",
  },
  {
    title: "Construção e testes",
    text: "Ligamos às ferramentas que já usa e testamos com casos reais do seu negócio.",
  },
  {
    title: "Acompanhamento",
    text: "Ficamos atentos ao funcionamento e ajustamos quando o seu negócio muda.",
  },
];

export function Process() {
  return (
    <section id="processo" className="bg-paper py-24 sm:py-32">
      <Container>
        <Reveal className="max-w-[40rem]">
          <p className="text-[14px] text-mute">Como trabalhamos</p>
          <h2 className="mt-3 text-[34px] leading-[1.1] font-medium tracking-[-0.028em] sm:text-[44px]">
            Simples para si, do primeiro dia ao último.
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.05} className="border-t border-ink pt-5">
                <span className="text-[13px] text-mute tabular-nums">0{i + 1}</span>
                <h3 className="mt-3 text-[18px] font-medium tracking-[-0.015em]">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
