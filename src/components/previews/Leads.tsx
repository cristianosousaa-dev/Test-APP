import { Bell, Check, Home } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { At, Done, IconCell, Panel, Stage, Tag } from "./parts";
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
      <div className="absolute inset-0 flex flex-col gap-3 p-3 sm:p-4">
        <Panel
          icon={
            <IconCell tone="amber">
              <Home className="size-3.5" />
            </IconCell>
          }
          title="Portal imobiliário"
          meta="agora"
          bodyClassName="flex flex-wrap items-center justify-between gap-2 px-3.5 py-3 text-[13.5px]"
        >
          <p className="min-w-0 truncate font-medium">Ana Pires quer visitar o T2 em Alvalade</p>
          <At step={step} at={1}>
            <Tag tone="done">
              <Check className="size-3" strokeWidth={3} />
              Respondido em 38 s
            </Tag>
          </At>
        </Panel>

        <Panel
          className="flex-1"
          icon={
            <IconCell>
              <BrandIcon brand="hubspot" className="size-4" />
            </IconCell>
          }
          title="Funil de vendas · HubSpot"
          bodyClassName="p-3"
        >
          <div className="grid h-full grid-cols-3 gap-[2px]">
            {COLUMNS.map((c, i) => (
              <div key={c} className="flex flex-col bg-paper-2 p-2">
                <p className="flex items-center justify-between px-0.5 pb-2">
                  <span className="label truncate text-[9.5px] text-fg-2">{c}</span>
                  <span className="font-mono text-[10px] text-fg-3">
                    {OTHERS.filter((o) => o.col === i).length + (col === i ? 1 : 0)}
                  </span>
                </p>
                <div className="h-[78px]" />
                {OTHERS.filter((o) => o.col === i).map((o) => (
                  <div
                    key={o.name}
                    className="mt-2 bg-white p-2 text-[12px] shadow-[0_0_0_1px_var(--color-hair)]"
                  >
                    <p className="truncate font-medium">{o.name}</p>
                    <p className="truncate text-fg-3">{o.note}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* The moving lead card: one column wide, slides with a transform */}
          <div
            className="absolute top-[44px] left-3 w-[calc((100%-24px-4px)/3)] px-2 transition-transform duration-700 ease-out-soft"
            style={{ transform: `translateX(calc(${col} * (100% + 2px)))` }}
          >
            <div className="bg-white p-2 text-[12px] shadow-[inset_0_0_0_2px_var(--color-accent),0_10px_20px_-12px_rgb(10_22_40/0.5)]">
              <p className="truncate font-medium">Ana Pires</p>
              <p className="truncate text-fg-3">T2 · Alvalade</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {step >= 2 && (
                  <span className="label animate-pop bg-amber-soft px-1.5 py-0.5 text-[9px] text-amber-ink">
                    Compra
                  </span>
                )}
                {step >= 3 && (
                  <span className="label animate-pop bg-accent px-1.5 py-0.5 text-[9px] text-white">
                    Sáb 11:00
                  </span>
                )}
              </div>
            </div>
          </div>
        </Panel>

        <At step={step} at={4}>
          <Done>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Bell className="size-3.5" /> Consultor notificado:
            </span>{" "}
            Ana Pires · compra até 380 mil € · visita sábado, 11:00
          </Done>
        </At>
      </div>
    </Stage>
  );
}

export const leads: Example = {
  id: "pedidos",
  tab: "Contactos",
  mark: "hubspot",
  sector: "Imobiliárias, agências e vendas consultivas",
  title: "Resposta imediata a cada contacto, até à visita agendada",
  before: "Contactos dos portais aguardam horas por resposta e alguns perdem-se.",
  after: "Resposta imediata, qualificação, registo no CRM e visita agendada com o consultor.",
  steps: [
    "Contacto recebido do portal",
    "Resposta imediata ao cliente",
    "Qualificação e registo no CRM",
    "Visita agendada",
    "Consultor notificado com resumo",
  ],
  durations: [1600, 2000, 2400, 2400, 3800],
  tools: ["Portal imobiliário", "whatsapp", "hubspot", "googleCalendar"],
  Preview: LeadsPreview,
};
