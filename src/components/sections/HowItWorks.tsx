import { ArrowDown, Calendar, Check, MessageCircle, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";

/**
 * The idea in one picture: something happens → the automation handles it → it is done.
 * Each card plays a short sequence when it is revealed; a dot travels between them.
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
            i={0}
            label="Acontece algo"
            title="Um cliente envia uma mensagem"
            badge="bg-amber text-ink"
            icon={<MessageCircle className="size-5" />}
          >
            <div className="seq flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[12.5px] text-mute">
                <BrandIcon brand="whatsapp" className="size-4" />
                WhatsApp · 21:47
              </div>
              <div className="rounded-2xl rounded-bl-md bg-amber-soft px-4 py-3 text-[14px] text-ink">
                Olá! Têm vaga na sexta à tarde?
              </div>
            </div>
          </StepCard>

          <Wire d={0} />

          <StepCard
            i={1}
            label="A automação trata"
            title="Lê, consulta a agenda e responde"
            badge="bg-ink text-mint"
            icon={<Zap className="size-5" />}
          >
            <ul className="seq flex flex-col gap-2 text-[14px]">
              {["Percebe o pedido", "Vê os horários livres", "Responde ao cliente"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="grid size-5 place-items-center rounded-full bg-ink text-mint">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </StepCard>

          <Wire d={1.4} />

          <StepCard
            i={2}
            label="Fica feito"
            title="Marcação criada e lembrete agendado"
            badge="bg-brand text-white"
            icon={<Calendar className="size-5" />}
          >
            <div className="seq flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[12.5px] text-mute">
                <BrandIcon brand="googleCalendar" className="size-4" />
                Google Calendar
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-brand-soft px-4 py-3 text-[14px] ring-1 ring-brand/15">
                <span className="text-center leading-none">
                  <span className="block text-[10px] font-semibold text-brand-ink uppercase">
                    Sex
                  </span>
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
  badge,
  icon,
  children,
}: {
  i: number;
  label: string;
  title: string;
  badge: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    // Reveal and hover live on separate elements: a reveal animation would pin the transform.
    <div data-reveal style={{ ["--i" as string]: i, ["--d" as string]: `${i * 120}ms` }}>
      <div data-spot className="card group flex h-full flex-col p-6">
        <div className="flex items-center gap-3">
          <span
            className={`grid size-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 ${badge}`}
          >
            {icon}
          </span>
          <span className="text-[13px] font-semibold text-mute uppercase">
            {i + 1} · {label}
          </span>
        </div>
        <h3 className="mt-5 text-[20px] leading-snug font-semibold tracking-[-0.02em]">{title}</h3>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

/** Between two steps: an arrow on small screens, a wire with a travelling dot on large. */
function Wire({ d }: { d: number }) {
  return (
    <span aria-hidden className="grid place-items-center text-ink/40 lg:block lg:pt-[51px]">
      <ArrowDown className="size-5 lg:hidden" />
      <span
        className="relative hidden h-[2px] w-full bg-ink/12 lg:block"
        style={{ ["--travel" as string]: "46px" }}
      >
        <span
          className="absolute -top-[4px] left-0 size-2.5 animate-travel rounded-full bg-brand shadow-[0_0_0_4px_rgb(31_111_74/0.18)]"
          style={{ animationDelay: `${d}s` }}
        />
      </span>
    </span>
  );
}
