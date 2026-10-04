import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { HeroFlow } from "@/components/sections/HeroFlow";
import { TaskForm } from "@/components/TaskForm";
import { Container } from "@/components/ui/Container";
import { delay } from "@/lib/delay";
import { site } from "@/lib/site";

/* What the visitor can count on, stated plainly. Commitments, not metrics. */
const ASSURANCES = [
  ["Preço fixo", "Acordado por escrito antes de começar"],
  ["Sem mudar de software", "Funciona nos sistemas que já utiliza"],
  ["Sempre no seu controlo", "Aprovação humana nos passos que escolher"],
  ["Manutenção incluída", "Monitorização e ajustes contínuos"],
] as const;

export function Hero() {
  return (
    <section
      id="top"
      data-loop
      className="relative isolate -mt-[76px] pt-[100px] pb-16 sm:pt-[124px] sm:pb-20 lg:pt-[100px] lg:pb-24"
    >
      <HeroBackdrop />
      <Container className="relative">
        {/* No construction rules here: the background grid is the hero's structure. */}
        <div className="relative grid grid-cols-1 gap-10 pt-4 sm:gap-12 sm:pt-8 lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] lg:gap-0 lg:pt-0">
          <div className="relative z-10 flex flex-col lg:pt-6 lg:pr-14">
            <p data-rise className="label flex items-center gap-2.5 text-[11px] text-fg-2">
              <span className="size-1.5 bg-accent" />
              Automação de processos para PME
            </p>
            <h1
              data-rise="mask"
              style={delay(80)}
              className="display mt-5 text-[clamp(38px,3.7vw,56px)]"
            >
              Quantas horas perde a sua equipa{" "}
              <span className="text-accent">em tarefas repetitivas?</span>
            </h1>
            <p
              data-rise
              style={delay(200)}
              className="mt-5 max-w-[36rem] text-[16.5px] leading-[1.6] text-fg-2"
            >
              Responder aos mesmos pedidos, copiar dados entre programas, cobrar faturas. A{" "}
              {site.name} automatiza esse trabalho para PME em Portugal, nos sistemas que a sua
              empresa já utiliza.
            </p>
            <div data-rise style={delay(280)} className="mt-7 max-w-[36rem]">
              <TaskForm />
            </div>
          </div>

          <div data-rise style={delay(200)} className="relative z-10 lg:pl-14">
            <HeroFlow />
          </div>
        </div>

        {/* Assurances: a hairline row closing the hero. */}
        <div aria-hidden className="mt-16 lg:mt-20" />
        <ul
          data-rise
          style={delay(420)}
          className="relative grid grid-cols-2 gap-y-6 pt-6 lg:grid-cols-4"
        >
          {ASSURANCES.map(([title, text]) => (
            <li key={title} className="relative pr-6 lg:px-6 lg:first:pl-0">
              <p className="text-[16px] tracking-[-0.01em]">{title}</p>
              <p className="mt-1 text-[13.5px] leading-[1.5] text-fg-3">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
