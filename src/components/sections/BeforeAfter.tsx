import { Check, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const pairs = [
  {
    before: "Responder às mesmas perguntas, dia após dia",
    after: "Respostas imediatas e consistentes, a qualquer hora",
  },
  {
    before: "Copiar dados entre o email, o Excel e a faturação",
    after: "Dados que passam sozinhos entre os seus sistemas",
  },
  {
    before: "Lembrar clientes de pagamentos e marcações à mão",
    after: "Lembretes e cobranças enviados no momento certo",
  },
  {
    before: "Pedidos que chegam fora de horas e ficam esquecidos",
    after: "Cada pedido registado, respondido e acompanhado",
  },
];

export function BeforeAfter() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeader
        eyebrow="O problema"
        title="O trabalho repetitivo custa mais do que parece"
        description="Horas por semana gastas em tarefas que seguem sempre as mesmas regras. É exatamente aí que entram as automações."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        <Reveal className="rounded-3xl border border-line bg-surface p-7 sm:p-9">
          <p className="text-[13px] font-medium text-muted">Hoje, sem automações</p>
          <ul className="mt-6 flex flex-col gap-4">
            {pairs.map((p) => (
              <li key={p.before} className="flex items-start gap-3 text-[15.5px] text-ink-2">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-page ring-1 ring-line">
                  <X className="size-3 text-faint" aria-hidden />
                </span>
                {p.before}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal
          delay={0.12}
          className="relative overflow-hidden rounded-3xl border border-accent/25 bg-surface p-7 shadow-float sm:p-9"
        >
          <div
            className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-accent/10 blur-3xl"
            aria-hidden
          />
          <p className="relative text-[13px] font-medium text-accent">Com as suas automações</p>
          <ul className="relative mt-6 flex flex-col gap-4">
            {pairs.map((p) => (
              <li
                key={p.after}
                className="flex items-start gap-3 text-[15.5px] font-medium text-ink"
              >
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ok text-white">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                {p.after}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
