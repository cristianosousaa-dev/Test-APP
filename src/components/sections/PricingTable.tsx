import { ArrowRight, Check } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { ThemedStarBorder } from "@/components/ui/ThemedReactBits";
import { euros, plans, proposalHref } from "@/lib/site";

/** Three open columns, separated by hairlines: name, price, four points and one action each. */
export function PricingTable() {
  return (
    <div className="fl-scope pc-cols">
      {plans.map((p) => (
        <article key={p.id} className="pc-col" data-f={p.featured || undefined}>
          <p className="pc-tag">{p.featured ? "Recomendado" : " "}</p>
          <h3 className="pc-name">{p.name}</h3>
          <p className="pc-sum">{p.summary}</p>

          <p className="pc-price">{euros(p.setup)}</p>
          <p className="pc-month">
            + {euros(p.monthly)} por mês · {p.lead.replace("Prazo típico: ", "")}
          </p>

          <ul className="pc-list">
            {p.includes.slice(0, 4).map((it) => (
              <li key={it}>
                <Check aria-hidden className="size-4 shrink-0" strokeWidth={2.2} />
                {it}
              </li>
            ))}
          </ul>

          {p.featured ? (
            <ThemedStarBorder
              as="a"
              href={proposalHref}
              radius={7}
              thickness={1.5}
              duration={5}
              trailLength={0.5}
              glow={1}
              className="h-10 px-5! py-0! text-[13px] font-semibold"
            >
              Pedir proposta
              <ArrowRight aria-hidden className="size-4" strokeWidth={1.8} />
            </ThemedStarBorder>
          ) : (
            <LinkButton href={proposalHref} variant="mist" size="md">
              Pedir proposta
            </LinkButton>
          )}
        </article>
      ))}
    </div>
  );
}
