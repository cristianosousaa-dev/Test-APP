import { ArrowDown, CalendarCheck, Check, MessageCircle, Workflow } from "lucide-react";
import type { ReactNode } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

/**
 * The solution in one picture: something happens → Orchestr handles it → it is done.
 * Each card plays a short sequence when revealed; a signal travels between them.
 */
export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      data-loop
      aria-labelledby="como-funciona-title"
      className="relative py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(50%_60%_at_50%_0%,rgb(61_224_160/0.08),transparent)]"
      />
      <Container>
        <SectionHead
          index="02"
          kicker="A solução"
          id="como-funciona-title"
          align="center"
          title="Cada evento desencadeia o processo certo, automaticamente."
        >
          Cada automação integra os sistemas que já utiliza. Quando ocorre um evento, o processo é
          executado de ponta a ponta e fica registado, sem intervenção manual.
        </SectionHead>

        <div className="mt-16 grid gap-3 lg:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)_64px_minmax(0,1fr)] lg:gap-0">
          <StepCard
            i={0}
            label="Evento"
            title="Pedido de marcação recebido"
            icon={<MessageCircle className="size-[18px]" />}
            tone="indigo"
          >
            <div className="seq flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-[10.5px] text-mute">
                <BrandIcon brand="whatsapp" className="size-4" />
                WHATSAPP · 21:47
              </div>
              <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[14px] text-ink shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
                Olá! Têm vaga na sexta à tarde?
              </div>
              <div className="flex items-center gap-2 px-1 pt-1 text-[12.5px] text-ink-2">
                <span className="size-1.5 rounded-full bg-amber" />
                Recebido fora do horário de atendimento.
              </div>
            </div>
          </StepCard>

          <Wire d={0} />

          <StepCard
            i={1}
            label="Processamento"
            title="Interpretação, consulta da agenda e resposta"
            icon={<Workflow className="size-[18px]" />}
            tone="white"
          >
            <ul className="seq flex flex-col gap-2 text-[14px] text-ink">
              {["Interpreta o pedido", "Verifica a disponibilidade", "Responde ao cliente"].map(
                (t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
                  >
                    <span className="grid size-5 place-items-center rounded-full bg-ink text-mint">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ),
              )}
            </ul>
          </StepCard>

          <Wire d={1.4} />

          <StepCard
            i={2}
            label="Resultado"
            title="Marcação registada e lembrete programado"
            icon={<CalendarCheck className="size-[18px]" />}
            tone="accent"
          >
            <div className="seq flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-[10.5px] text-mute">
                <BrandIcon brand="googleCalendar" className="size-4" />
                GOOGLE CALENDAR
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-[14px] text-ink shadow-[0_0_0_2px_var(--color-brand)]">
                <span className="text-center leading-none">
                  <span className="block font-mono text-[9.5px] text-brand-ink">SEX</span>
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
          </StepCard>
        </div>
      </Container>
    </section>
  );
}

function StepCard({
  i,
  label,
  title,
  icon,
  tone,
  children,
}: {
  i: number;
  label: string;
  title: string;
  icon: ReactNode;
  tone: "indigo" | "white" | "accent";
  children: ReactNode;
}) {
  const badge = {
    indigo: "bg-indigo/15 text-indigo ring-indigo/30",
    white: "bg-white/10 text-fg ring-white/15",
    accent: "bg-accent/15 text-accent ring-accent/30",
  }[tone];
  return (
    // Reveal and hover live on separate elements: a reveal animation would pin the transform.
    <div data-reveal style={{ ["--i" as string]: i }}>
      <div data-spot className="surface group flex h-full flex-col p-6">
        <span className="spot-glow" />
        <div className="flex items-center gap-3">
          <span
            className={`grid size-10 place-items-center rounded-xl ring-1 transition-transform duration-300 group-hover:-rotate-6 ${badge}`}
          >
            {icon}
          </span>
          <span className="kicker !text-[10.5px]">
            0{i + 1} · {label}
          </span>
        </div>
        <h3 className="mt-5 text-[19px] leading-snug font-semibold tracking-[-0.02em]">{title}</h3>
        <div className="mt-5 rounded-2xl bg-paper p-3">{children}</div>
      </div>
    </div>
  );
}

/** Between two steps: an arrow on small screens, a wire with a travelling signal on large. */
function Wire({ d }: { d: number }) {
  return (
    <span aria-hidden className="grid place-items-center text-fg-3 lg:block lg:pt-[44px]">
      <ArrowDown className="size-5 lg:hidden" />
      <span
        className="relative mx-2 hidden h-px bg-gradient-to-r from-white/5 via-white/25 to-white/5 lg:block"
        style={{ ["--travel" as string]: "40px" }}
      >
        <span
          className="absolute -top-[3px] left-0 size-[7px] animate-travel rounded-full bg-accent shadow-[0_0_12px_2px_rgb(61_224_160/0.6)]"
          style={{ animationDelay: `${d}s` }}
        />
      </span>
    </span>
  );
}
