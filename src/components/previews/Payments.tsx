import { Check, Wallet } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { cn } from "@/lib/cn";
import { At, Stage, Tag } from "./parts";
import type { Example, PreviewProps } from "./types";

const ROWS = [
  { who: "Clínica Dentária Sol", doc: "FT 1186", value: "320,00 €", paid: true },
  { who: "Oficina Lopes", doc: "FT 1182", value: "420,00 €", paid: false },
  { who: "Restaurante O Pátio", doc: "FT 1184", value: "96,40 €", paid: true },
];

function PaymentsPreview({ step }: PreviewProps) {
  const paid = step >= 2;
  const focus = [
    { tone: "rose", label: "Vencida há 5 dias" },
    { tone: "wait", label: "Lembrete enviado" },
    { tone: "done", label: "Paga" },
    { tone: "done", label: "Paga · lançada" },
  ][step] as { tone: "rose" | "wait" | "done"; label: string } | undefined;

  return (
    <Stage>
      <div className="absolute inset-0 flex flex-col gap-3 p-4 sm:p-5">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-line">
          <p className="text-[12px] font-semibold text-mute uppercase">Recebido em outubro</p>
          <div className="relative mt-1 h-10 text-[34px] leading-10 font-semibold tracking-[-0.03em] tabular-nums">
            <span
              className={cn(
                "absolute inset-0 transition-[opacity,transform] duration-500",
                paid ? "-translate-y-3 opacity-0" : "opacity-100",
              )}
            >
              4 320,00 €
            </span>
            <span
              className={cn(
                "absolute inset-0 transition-[opacity,transform] duration-500",
                paid ? "opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              4 740,00 €{" "}
              <span className="align-middle text-[14px] font-semibold text-brand">+420 €</span>
            </span>
          </div>
        </div>

        <ul className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
          {ROWS.map((r) => {
            const isFocus = !r.paid;
            return (
              <li
                key={r.doc}
                className={cn(
                  "flex items-center gap-3 border-b border-line px-4 py-3 text-[13.5px] transition-colors duration-500 last:border-b-0",
                  isFocus && (paid ? "bg-brand-soft" : "bg-rose-soft/60"),
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{r.who}</span>
                  <span className="text-mute">{r.doc}</span>
                </span>
                <span className="hidden tabular-nums sm:block">{r.value}</span>
                <span className="w-[150px] text-right">
                  {isFocus && focus ? (
                    <span key={focus.label} className="inline-block animate-feed-in">
                      <Tag tone={focus.tone}>
                        {focus.tone === "done" && <Check className="size-3" strokeWidth={3} />}
                        {focus.label}
                      </Tag>
                    </span>
                  ) : (
                    <Tag tone="done">
                      <Check className="size-3" strokeWidth={3} />
                      Paga
                    </Tag>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="relative mt-auto min-h-[92px]">
          <At step={step} at={1} until={3} className="absolute inset-0">
            <div className="flex h-full gap-3 rounded-2xl bg-white p-4 ring-1 ring-line">
              <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-white ring-1 ring-line">
                <BrandIcon brand="gmail" className="size-5" />
              </span>
              <div className="min-w-0 text-[13px]">
                <p className="text-mute">Para: Oficina Lopes</p>
                <p className="font-semibold">Fatura FT 1182 · lembrete amigável</p>
                <p className="truncate text-ink-2">
                  Olá! Ainda não recebemos o pagamento. Pode pagar por MB WAY.
                </p>
              </div>
            </div>
          </At>
          <At step={step} at={3} className="absolute inset-0">
            <div className="flex h-full items-center gap-3 rounded-2xl bg-ink p-4 text-white">
              <span className="grid size-9 place-items-center rounded-full bg-mint text-night">
                <Check className="size-4" strokeWidth={3} />
              </span>
              <p className="text-[13.5px]">
                Pagamento conciliado e lançado na contabilidade, sem intervenção manual.
              </p>
            </div>
          </At>
        </div>
      </div>
    </Stage>
  );
}

export const payments: Example = {
  id: "cobrancas",
  tab: "Cobranças",
  mark: Wallet,
  sector: "Qualquer empresa que emite faturas",
  title: "Cobrança de faturas vencidas, com rigor e no prazo",
  before: "Faturas em atraso acompanhadas manualmente, por telefone.",
  after: "Lembrete com referência de pagamento e lançamento automático após a receção.",
  steps: [
    "Fatura vencida identificada",
    "Lembrete enviado ao cliente",
    "Pagamento recebido",
    "Registo na contabilidade",
  ],
  durations: [2200, 2800, 2400, 3600],
  tools: ["Moloni", "gmail", "MB WAY", "excel"],
  Preview: PaymentsPreview,
};
