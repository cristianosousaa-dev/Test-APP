import { cn } from "@/lib/cn";
import { SHEET_ROWS } from "./orders";

/* Columns 2 and 3 (date, product) collapse together with the application's in narrow frames. */
const HIDE_ON_NARROW = new Set([1, 2]);
const LETTERS = ["A", "B", "C", "D", "E"];

/** The spreadsheet layer: an honest, slightly messy sheet. Decorative; the parent describes it. */
export function OrdersSheet() {
  return (
    <div className="cv-layer sh">
      <div>
        <div className="sh-title h-10">
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <rect width="16" height="16" rx="2" fill="#fff" fillOpacity="0.2" />
            <path d="M4.5 4.5l7 7m0-7l-7 7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Encomendas_final_v7 (2).xlsx
        </div>
        <div className="sh-formula h-8">
          <span className="sh-ref">D5</span>
          <span aria-hidden className="text-[#1d6f42] italic">
            fx
          </span>
          <span>=#REF!</span>
        </div>
        <div className="sh-letters h-8">
          <span />
          {LETTERS.map((l, i) => (
            <span key={l} className={cn(HIDE_ON_NARROW.has(i) && "c-hide")}>
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="cv-row sh-row sh-head">
        <span className="sh-gut">1</span>
        {["Cliente", "Data", "Produto", "Valor", "Estado"].map((h, i) => (
          <span key={h} className={cn(HIDE_ON_NARROW.has(i) && "c-hide")}>
            {h}
          </span>
        ))}
      </div>

      <div>
        {SHEET_ROWS.map((row, r) => (
          <div key={row.cells[0]} className="cv-row sh-row">
            <span className="sh-gut">{r + 2}</span>
            {row.cells.map((cell, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed five-column layout.
                key={i}
                className={cn(
                  HIDE_ON_NARROW.has(i) && "c-hide",
                  row.warn?.includes(i) && "sh-warn",
                  row.err === i && "sh-err",
                  row.note === i && "sh-note",
                  r === 3 && i === 3 && "sh-sel",
                )}
              >
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="sh-tabs">
        <span className="sh-tab is-on">Folha1</span>
        <span className="sh-tab">Folha1 (2)</span>
        <span className="sh-tab">NÃO USAR</span>
      </div>
    </div>
  );
}
