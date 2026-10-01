import { Check, Receipt, Wallet } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { cn } from "@/lib/cn";
import { At, Done, IconCell, Panel, Stage, Tag } from "./parts";
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
      <div className="absolute inset-0 flex flex-col gap-3 p-3 sm:p-4">
        <Panel
          icon={
            <IconCell tone="accent">
              <Wallet className="size-3.5" />
            </IconCell>
          }
          title="Recebido em outubro"
          meta="Tesouraria"
          bodyClassName="px-4 py-3"
        >
          <div className="relative h-10 text-[32px] leading-10 tracking-[-0.03em] tabular-nums">
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
              <span className="label bg-accent px-1.5 py-0.5 align-middle text-[10px] text-white">
                +420 €
              </span>
            </span>
          </div>
        </Panel>

        <Panel
          icon={
            <IconCell tone="ink">
              <Receipt className="size-3.5" />
            </IconCell>
          }
          title="Faturas · Moloni"
          meta="3 documentos"
        >
          <ul>
            {ROWS.map((r) => {
              const isFocus = !r.paid;
              return (
                <li
                  key={r.doc}
                  className={cn(
                    "flex items-center gap-3 border-b border-hair px-3.5 py-3 text-[13.5px] transition-colors duration-500 last:border-b-0",
                    isFocus && (paid ? "bg-accent-soft/60" : "bg-rose-soft/60"),
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{r.who}</span>
                    <span className="font-mono text-[11px] text-fg-3">{r.doc}</span>
                  </span>
                  <span className="hidden font-mono text-[12.5px] sm:block">{r.value}</span>
                  <span className="w-[140px] text-right">
                    {isFocus && focus ? (
                      <span key={focus.label} className="inline-block animate-feed-in">
                        <Tag tone={focus.tone}>
                          {focus.tone === "done" && <Check className="size-3" strokeWidth={3} />}
                          {focus.label}
                        </Tag>
                      </span>
                    ) : (
                      <Tag tone="neutral">
                        <Check className="size-3" strokeWidth={3} />
                        Paga
                      </Tag>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </Panel>

        <div className="relative mt-auto min-h-[104px]">
          <At step={step} at={1} until={3} className="absolute inset-0">
            <Panel
              className="h-full"
              icon={
                <IconCell>
                  <BrandIcon brand="gmail" className="size-4" />
                </IconCell>
              }
              title="Para: Oficina Lopes"
              meta="automático"
              bodyClassName="px-3.5 py-2.5 text-[13px]"
            >
              <p className="font-medium">Fatura FT 1182 · lembrete de pagamento</p>
              <p className="truncate text-ink-2">
                Ainda não recebemos o pagamento. Pode pagar por MB WAY ou referência.
              </p>
            </Panel>
          </At>
          <At step={step} at={3} className="absolute inset-x-0 bottom-0">
            <Done>Pagamento conciliado e lançado na contabilidade, sem intervenção manual.</Done>
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
