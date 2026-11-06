// biome-ignore-all lint/a11y/useValidAnchor: These fragment links navigate to the brief and preselect the chosen plan.
"use client";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import StarBorder from "@/components/react-bits/StarBorder";
import { selectBriefContext } from "@/lib/brief-context";
import { euros, plans } from "@/lib/site";
import { useTheme } from "@/lib/theme";

const choosePlan = (id: string, plan: string) =>
  selectBriefContext({
    service: id === "automacao" ? "Automação e integrações" : "Software à medida",
    plan,
  });

export function CompactPricing({ paused }: { paused: boolean }) {
  const lightButton = useTheme() === "dark";
  return (
    <div className="compact-pricing">
      {plans.map((plan) => {
        const points =
          plan.id === "aplicacao"
            ? [plan.includes[0], plan.includes[1], plan.includes[4], plan.includes[5]]
            : plan.id === "plataforma"
              ? [plan.includes[0], plan.includes[2], plan.includes[3], plan.includes[5]]
              : plan.includes;
        return (
          <article
            key={plan.id}
            className="compact-plan"
            data-featured={plan.featured || undefined}
            data-reveal
          >
            <div className="compact-plan-header">
              <h3>{plan.name}</h3>
              {plan.featured ? (
                <span className="recommended-plan">
                  <span />
                  Recomendado
                </span>
              ) : (
                <span className="plan-category">
                  {plan.id === "automacao" ? "LIGAR" : "ESCALAR"}
                </span>
              )}
            </div>
            <p className="compact-plan-summary">{plan.summary}</p>
            <div className="compact-plan-price">
              <span>Implementação desde</span>
              <strong>{euros(plan.setup)}</strong>
              <p>
                + desde <b>{euros(plan.monthly)}/mês</b> de acompanhamento
              </p>
            </div>
            <ul>
              {points.map(
                (point) =>
                  point && (
                    <li key={point}>
                      <Check size={15} />
                      <span>{point}</span>
                    </li>
                  ),
              )}
            </ul>
            <div className="compact-plan-action">
              {plan.featured && !paused ? (
                <StarBorder
                  as="a"
                  href="#contacto"
                  onClick={() => choosePlan(plan.id, plan.name)}
                  className="featured-plan-button"
                  radius={12}
                  thickness={1.5}
                  duration={14}
                  hover="brighten"
                  trailLength={0.5}
                  glow={0.3}
                  sparkle={false}
                  clickPulse={false}
                  theme={lightButton ? "light" : "dark"}
                  color={lightButton ? "#456bb8" : "#b9d0ff"}
                  trailColor={lightButton ? "#9aaed7" : "#507bc8"}
                  backgroundColor="var(--button-surface)"
                  textColor="var(--button-text)"
                  borderColor="var(--button-track)"
                >
                  Pedir proposta
                  <ArrowUpRight size={17} />
                </StarBorder>
              ) : (
                <a
                  href="#contacto"
                  onClick={() => choosePlan(plan.id, plan.name)}
                  className={`action ${plan.featured ? "static-featured-button" : "action-outline"}`}
                >
                  Pedir proposta
                  <ArrowUpRight size={17} />
                </a>
              )}
              <p>{plan.lead.replace("Prazo típico: ", "")}</p>
            </div>
            <details className="plan-details">
              <summary>
                Ver tudo o que inclui
                <ChevronDown size={13} />
              </summary>
              <div>
                <ul>
                  {plan.includes.map((item) => (
                    <li key={item}>
                      <Check size={12} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </article>
        );
      })}
    </div>
  );
}
