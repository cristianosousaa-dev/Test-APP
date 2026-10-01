import { Check, Video } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { At, Stage } from "./parts";
import type { Example, PreviewProps } from "./types";

function Bubble({
  side,
  children,
  meta,
}: {
  side: "in" | "out";
  children: ReactNode;
  meta: string;
}) {
  return (
    <div className={cn("flex", side === "out" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2 text-[14px] leading-snug shadow-[0_1px_1px_rgb(14_15_18/0.08)]",
          side === "out" ? "rounded-br-md bg-[#dcf8c6]" : "rounded-bl-md bg-white",
        )}
      >
        {children}
        <span className="mt-0.5 block text-right text-[11px] text-ink/50">{meta}</span>
      </div>
    </div>
  );
}

function BookingsPreview({ step }: PreviewProps) {
  const booked = step >= 4;
  return (
    <Stage>
      <div className="absolute inset-0 grid sm:grid-cols-[minmax(0,1fr)_230px]">
        {/* WhatsApp-style chat */}
        <div className="flex min-h-0 flex-col bg-[#efeae2]">
          <div className="flex h-14 shrink-0 items-center gap-3 bg-[#1f7a5a] px-4 text-white">
            <span className="grid size-8 place-items-center rounded-full bg-white/20 text-[12px] font-semibold">
              MC
            </span>
            <span className="leading-tight">
              <span className="block text-[14px] font-semibold">Marta Costa</span>
              <span className="block text-[11.5px] text-white/70">online</span>
            </span>
            <Video className="ml-auto size-4 text-white/70" />
          </div>
          <div className="flex flex-1 flex-col justify-end p-4 [&>*]:mt-2">
            <At collapse step={step} at={0}>
              <Bubble side="in" meta="21:47">
                Olá! Têm vaga para uma limpeza na sexta à tarde?
              </Bubble>
            </At>
            <At collapse step={step} at={1} until={2}>
              <div className="flex justify-end">
                <span className="flex gap-1 rounded-2xl rounded-br-md bg-[#dcf8c6] px-3.5 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="size-1.5 animate-pulse rounded-full bg-ink/40"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </span>
              </div>
            </At>
            <At collapse step={step} at={2}>
              <Bubble side="out" meta="21:47 · automático">
                Olá Marta! Temos sexta às 15:30 ou às 17:00. Qual prefere?
              </Bubble>
            </At>
            <At collapse step={step} at={3}>
              <Bubble side="in" meta="21:48">
                15:30, por favor!
              </Bubble>
            </At>
            <At collapse step={step} at={4}>
              <Bubble side="out" meta="21:48 · automático">
                Ficou marcado: sexta, 15:30. Enviamos um lembrete na véspera.
              </Bubble>
            </At>
            {/* Small screens: the result as a toast. */}
            <At collapse step={step} at={4} className="sm:hidden">
              <div className="flex items-center gap-2 rounded-2xl bg-ink px-3 py-2.5 text-[13px] text-white">
                <span className="grid size-5 place-items-center rounded-full bg-lime text-ink">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                Marcação criada na agenda · Sex 15:30
              </div>
            </At>
          </div>
        </div>

        {/* Agenda side panel */}
        <div className="hidden flex-col border-l border-line bg-white p-4 sm:flex">
          <p className="text-[12px] font-semibold text-mute uppercase">Agenda</p>
          <p className="text-[16px] font-semibold tracking-[-0.01em]">Sexta, 2 out</p>
          <ul className="mt-4 flex flex-col gap-2 text-[13px]">
            <li className="rounded-xl bg-violet-soft px-3 py-2.5">
              <span className="font-semibold text-violet">14:30</span>
              <span className="block text-ink-2">Revisão · Miguel Teles</span>
            </li>
            <li
              className={cn(
                "rounded-xl px-3 py-2.5 transition-[background-color,box-shadow] duration-500",
                booked
                  ? "bg-lime shadow-[0_0_0_4px_rgb(212_255_58/0.35)]"
                  : "bg-paper ring-1 ring-line",
              )}
            >
              <span className="flex items-center justify-between font-semibold">
                15:30
                {booked && (
                  <span className="animate-pop rounded-full bg-ink px-2 py-0.5 text-[10.5px] text-lime">
                    NOVO
                  </span>
                )}
              </span>
              <span className={cn("block", booked ? "text-ink" : "text-mute")}>
                {booked ? "Limpeza · Marta Costa" : "Livre"}
              </span>
            </li>
            <li className="rounded-xl bg-paper px-3 py-2.5 ring-1 ring-line">
              <span className="font-semibold">17:00</span>
              <span className="block text-mute">Livre</span>
            </li>
          </ul>
          <At step={step} at={4} className="mt-auto">
            <p className="flex items-center gap-2 rounded-xl bg-ink px-3 py-2.5 text-[12.5px] text-white">
              <Check className="size-3.5 text-lime" strokeWidth={3} />
              Lembrete agendado para quinta
            </p>
          </At>
        </div>
      </div>
    </Stage>
  );
}

export const bookings: Example = {
  id: "marcacoes",
  tab: "Marcações",
  app: "whatsapp",
  sector: "Clínicas, estética e serviços com agenda",
  title: "O cliente marca por mensagem, sem ninguém atender",
  before: "Atende chamadas e mensagens e marca à mão, até ao jantar.",
  after: "Responde em segundos com horários livres, marca e lembra o cliente.",
  steps: [
    "O cliente pede uma vaga",
    "A automação consulta a agenda",
    "Propõe horários livres",
    "O cliente escolhe",
    "Marca na agenda e agenda o lembrete",
  ],
  durations: [1800, 1400, 2200, 1600, 3800],
  tools: ["WhatsApp", "Google Calendar", "SMS"],
  Preview: BookingsPreview,
};
