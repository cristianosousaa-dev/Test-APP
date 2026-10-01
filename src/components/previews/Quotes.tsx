import { Check, FileText, Globe } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { cn } from "@/lib/cn";
import { At, Done, IconCell, Panel, Stage, Tag } from "./parts";
import type { Example, PreviewProps } from "./types";

const LINES = [
  { label: "Diagnóstico e mão de obra (2 h)", value: "90,00 €" },
  { label: "Válvula de gás e vedantes", value: "70,00 €" },
  { label: "Deslocação", value: "25,00 €" },
];

const STATUS: { tone: "neutral" | "wait" | "sky" | "done"; label: string }[] = [
  { tone: "neutral", label: "A preparar" },
  { tone: "neutral", label: "Rascunho pronto" },
  { tone: "wait", label: "Aguarda aprovação" },
  { tone: "sky", label: "Enviado" },
  { tone: "sky", label: "Seguimento enviado" },
  { tone: "done", label: "Aceite" },
];

function QuotesPreview({ step }: PreviewProps) {
  const status = STATUS[step] ?? STATUS[0];
  return (
    <Stage>
      <div className="absolute inset-0 flex flex-col gap-3 p-3 sm:p-4">
        <Panel
          icon={
            <IconCell tone="accent">
              <Globe className="size-3.5" />
            </IconCell>
          }
          title="Pedido recebido · site"
          meta="há 2 min"
          bodyClassName="px-3.5 py-3 text-[13.5px]"
        >
          <p className="font-medium">Rui Almeida · Reparação de esquentador</p>
          <p className="truncate text-ink-2">“Não acende desde ontem. Lisboa.”</p>
        </Panel>

        <Panel
          className="flex-1"
          icon={
            <IconCell tone="ink">
              <FileText className="size-3.5" />
            </IconCell>
          }
          title="Orçamento Nº 0412"
          meta={
            <span key={status?.label} className="inline-block animate-feed-in">
              <Tag tone={status?.tone ?? "neutral"}>
                {status?.tone === "done" && <Check className="size-3" strokeWidth={3} />}
                {status?.label}
              </Tag>
            </span>
          }
          bodyClassName="flex flex-col overflow-hidden p-4"
        >
          <p className="text-[17px] tracking-[-0.01em]">Reparação de esquentador</p>
          <ul className="mt-3 text-[13.5px]">
            {LINES.map((l, i) => (
              <li
                key={l.label}
                className="step-in flex justify-between border-b border-hair py-2.5"
                data-on={step >= 1}
                style={{ transitionDelay: step >= 1 ? `${i * 120}ms` : "0ms" }}
              >
                <span className="text-ink-2">{l.label}</span>
                <span className="font-mono text-[12.5px]">{l.value}</span>
              </li>
            ))}
          </ul>
          <At step={step} at={1} className="mt-3 flex items-baseline justify-between">
            <span className="label text-[10px] text-fg-3">Total com IVA</span>
            <span className="text-[26px] tracking-[-0.03em] tabular-nums">185,00 €</span>
          </At>

          <div className="relative mt-auto h-12">
            <At step={step} at={2} until={3} className="absolute inset-x-0 bottom-0">
              <div className="flex items-stretch gap-[2px]">
                <span className="flex flex-1 items-center bg-fg px-3.5 text-[13px] text-white">
                  Rever e enviar ao cliente?
                </span>
                <span className="label grid place-items-center bg-accent px-4 py-3 text-[10px] text-white">
                  Aprovar
                </span>
              </div>
            </At>
            <At step={step} at={3} until={5} className="absolute inset-x-0 bottom-0">
              <p className="flex items-center gap-2.5 bg-accent-soft px-3.5 py-3 text-[13px] text-ink shadow-[inset_2px_0_0_var(--color-accent)]">
                <BrandIcon brand="gmail" className="size-4" />
                {step >= 4
                  ? "Sem resposta há 3 dias: seguimento enviado"
                  : "Enviado por email a Rui Almeida"}
              </p>
            </At>
            <At step={step} at={5} className="absolute inset-x-0 bottom-0">
              <Done>Orçamento aceite · trabalho agendado</Done>
            </At>
          </div>

          {/* Accepted stamp */}
          <div
            className={cn(
              "label pointer-events-none absolute top-[52%] left-[42%] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] border-[3px] border-accent bg-white/90 px-6 py-2 text-[24px] tracking-[0.14em] text-accent transition-[opacity,transform] duration-300",
              step >= 5 ? "scale-100 opacity-100" : "scale-150 opacity-0",
            )}
          >
            Aceite
          </div>
        </Panel>
      </div>
    </Stage>
  );
}

export const quotes: Example = {
  id: "orcamentos",
  tab: "Orçamentos",
  mark: FileText,
  sector: "Oficinas, reparações e serviços técnicos",
  title: "Do pedido ao orçamento aceite, no mesmo dia",
  before: "Orçamentos preparados fora do horário e propostas sem seguimento.",
  after: "Orçamento gerado em minutos com a sua tabela de preços e seguimento automático.",
  steps: [
    "Pedido recebido pelo site",
    "Orçamento preparado",
    "Aprovação interna",
    "Envio ao cliente",
    "Seguimento após 3 dias",
    "Orçamento aceite",
  ],
  durations: [1800, 2400, 2000, 1800, 2000, 3600],
  tools: ["Formulário do site", "googleSheets", "gmail"],
  Preview: QuotesPreview,
};
