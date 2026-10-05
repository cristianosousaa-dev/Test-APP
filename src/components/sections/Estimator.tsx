"use client";

import { useId, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { proposalHref } from "@/lib/site";

/* Working days in a month; the only assumption in the estimate, and it is stated on screen. */
const DAYS = 22;

const FIELDS = [
  { key: "tasks", label: "Tarefas repetitivas por dia", min: 5, max: 100, step: 5, unit: "" },
  { key: "minutes", label: "Minutos em cada uma", min: 1, max: 20, step: 1, unit: " min" },
  { key: "rate", label: "Custo por hora da equipa", min: 8, max: 40, step: 1, unit: " €" },
] as const;
type Key = (typeof FIELDS)[number]["key"];

const fmt = (n: number) => Math.round(n).toLocaleString("pt-PT");

/**
 * Time-cost estimator. Every number comes from the visitor's own inputs: the page claims
 * nothing about results, it lets the reader see the size of their own problem.
 */
export function Estimator() {
  const id = useId();
  const [v, setV] = useState<Record<Key, number>>({ tasks: 25, minutes: 4, rate: 12 });
  const hours = (v.tasks * v.minutes * DAYS) / 60;
  const yearly = hours * 12 * v.rate;

  return (
    <div
      data-reveal
      className="grid grid-cols-1 gap-[2px] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
    >
      <div className="tile p-6 sm:p-8">
        <p className="label text-[11px] text-fg-2">Calcule o tempo que está a perder</p>
        <div className="mt-6 flex flex-col gap-6">
          {FIELDS.map((f) => {
            const fill = `${((v[f.key] - f.min) / (f.max - f.min)) * 100}%`;
            return (
              <div key={f.key}>
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={`${id}-${f.key}`} className="text-[15px] text-fg-2">
                    {f.label}
                  </label>
                  <output
                    htmlFor={`${id}-${f.key}`}
                    className="text-[20px] tracking-[-0.02em] tabular-nums"
                  >
                    {v[f.key]}
                    {f.unit}
                  </output>
                </div>
                <input
                  id={`${id}-${f.key}`}
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={v[f.key]}
                  aria-valuetext={`${v[f.key]}${f.unit}`}
                  onChange={(e) => setV((p) => ({ ...p, [f.key]: Number(e.target.value) }))}
                  className="range mt-2"
                  style={{ ["--fill" as string]: fill }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel-navy flex flex-col p-6 sm:p-8">
        <p className="label text-[11px] text-white/60">Por mês</p>
        <p
          role="status"
          aria-atomic="true"
          className="mt-3 text-[clamp(48px,6vw,80px)] leading-none tracking-[-0.045em] tabular-nums"
        >
          {fmt(hours)} <span className="text-[0.4em] tracking-[-0.01em] text-white/65">horas</span>
        </p>
        <div className="rule-x rule-light mt-6" />
        <div className="flex items-baseline justify-between gap-4 pt-4">
          <p className="label text-[10.5px] text-white/60">Custo estimado por ano</p>
          <p className="text-[24px] tracking-[-0.02em] tabular-nums">{fmt(yearly)} €</p>
        </div>
        <p className="mt-4 text-[13px] leading-[1.55] text-white/90">
          Estimativa com {DAYS} dias úteis por mês, calculada apenas com os valores que indicou.
        </p>
        <LinkButton href={proposalHref} variant="light" className="mt-8 w-full lg:mt-auto">
          Recuperar este tempo
        </LinkButton>
      </div>
    </div>
  );
}
