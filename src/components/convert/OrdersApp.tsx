import { cn } from "@/lib/cn";
import { ORDERS, STATUS_LABEL } from "./orders";

const HIDE_ON_NARROW = new Set([1, 2]);
const COLUMNS = ["Cliente", "Data", "Produto", "Valor", "Estado"];

/**
 * The application layer: the same seven rows as OrdersSheet, designed. An honest illustration
 * of what a delivered application can look like, not a screenshot of a client's system.
 */
export function OrdersApp() {
  return (
    <div className="cv-layer ap">
      <div>
        <div className="ap-top h-14">
          <span className="ap-title">Encomendas</span>
          <span className="ap-btn">+ Nova</span>
        </div>
        <div className="ap-kpis h-12">
          <span className="ap-seg" aria-hidden>
            <b className="is-on">Todas</b>
            <b>Em curso</b>
            <b className="c-hide">Faturadas</b>
          </span>
          <span className="c-hide">14 em aberto</span>
        </div>
      </div>

      <div className="cv-row ap-row ap-head">
        <span className="ap-gut" />
        {COLUMNS.map((c, i) => (
          <span
            key={c}
            className={cn(HIDE_ON_NARROW.has(i) && "c-hide", c === "Valor" && "ap-val")}
          >
            {c}
          </span>
        ))}
      </div>

      <div>
        {ORDERS.map((o) => (
          <div key={o.client} className="cv-row ap-row">
            <span className="ap-gut" />
            <span className="text-[13px] font-medium">
              <span className="truncate">{o.client}</span>
            </span>
            <span className="c-hide ap-muted">{o.date}</span>
            <span className="c-hide ap-muted truncate">{o.item}</span>
            <span className="ap-val text-[13px] font-semibold">{o.value}</span>
            <span>
              <span className="chip-st" data-s={o.status}>
                {STATUS_LABEL[o.status]}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="ap-foot">
        <span>Mostrar 7 de 48 encomendas</span>
        <span className="c-hide tabular-nums">1 2 3</span>
      </div>
    </div>
  );
}
