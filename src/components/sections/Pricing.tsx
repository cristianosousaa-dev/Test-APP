import { Check } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { euros, pricing, proposalHref } from "@/lib/site";

const PLANS = [
  {
    name: "Uma automação",
    text: "Um processo, de ponta a ponta. Por exemplo: marcações por WhatsApp ou lembretes de faturas em atraso.",
    price: pricing.single,
  },
  {
    name: "Processos ligados",
    text: "Dois ou três processos que passam informação entre si. Por exemplo: orçamento, fatura e cobrança.",
    price: pricing.bundle,
    featured: true,
  },
  {
    name: "À medida",
    text: "Vários sistemas, programas de gestão como PHC ou Primavera, ou volume elevado de pedidos.",
    price: null,
  },
] as const;

const INCLUDED = [
  "Análise da tarefa, sem custo",
  "Integração nos sistemas que já utiliza",
  "Testes com casos reais antes de entrar em produção",
  "Registo de cada execução",
  "A sua aprovação nos passos que escolher",
];

export function Pricing() {
  return (
    <section id="precos" aria-labelledby="precos-title" className="relative py-28 sm:py-40">
      <Container>
        <SectionHead
          index="05"
          kicker="Preços"
          id="precos-title"
          title={
            <>
              Preço fixo, <span className="text-accent">conhecido antes de começar.</span>
            </>
          }
        >
          Paga a implementação uma vez e uma mensalidade que cobre o alojamento, a monitorização e
          os ajustes. O valor exato fica escrito na proposta, depois de percebermos a sua tarefa.
        </SectionHead>

        <ul className="mt-14 grid grid-cols-1 gap-[2px] lg:grid-cols-3">
          {PLANS.map((p, i) => {
            const dark = "featured" in p && p.featured;
            return (
              <li
                key={p.name}
                data-reveal
                style={{ ["--i" as string]: i }}
                data-spot
                className={
                  dark ? "panel-navy plan-featured relative z-10" : "tile spot overflow-hidden"
                }
              >
                <div className="flex h-full min-h-[340px] flex-col p-6 sm:p-8">
                  {dark && <span aria-hidden className="marker top-0 left-0" />}
                  <div className="flex items-center justify-between gap-4">
                    <span className={dark ? "badge badge-light" : "badge"}>0{i + 1}</span>
                    {dark && <span className="label text-[10.5px] text-white/60">Recomendado</span>}
                  </div>
                  <h3 className="mt-6 text-[24px] tracking-[-0.02em]">{p.name}</h3>
                  <p
                    className={`mt-2 text-[15px] leading-[1.6] ${dark ? "text-white/70" : "text-fg-2"}`}
                  >
                    {p.text}
                  </p>

                  <div className="mt-auto pt-10">
                    {p.price ? (
                      <dl className="flex flex-col">
                        <div className="flex items-baseline justify-between gap-4 pb-3">
                          <dt
                            className={`label text-[10.5px] ${dark ? "text-white/60" : "text-fg-3"}`}
                          >
                            Implementação
                          </dt>
                          <dd className="font-display text-[40px] leading-none tracking-[-0.04em] tabular-nums">
                            <span
                              className={`mr-1.5 text-[13px] tracking-normal ${dark ? "text-white/60" : "text-fg-3"}`}
                            >
                              desde
                            </span>
                            {euros(p.price.setup)}
                          </dd>
                        </div>
                        <div className={`rule-x ${dark ? "rule-light" : ""}`} />
                        <div className="flex items-baseline justify-between gap-4 pt-3">
                          <dt
                            className={`label text-[10.5px] ${dark ? "text-white/60" : "text-fg-3"}`}
                          >
                            Manutenção
                          </dt>
                          <dd className="text-[18px] tabular-nums">
                            {euros(p.price.monthly)}
                            <span className={dark ? "text-white/60" : "text-fg-3"}> / mês</span>
                          </dd>
                        </div>
                      </dl>
                    ) : (
                      <p className="font-display text-[40px] leading-none tracking-[-0.04em]">
                        Sob proposta
                      </p>
                    )}
                    <LinkButton
                      href={proposalHref}
                      variant={dark ? "light" : "mist"}
                      className="mt-8 w-full"
                    >
                      Descrever a minha tarefa
                    </LinkButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div data-reveal className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
          <p className="label shrink-0 pt-1 text-[11px] text-fg-2 lg:w-[calc(33.33%-1.5rem)]">
            Incluído em todos
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {INCLUDED.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-[15px] text-fg-2">
                <span className="grid size-[17px] shrink-0 place-items-center bg-mint text-navy">
                  <Check className="size-[11px]" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 font-mono text-[11px] text-fg-3 lg:ml-[calc(33.33%+0.5rem)]">
          Valores sem IVA. Custos de terceiros (por exemplo, a API do WhatsApp) são indicados na
          proposta.
        </p>
      </Container>
    </section>
  );
}
