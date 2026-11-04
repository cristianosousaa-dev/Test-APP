import { GridBackdrop } from "@/components/sections/GridBackdrop";
import { TaskForm } from "@/components/TaskForm";
import { Container } from "@/components/ui/Container";
import { delay } from "@/lib/delay";

const NEXT = [
  "Lemos o seu pedido. Se for preciso, marcamos 30 minutos para perceber o processo.",
  "Preparamos uma demonstração com os seus próprios dados.",
  "Recebe uma proposta escrita com âmbito, prazo e preço fixo. Só avança se aprovar.",
];

export function Cta() {
  return (
    <section
      id="contacto"
      data-loop
      aria-labelledby="contacto-title"
      className="night relative isolate overflow-hidden py-20 sm:py-36"
    >
      <GridBackdrop className="[mask-image:radial-gradient(70%_80%_at_70%_40%,#000,transparent)]" />
      <Container>
        <div className="relative">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:gap-0">
            <div className="lg:pr-14">
              <p className="kicker-n">Próximo passo</p>
              <h2
                id="contacto-title"
                data-reveal="mask"
                className="display mt-8 text-[clamp(40px,5.2vw,78px)] text-strong"
              >
                Mostre-nos o seu Excel.{" "}
                <span className="text-accent-hi">
                  <span className="whitespace-nowrap">Mostramos-lhe</span> a aplicação.
                </span>
              </h2>
              <p className="mt-7 max-w-[34rem] text-[17.5px] leading-[1.6] text-nmute">
                Descreva o processo que hoje faz em Excel ou em papel. Não precisa de termos
                técnicos: basta explicar o que é feito e quanto tempo ocupa. Respondemos com uma
                proposta de preço fixo.
              </p>
              <TaskForm tone="dark" className="mt-10 max-w-[38rem]" />
            </div>

            <div className="lg:pl-14">
              <p className="kicker-n">O que acontece a seguir</p>
              <ol className="mt-6 flex flex-col">
                {NEXT.map((t, i) => (
                  <li
                    key={t}
                    data-reveal="right"
                    style={{ ...delay(i * 120), ["--i" as string]: i }}
                    className="relative flex items-start gap-4 py-5 text-[16px] leading-[1.55] text-ntext"
                  >
                    <span aria-hidden className="rule-x rule-light absolute inset-x-0 top-0" />
                    <span className="mt-0.5 w-6 shrink-0 font-display text-[17px] text-accent-hi tabular-nums">
                      0{i + 1}
                    </span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
