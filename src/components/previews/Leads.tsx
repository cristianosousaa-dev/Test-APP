import { Bell, Check, Home } from "lucide-react";
import { At, Stage, Tag } from "./parts";
import type { Example, PreviewProps } from "./types";

const COLUMNS = ["Novos", "Qualificados", "Visita marcada"];

const OTHERS: { col: number; name: string; note: string }[] = [
  { col: 0, name: "Hugo Martins", note: "T1 · Arroios" },
  { col: 1, name: "Rita Gomes", note: "Arrendamento" },
  { col: 2, name: "Beatriz Lima", note: "Hoje, 18:00" },
];

function LeadsPreview({ step }: PreviewProps) {
  const col = step >= 3 ? 2 : step >= 2 ? 1 : 0;
  return (
    <Stage>
      <div className="absolute inset-0 flex flex-col gap-3 p-4 sm:p-5">
        {/* Incoming lead */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl bg-white p-3.5 ring-1 ring-line">
          <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#ff7a45] text-white">
            <Home className="size-[18px]" />
          </span>
          <div className="min-w-0 flex-1 text-[13.5px]">
            <p className="text-[12px] text-mute">Portal imobiliário · agora</p>
            <p className="truncate font-semibold">Ana Pires quer visitar o T2 em Alvalade</p>
          </div>
          <At step={step} at={1} className="ml-12 sm:ml-0">
            <Tag tone="lime">
              <Check className="size-3" strokeWidth={3} />
              Respondido em 38 s
            </Tag>
          </At>
        </div>

        {/* Pipeline */}
        <div className="relative flex-1 rounded-2xl bg-white p-3 ring-1 ring-line">
          <div className="grid h-full grid-cols-3 gap-2">
            {COLUMNS.map((c, i) => (
              <div key={c} className="flex flex-col rounded-xl bg-paper p-2">
                <p className="flex items-center justify-between px-1 pb-2 text-[12px] font-semibold text-ink-2">
                  <span className="truncate">{c}</span>
                  <span className="text-mute tabular-nums">
                    {OTHERS.filter((o) => o.col === i).length + (col === i ? 1 : 0)}
                  </span>
                </p>
                <div className="h-[118px] sm:h-[86px]" />
                {OTHERS.filter((o) => o.col === i).map((o) => (
                  <div
                    key={o.name}
                    className="mt-2 rounded-lg bg-white p-2 text-[12px] ring-1 ring-line"
                  >
                    <p className="truncate font-semibold">{o.name}</p>
                    <p className="truncate text-mute">{o.note}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* The moving lead card: one column wide, slides with a transform */}
          <div
            className="absolute top-[44px] left-3 w-[calc((100%-24px-16px)/3)] transition-transform duration-700 ease-out-soft"
            style={{ transform: `translateX(calc(${col} * (100% + 8px)))` }}
          >
            <div className="rounded-lg bg-white p-2 text-[12px] shadow-[0_0_0_2px_var(--color-violet),0_10px_20px_-10px_rgb(14_15_18/0.4)]">
              <p className="truncate font-semibold">Ana Pires</p>
              <p className="truncate text-mute">T2 · Alvalade</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {step >= 2 && (
                  <span className="animate-pop rounded-full bg-violet-soft px-1.5 py-0.5 text-[10.5px] font-semibold text-violet">
                    Compra
                  </span>
                )}
                {step >= 3 && (
                  <span className="animate-pop rounded-full bg-lime px-1.5 py-0.5 text-[10.5px] font-semibold text-ink">
                    Sáb 11:00
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <At step={step} at={4}>
          <div className="flex items-center gap-3 rounded-2xl bg-ink p-3 text-white">
            <span className="grid size-8 place-items-center rounded-full bg-lime text-ink">
              <Bell className="size-4" />
            </span>
            <p className="text-[13px] leading-snug">
              <span className="font-semibold">Consultor avisado:</span> Ana Pires · compra até 380
              mil € · visita sábado, 11:00
            </p>
          </div>
        </At>
      </div>
    </Stage>
  );
}

export const leads: Example = {
  id: "pedidos",
  tab: "Contactos",
  app: "portal",
  sector: "Imobiliárias, agências e vendas consultivas",
  title: "Cada contacto respondido em segundos e seguido até à visita",
  before: "Contactos dos portais ficam horas à espera e alguns perdem-se.",
  after: "Resposta imediata, qualificação e visita marcada na agenda do consultor.",
  steps: [
    "Chega um contacto do portal",
    "Resposta imediata ao cliente",
    "Qualificado e registado no CRM",
    "Visita marcada",
    "Consultor avisado com o resumo",
  ],
  durations: [1600, 2000, 2400, 2400, 3800],
  tools: ["Portal imobiliário", "WhatsApp", "CRM", "Agenda"],
  Preview: LeadsPreview,
};
