"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
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

/* The thumb follows the pointer continuously; the value shown and used snaps to the field's step. */
const snap = (f: (typeof FIELDS)[number], x: number) =>
  Math.min(f.max, Math.max(f.min, Math.round(x / f.step) * f.step));

const fmt = (n: number) => Math.round(n).toLocaleString("pt-PT", { useGrouping: "always" });

/* Eases a displayed number towards its target. Reduced motion: it jumps. */
function useTween(target: number) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 500);
      const v = start + (target - start) * (1 - (1 - k) ** 3);
      from.current = v;
      setValue(v);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

/**
 * Time-cost estimator. Every number comes from the visitor's own inputs: the page claims
 * nothing about results, it lets the reader see the size of their own problem.
 */
export function Estimator() {
  const id = useId();
  const [raw, setRaw] = useState<Record<Key, number>>({ tasks: 25, minutes: 4, rate: 12 });
  const v = {
    tasks: snap(FIELDS[0], raw.tasks),
    minutes: snap(FIELDS[1], raw.minutes),
    rate: snap(FIELDS[2], raw.rate),
  };

  // Native arrows would move one raw unit (step="any"); move by the field's own step instead.
  function onKey(f: (typeof FIELDS)[number], e: KeyboardEvent<HTMLInputElement>) {
    const dir = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    setRaw((p) => ({ ...p, [f.key]: snap(f, v[f.key] + dir * f.step) }));
  }
  const hours = (v.tasks * v.minutes * DAYS) / 60;
  const yearly = hours * 12 * v.rate;
  const hoursShown = useTween(hours);
  const yearlyShown = useTween(yearly);

  return (
    <div data-reveal className="fl-scope">
      <div className="ios est">
        <div className="est-in">
          <div className="p-6 sm:p-8">
            <p className="pr-from">Calcule o tempo que está a perder</p>
            <div className="mt-6 flex flex-col gap-6">
              {FIELDS.map((f) => {
                const fill = `${((raw[f.key] - f.min) / (f.max - f.min)) * 100}%`;
                return (
                  <div key={f.key}>
                    <div className="flex items-baseline justify-between gap-4">
                      <label
                        htmlFor={`${id}-${f.key}`}
                        className="text-[14px] text-[var(--ios-ink-2)]"
                      >
                        {f.label}
                      </label>
                      <output
                        htmlFor={`${id}-${f.key}`}
                        className="text-[17px] font-semibold tracking-[-0.02em] tabular-nums"
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
                      step="any"
                      value={raw[f.key]}
                      aria-valuetext={`${v[f.key]}${f.unit}`}
                      onChange={(e) => setRaw((p) => ({ ...p, [f.key]: Number(e.target.value) }))}
                      onKeyDown={(e) => onKey(f, e)}
                      className="range mt-2"
                      style={{ ["--fill" as string]: fill }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="est-out flex flex-col p-6 sm:p-8">
            <p className="pr-from">Por mês</p>
            <p
              role="status"
              aria-atomic="true"
              className="mt-2 text-[clamp(34px,4vw,46px)] leading-none font-semibold tracking-[-0.04em] tabular-nums"
            >
              <span aria-hidden>
                {fmt(hoursShown)}{" "}
                <span className="text-[0.42em] font-medium tracking-[-0.01em] text-[var(--ios-ink-2)]">
                  horas
                </span>
              </span>
              <span className="sr-only">{fmt(hours)} horas</span>
            </p>
            <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-[var(--ios-sep)] pt-4">
              <p className="pr-from">Custo estimado por ano</p>
              <p className="text-[17px] font-semibold tracking-[-0.02em] tabular-nums">
                <span aria-hidden>{fmt(yearlyShown)} €</span>
                <span className="sr-only">{fmt(yearly)} €</span>
              </p>
            </div>
            <p className="mt-4 text-[13px] leading-[1.55] text-[var(--ios-ink-2)]">
              Estimativa com {DAYS} dias úteis por mês, calculada apenas com os valores que indicou.
            </p>
            <LinkButton href={proposalHref} variant="ink" className="mt-6 self-start lg:mt-auto">
              Recuperar este tempo
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
