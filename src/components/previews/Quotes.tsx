import { Check, FileText, Globe } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { cn } from "@/lib/cn";
import { At, Stage, Tag } from "./parts";
import type { Example, PreviewProps } from "./types";

const LINES = [
  { label: "Diagnóstico e mão de obra (2 h)", value: "90,00 €" },
  { label: "Válvula de gás e vedantes", value: "70,00 €" },
  { label: "Deslocação", value: "25,00 €" },
];

const STATUS: { tone: "neutral" | "wait" | "sky" | "done"; label: string }[] = [
  { tone: "neutral", label: "A preparar" },
  { tone: "neutral", label: "Rascunho pronto" },
  { tone: "wait", label: "Aguarda a sua aprovação" },
  { tone: "sky", label: "Enviado ao cliente" },
  { tone: "sky", label: "Lembrete enviado" },
  { tone: "done", label: "Aceite" },
];

function QuotesPreview({ step }: PreviewProps) {
  const status = STATUS[step] ?? STATUS[0];
  return (
    <Stage>
      <div className="absolute inset-0 flex flex-col gap-3 p-4 sm:p-5">
        {/* The request, as it arrives from the website */}
        <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-line">
          <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#2f6fed] text-white">
            <Globe className="size-[18px]" />
          </span>
          <div className="min-w-0 text-[13.5px]">
            <p className="text-[12px] text-mute">Pedido no site · há 2 min</p>
            <p className="font-semibold">Rui Almeida · Reparação de esquentador</p>
            <p className="truncate text-ink-2">“Não acende desde ontem. Lisboa.”</p>
          </div>
        </div>

        {/* The quote document */}
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl bg-white p-5 ring-1 ring-line">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-[12px] text-mute">Orçamento Nº 0412</p>
              <p className="text-[17px] font-semibold tracking-[-0.01em]">
                Reparação de esquentador
              </p>
            </div>
            <span key={status?.label} className="animate-feed-in">
              <Tag tone={status?.tone ?? "neutral"}>
                {status?.tone === "done" && <Check className="size-3" strokeWidth={3} />}
                {status?.label}
              </Tag>
            </span>
          </div>
          <ul className="mt-4 border-t border-line text-[13.5px]">
            {LINES.map((l, i) => (
              <li
                key={l.label}
                className="step-in flex justify-between border-b border-line py-2.5"
                data-on={step >= 1}
                style={{ transitionDelay: step >= 1 ? `${i * 120}ms` : "0ms" }}
              >
                <span className="text-ink-2">{l.label}</span>
                <span className="font-medium tabular-nums">{l.value}</span>
              </li>
            ))}
          </ul>
          <At step={step} at={1} className="mt-3 flex items-baseline justify-between">
            <span className="text-[13px] text-mute">Total com IVA</span>
            <span className="text-[26px] font-semibold tracking-[-0.02em] tabular-nums">
              185,00 €
            </span>
          </At>

          <div className="mt-auto">
            <At step={step} at={2} until={3}>
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-ink p-3 text-white">
                <span className="text-[13px]">Rever e enviar ao cliente?</span>
                <span className="rounded-full bg-mint px-3.5 py-1.5 text-[13px] font-semibold text-night">
                  Aprovar
                </span>
              </div>
            </At>
            <At step={step} at={3} until={5}>
              <p className="flex items-center gap-2 rounded-2xl bg-sky-soft px-3 py-2.5 text-[13px] text-sky-ink">
                <BrandIcon brand="gmail" className="size-4" />
                {step >= 4
                  ? "Sem resposta há 3 dias: seguimento enviado"
                  : "Enviado por email a Rui Almeida"}
              </p>
            </At>
          </div>

          {/* Accepted stamp */}
          <div
            className={cn(
              "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] rounded-2xl border-4 border-brand bg-white/90 px-6 py-2 text-[28px] font-bold tracking-[0.08em] text-brand transition-[opacity,transform] duration-300",
              step >= 5 ? "scale-100 opacity-100" : "scale-150 opacity-0",
            )}
          >
            ACEITE
          </div>
        </div>
      </div>
    </Stage>
  );
}

export const quotes: Example = {
  id: "orcamentos",
  tab: "Orçamentos",
  mark: FileText,
  sector: "Oficinas, reparações e serviços técnicos",
  title: "Do pedido no site ao orçamento aceite, no mesmo dia",
  before: "Orçamentos feitos à noite, e alguns ficam esquecidos.",
  after: "Orçamento pronto em minutos com os seus preços, e seguimento automático.",
  steps: [
    "Chega um pedido pelo site",
    "O orçamento é preparado",
    "Aprova num toque",
    "É enviado ao cliente",
    "Seguimento após 3 dias",
    "Orçamento aceite",
  ],
  durations: [1800, 2400, 2000, 1800, 2000, 3600],
  tools: ["Formulário do site", "googleSheets", "gmail"],
  Preview: QuotesPreview,
};
