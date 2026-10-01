import { ArrowDown, Calendar, Check, MessageCircle, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { delay } from "@/lib/delay";

/**
 * The idea in one picture: something happens → the automation handles it → it is done.
 * A lime dot travels between the steps (CSS transform, paused off-screen).
 */
export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      data-loop
      aria-labelledby="como-funciona-title"
      className="py-24 sm:py-32"
    >
      <Container>
        <SectionHead
          kicker="Como funciona"
          id="como-funciona-title"
          title="Uma automação tem três partes. Nós ligamo-las."
        >
          Quando acontece alguma coisa no seu negócio, a automação trata do resto e deixa tudo
          registado. Sem ninguém ter de mexer.
        </SectionHead>

        <div className="mt-14 grid gap-3 lg:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)_56px_minmax(0,1fr)] lg:gap-0">
          <StepCard
            n="1"
            label="Acontece algo"
            title="Um cliente envia uma mensagem"
            tone="violet"
            icon={<MessageCircle className="size-5" />}
            d={0}
          >
            <div className="rounded-2xl rounded-bl-md bg-violet-soft px-4 py-3 text-[14px] text-ink">
              Olá! Têm vaga na sexta à tarde?
              <span className="mt-1 block text-[11.5px] text-ink-2">WhatsApp · 21:47</span>
            </div>
          </StepCard>

          <Wire d={0} />

          <StepCard
            n="2"
            label="A automação trata"
            title="Lê, consulta a agenda e responde"
            tone="dark"
            icon={<Zap className="size-5" />}
            d={100}
          >
            <ul className="flex flex-col gap-2 text-[14px]">
              {["Percebe o pedido", "Vê os horários livres", "Responde ao cliente"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="grid size-5 place-items-center rounded-full bg-ink text-lime">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </StepCard>

          <Wire d={1.4} />

          <StepCard
            n="3"
            label="Fica feito"
            title="Marcação criada e lembrete agendado"
            tone="lime"
            icon={<Calendar className="size-5" />}
            d={200}
          >
            <div className="flex items-center gap-3 rounded-2xl bg-lime-soft px-4 py-3 text-[14px] ring-1 ring-lime-2/60">
              <span className="text-center leading-none">
                <span className="block text-[10px] font-semibold text-lime-ink uppercase">Sex</span>
                <span className="block text-[20px] font-semibold">2</span>
              </span>
              <span>
                <span className="block font-medium">15:30 · Limpeza</span>
                <span className="block text-[12.5px] text-ink-2">
                  Marta Costa · lembrete na véspera
                </span>
              </span>
            </div>
          </StepCard>
        </div>
      </Container>
    </section>
  );
}

function StepCard({
  n,
  label,
  title,
  tone,
  icon,
  d,
  children,
}: {
  n: string;
  label: string;
  title: string;
  tone: "violet" | "dark" | "lime";
  icon: ReactNode;
  d: number;
  children: ReactNode;
}) {
  const badge = {
    violet: "bg-violet text-white",
    dark: "bg-ink text-lime",
    lime: "bg-lime text-ink",
  }[tone];
  return (
    <div
      data-reveal
      style={delay(d)}
      className="card flex flex-col p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_var(--color-line),0_20px_40px_-20px_rgb(14_15_18/0.25)]"
    >
      <div className="flex items-center gap-3">
        <span className={`grid size-12 place-items-center rounded-2xl ${badge}`}>{icon}</span>
        <span className="text-[13px] font-semibold text-mute uppercase">
          {n} · {label}
        </span>
      </div>
      <h3 className="mt-5 text-[20px] leading-snug font-semibold tracking-[-0.02em]">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

/** Between two steps: an arrow on small screens, a wire with a travelling dot on large. */
function Wire({ d }: { d: number }) {
  return (
    <span aria-hidden className="grid place-items-center text-ink/40 lg:block lg:pt-[51px]">
      <ArrowDown className="size-5 lg:hidden" />
      <span
        className="relative hidden h-[2px] w-full bg-ink/15 lg:block"
        style={{ ["--travel" as string]: "46px" }}
      >
        <span
          className="absolute -top-[4px] left-0 size-2.5 animate-travel rounded-full bg-lime shadow-[0_0_0_4px_rgb(212_255_58/0.35)]"
          style={{ animationDelay: `${d}s` }}
        />
      </span>
    </span>
  );
}
