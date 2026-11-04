"use client";

import { ReceiptEuro } from "lucide-react";
import { type CSSProperties, useRef, useState } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { PauseButton } from "@/components/ui/PauseButton";
import { useStepper } from "@/lib/useStepper";

/* One real flow, looped: a WhatsApp message becomes an order, goes into production and is billed.
   Steps hold for these durations; the last one is the finished state (reduced motion rests there). */
const DURATIONS = [1000, 1700, 1700, 1300, 1500, 1800, 3400] as const;

type Status = "novo" | "pendente" | "producao" | "enviado" | "faturado";
const LABEL: Record<Status, string> = {
  novo: "Novo",
  pendente: "Pendente",
  producao: "Em produção",
  enviado: "Enviado",
  faturado: "Faturado",
};

const ROWS: readonly {
  name: string;
  item: string;
  value: string;
  s: Status;
}[] = [
  {
    name: "Mecânica Rui Lda",
    item: "Caixas 40×30, 200 un.",
    value: "1 250,00 €",
    s: "producao",
  },
  {
    name: "Clínica do Parque",
    item: "Impressos de consulta",
    value: "480,00 €",
    s: "enviado",
  },
  {
    name: "Padaria Ribeiro",
    item: "Sacos kraft, 1 000 un.",
    value: "265,00 €",
    s: "producao",
  },
  {
    name: "Oficina Norte",
    item: "Caixas 60×40, 80 un.",
    value: "740,00 €",
    s: "pendente",
  },
];

/**
 * The hero's application preview, in the typographic register: a large title, underlined tabs,
 * hairline rows and one notification that drops in from the top. No frame, no cards, no gradients.
 * It is an illustration (labelled as such) and can be paused.
 */
export function HeroDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const { step, reduced } = useStepper(ref, DURATIONS, paused);

  const whatsapp = step >= 1 && step <= 3;
  const reading = step >= 2;
  const newRow = step >= 3;
  const status: Status = step >= 6 ? "faturado" : step >= 4 ? "producao" : "novo";
  const invoice = step >= 5;
  const open = newRow ? 15 : 14;

  return (
    <div>
      <div ref={ref} className="ios" aria-hidden>
        <header className="ios-head">
          <h3 className="ios-title">Encomendas</h3>
          <span key={open} className="ios-count ios-num">
            {open} em aberto
          </span>
          <span className="ios-add">+ Nova</span>
        </header>

        <div className="ios-seg">
          <b className="is-on">Todas</b>
          <b>Em curso</b>
          <b>Faturadas</b>
        </div>

        <ul className="ios-group">
          <li className="ios-row ios-new" data-on={newRow || undefined}>
            <span className="ios-main">
              <b>Frio Total</b>
              <small>Etiquetas A5, 5 000 un.</small>
            </span>
            <span className="ios-end">
              <b>312,40 €</b>
              <span className="ios-status" data-s={status}>
                <i />
                <span key={status} className="ios-swap">
                  {LABEL[status]}
                </span>
              </span>
            </span>
            <span className="ios-bar" style={{ "--bar": step >= 4 ? 1 : 0 } as CSSProperties}>
              <i />
            </span>
          </li>
          {ROWS.map((r) => (
            <li key={r.name} className="ios-row">
              <span className="ios-main">
                <b>{r.name}</b>
                <small>{r.item}</small>
              </span>
              <span className="ios-end">
                <b>{r.value}</b>
                <span className="ios-status" data-s={r.s}>
                  <i />
                  {LABEL[r.s]}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="ios-banner" data-on={whatsapp || undefined}>
          <span className="ios-app">
            <BrandIcon brand="whatsapp" className="size-[28px]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="ios-banner-top">
              <b>WhatsApp</b>
              <small>agora</small>
            </span>
            <span className="ios-banner-body">
              Frio Total: Preciso de 5 000 etiquetas A5 para dia 18.
            </span>
            <span className="ios-read" data-on={reading || undefined}>
              Pedido lido: A5 · 5 000 un. · 18 mar
            </span>
          </span>
        </div>
        <div className="ios-banner" data-on={invoice || undefined}>
          <span className="ios-app ios-app-bill">
            <ReceiptEuro className="size-[22px]" strokeWidth={1.7} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="ios-banner-top">
              <b>Faturação</b>
              <small>agora</small>
            </span>
            <span className="ios-banner-body">
              Fatura FT 2026/118 emitida e enviada ao cliente · 312,40 €
            </span>
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="kicker-n max-w-[22rem] text-[10.5px] leading-[1.7]">
          Exemplo ilustrativo: de um pedido por WhatsApp à fatura emitida
        </p>
        {!reduced && <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} />}
      </div>
    </div>
  );
}
