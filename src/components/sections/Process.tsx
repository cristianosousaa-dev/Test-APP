import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { delay } from "@/lib/delay";

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
    <section
      id="processo"
      aria-labelledby="processo-title"
      className="bg-night py-24 text-white sm:py-32"
    >
      <Container>
        <SectionHead
          kicker="Processo"
          id="processo-title"
          tone="dark"
          title="Do primeiro contacto à automação a funcionar."
        >
          Quatro passos, sem surpresas. Em cada um sabe exatamente o que recebe.
        </SectionHead>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={delay(i * 90)}
              className="group flex flex-col rounded-[24px] bg-night-2 p-6 ring-1 ring-night-line transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-night-3"
            >
              <span className="text-[56px] leading-none font-semibold tracking-[-0.05em] text-lime tabular-nums">
                0{i + 1}
              </span>
              <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-white/65">{s.text}</p>
              <p className="mt-auto border-t border-night-line pt-4 text-[14px]">
                <span className="block text-white/50">Recebe</span>
                <span className="font-medium">{s.gets}</span>
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
