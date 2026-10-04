import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

/**
 * The solution in one picture: event → processing → result. Three columns on the grid; a
 * signal square travels along the rule that links them. Each mock plays a short sequence
 * when revealed.
 */
export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      data-loop
      aria-labelledby="como-funciona-title"
      className="section-dark relative py-20 sm:py-32 lg:py-40"
    >
      <Container>
        <SectionHead
          index="02"
          kicker="A solução"
          tone="dark"
          id="como-funciona-title"
          title={
            <>
              Quando algo acontece,{" "}
              <span className="text-[#8fa9ff]">a automação trata do resto.</span>
            </>
          }
        >
          Uma mensagem, um email ou uma fatura dão início ao processo. A automação executa cada
          passo nos seus sistemas e deixa tudo registado, sem intervenção da equipa.
        </SectionHead>

        <div className="relative mt-16 [container-type:inline-size]">
          {/* The link between steps: a rule with a travelling signal (desktop). */}
          <div aria-hidden className="absolute inset-x-0 top-[11px] hidden lg:block">
            <div data-draw="x" className="rule-x rule-light" />
            <span
              className="absolute -top-px left-0 h-[3px] w-28 animate-travel bg-gradient-to-r from-accent/0 via-accent/60 to-accent"
              style={{ ["--travel" as string]: "calc(100cqw - 7rem)" }}
            />
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-0">
            <Step i={0} label="Evento" title="Pedido de marcação recebido">
              <div className="seq flex flex-col gap-2">
                <div className="flex items-center gap-2 font-mono text-[10.5px] text-white/55">
                  <BrandIcon brand="whatsapp" className="size-4" />
                  WHATSAPP · 21:47
                </div>
                <div className="rounded-md bg-white px-4 py-3 text-[14px] text-ink shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
                  Olá! Têm vaga na sexta à tarde?
                </div>
                <div className="flex items-center gap-2 px-1 pt-1 text-[12.5px] text-white/70">
                  <span className="size-1.5 bg-amber" />
                  Recebido fora do horário de atendimento.
                </div>
              </div>
            </Step>

            <Step i={1} label="Processamento" title="Interpretação, consulta da agenda e resposta">
              <ul className="seq flex flex-col gap-2 text-[14px] text-ink">
                {["Interpreta o pedido", "Verifica a disponibilidade", "Responde ao cliente"].map(
                  (t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2.5 rounded-md bg-white px-3 py-2 shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
                    >
                      <span className="grid size-5 place-items-center bg-ink text-white">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ),
                )}
              </ul>
            </Step>

            <Step i={2} label="Resultado" title="Marcação registada e lembrete programado">
              <div className="seq flex flex-col gap-2">
                <div className="flex items-center gap-2 font-mono text-[10.5px] text-white/55">
                  <BrandIcon brand="googleCalendar" className="size-4" />
                  GOOGLE CALENDAR
                </div>
                <div className="flex items-center gap-3 rounded-md bg-white px-4 py-3 text-[14px] text-ink shadow-[inset_0_0_0_2px_var(--color-accent)]">
                  <span className="text-center leading-none">
                    <span className="block font-mono text-[9.5px] text-accent">SEX</span>
                    <span className="block text-[20px] font-semibold">2</span>
                  </span>
                  <span>
                    <span className="block font-medium">15:30 · Limpeza</span>
                    <span className="block text-[12.5px] text-ink-2">
                      Marta Costa · lembrete na véspera
                    </span>
                  </span>
                </div>
              </div>
            </Step>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Step({
  i,
  label,
  title,
  children,
}: {
  i: number;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      data-reveal
      style={{ ["--i" as string]: i }}
      className="relative lg:px-7 lg:first:pl-0 lg:last:pr-0"
    >
      {i > 0 && (
        <span
          aria-hidden
          className="rule-y rule-light absolute top-10 bottom-0 left-0 hidden lg:block"
        />
      )}
      <div className="flex items-center gap-3">
        <span className="badge badge-light relative z-10">0{i + 1}</span>
        <span className="label relative z-10 bg-[#06122a] px-2 text-white/70">{label}</span>
      </div>
      <h3 className="mt-6 max-w-[22rem] text-[22px] leading-snug tracking-[-0.02em]">{title}</h3>
      <div className="mt-6 bg-white/[0.06] p-3 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]">
        {children}
      </div>
    </div>
  );
}
