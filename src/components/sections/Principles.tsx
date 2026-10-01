import { Activity, Plug, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const small = [
  {
    icon: Plug,
    title: "Usa as ferramentas que já tem",
    text: "Sem migrações nem software novo para a equipa aprender.",
  },
  {
    icon: Activity,
    title: "Acompanhado de perto",
    text: "Vigiamos o funcionamento e ajustamos quando o negócio muda.",
  },
  {
    icon: ShieldCheck,
    title: "Pensado para o RGPD",
    text: "Acessos mínimos, dados tratados com cuidado e tudo documentado.",
  },
];

export function Principles() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeader
        eyebrow="Porquê connosco"
        title="Automação séria, sem complicações"
        description="Tecnologia de ponta, explicada em linguagem simples e entregue com o cuidado de quem conhece o seu negócio."
      />
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        <Reveal className="relative overflow-hidden rounded-3xl bg-ink p-8 text-white lg:row-span-3 sm:p-10">
          <div className="bg-dots-dark absolute inset-0 opacity-70" aria-hidden />
          <div
            className="absolute -bottom-32 -left-20 size-80 rounded-full bg-accent/40 blur-3xl"
            aria-hidden
          />
          <div className="relative flex h-full flex-col">
            <span className="grid size-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
              <Sparkles className="size-5" aria-hidden />
            </span>
            <h3 className="mt-6 text-[26px] leading-tight font-semibold tracking-[-0.03em]">
              À medida, não um template
            </h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-white/65">
              Cada automação é desenhada para a forma como o seu negócio trabalha, e não o
              contrário. Juntamos regras simples e fiáveis com inteligência artificial onde ela
              acrescenta valor.
            </p>
            <ul className="mt-auto flex flex-col gap-2 pt-10 text-[14px] text-white/80">
              {["Os seus processos", "As suas ferramentas", "As suas regras e aprovações"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="size-1.5 rounded-full bg-flow" aria-hidden />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
        </Reveal>
        {small.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal
              key={s.title}
              delay={0.06 * (i + 1)}
              className="flex gap-5 rounded-3xl border border-line bg-surface p-7 lg:col-span-2"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
