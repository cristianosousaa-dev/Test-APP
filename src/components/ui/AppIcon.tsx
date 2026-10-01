import {
  Calendar,
  FileText,
  Globe,
  Home,
  type LucideIcon,
  Mail,
  MessageCircle,
  Receipt,
  Star,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/cn";

export type App =
  | "whatsapp"
  | "calendar"
  | "invoices"
  | "site"
  | "email"
  | "docs"
  | "payments"
  | "reviews"
  | "portal";

const APPS: Record<App, { Icon: LucideIcon; bg: string; label: string }> = {
  whatsapp: { Icon: MessageCircle, bg: "bg-[#25b864]", label: "WhatsApp" },
  calendar: { Icon: Calendar, bg: "bg-violet", label: "Agenda" },
  invoices: { Icon: Receipt, bg: "bg-[#ff7a45]", label: "Faturação" },
  site: { Icon: Globe, bg: "bg-[#2f6fed]", label: "Site" },
  email: { Icon: Mail, bg: "bg-[#0ea5b7]", label: "Email" },
  docs: { Icon: FileText, bg: "bg-[#8a8f98]", label: "Documentos" },
  payments: { Icon: Wallet, bg: "bg-[#e0446a]", label: "Cobranças" },
  reviews: { Icon: Star, bg: "bg-[#f2b20d]", label: "Avaliações" },
  portal: { Icon: Home, bg: "bg-[#ff7a45]", label: "Portal" },
};

export const appLabel = (app: App) => APPS[app].label;

/** Small app squircle with a generic glyph (no third-party logos). */
export function AppIcon({ app, className }: { app: App; className?: string }) {
  const { Icon, bg } = APPS[app];
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-[10px] text-white",
        bg,
        className,
      )}
    >
      <Icon className="size-[18px]" strokeWidth={2.2} />
    </span>
  );
}
