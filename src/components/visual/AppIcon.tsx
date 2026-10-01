import { FileText, Inbox, MessageCircle, Receipt } from "lucide-react";
import { cn } from "@/lib/cn";

export type AppKind = "messages" | "calendar" | "invoices" | "requests" | "documents";

export const appName: Record<AppKind, string> = {
  messages: "Mensagens",
  calendar: "Agenda",
  invoices: "Faturação",
  requests: "Pedidos",
  documents: "Documentos",
};

/** iOS-style app squircles. Generic glyphs, no third-party logos. */
export function AppIcon({ kind, className }: { kind: AppKind; className?: string }) {
  const box = cn(
    "grid size-9 shrink-0 place-items-center rounded-[10px] shadow-[inset_0_0_0_0.5px_rgb(15_16_18/0.12)]",
    className,
  );
  if (kind === "calendar") {
    return (
      <span className={cn(box, "flex flex-col gap-0 bg-white leading-none")} aria-hidden>
        <span className="text-[7.5px] font-semibold tracking-wide text-[#e5484d]">SEX</span>
        <span className="text-[15px] font-medium tracking-[-0.02em] text-ink">2</span>
      </span>
    );
  }
  const map = {
    messages: { bg: "bg-[#2fb863]", Icon: MessageCircle },
    invoices: { bg: "bg-ink", Icon: Receipt },
    requests: { bg: "bg-[#3b6fd8]", Icon: Inbox },
    documents: { bg: "bg-[#e8893a]", Icon: FileText },
  } as const;
  const { bg, Icon } = map[kind];
  return (
    <span className={cn(box, bg)} aria-hidden>
      <Icon className="size-[18px] text-white" strokeWidth={2.2} />
    </span>
  );
}
