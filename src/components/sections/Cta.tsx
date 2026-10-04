import { OrchestrMark } from "@/components/brand/OrchestrLogo";
import { TaskForm } from "@/components/TaskForm";
import { Container } from "@/components/ui/Container";
import { delay } from "@/lib/delay";

const NEXT = [
  "Lemos o seu pedido. Se for preciso, marcamos 30 minutos para perceber o processo.",
  "Recebe uma proposta escrita com âmbito, prazo e preço fixo.",
  "Só avança se aprovar. Até lá, não há qualquer compromisso.",
];

export function Cta() {
  return (
    <section
      id="contacto"
      data-loop
      aria-labelledby="contacto-title"
      className="section-dark relative isolate mt-8 overflow-hidden py-24 sm:py-36"
    >
      {/* The brand mark, whole, turning slowly in the lower right corner of the band. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[3%] bottom-[6%] -z-10 hidden opacity-[0.07] xl:block"
      >
        <OrchestrMark className="size-[380px] animate-orbit" id="orx-cta-orbit" />
      </div>
      <Container>
        <div className="relative">
          <div aria-hidden className="rule-x rule-light absolute inset-x-0 -top-10 sm:-top-16" />
          <span aria-hidden className="marker -top-[43px] -left-[3px] sm:-top-[67px]" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:gap-0">
            <div className="lg:pr-14">
              <p className="flex items-center gap-3">
                <span className="badge badge-light">09</span>
                <span className="label text-white/70">Próximo passo</span>
              </p>
              <h2
                id="contacto-title"
                data-reveal="mask"
                className="display mt-8 text-[clamp(40px,5vw,72px)] text-white"
              >
                Comece por <span className="text-[#8fa9ff]">descrever a tarefa.</span>
              </h2>
              <p className="mt-6 max-w-[32rem] text-[17px] leading-[1.6] text-white/75">
                Não precisa de conhecer termos técnicos. Basta explicar o que é feito hoje à mão e
                quanto tempo ocupa. Analisamos o pedido e respondemos com uma proposta.
              </p>
              <TaskForm tone="dark" className="mt-10 max-w-[36rem]" />
            </div>

            <div className="lg:pl-14">
              <p className="label text-white/60">O que acontece a seguir</p>
              <ol className="mt-6 flex flex-col">
                {NEXT.map((t, i) => (
                  <li
                    key={t}
                    data-reveal="right"
                    style={{ ...delay(i * 120), ["--i" as string]: i }}
                    className="relative flex items-start gap-4 py-5 text-[16px] leading-[1.55] text-white/85"
                  >
                    <span aria-hidden className="rule-x rule-light absolute inset-x-0 top-0" />
                    <span className="badge badge-light mt-0.5 shrink-0">0{i + 1}</span>
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
