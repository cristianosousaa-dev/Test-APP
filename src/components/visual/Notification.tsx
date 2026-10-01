import { cn } from "@/lib/cn";
import { AppIcon, type AppKind, appName } from "./AppIcon";

export interface NotificationData {
  id: string;
  app: AppKind;
  title: string;
  body: string;
  time?: string;
}

/** Liquid-glass notification, sized like an iOS lock-screen notification. */
export function Notification({
  app,
  title,
  body,
  time = "agora",
  className,
}: NotificationData & { className?: string }) {
  return (
    <div className={cn("glass flex gap-3 rounded-[22px] p-3.5 pr-4", className)}>
      <AppIcon kind={app} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[12px] font-medium tracking-wide text-ink-2 uppercase">
            {appName[app]}
          </span>
          <span className="text-[12px] text-mute tabular-nums">{time}</span>
        </div>
        <p className="mt-0.5 truncate text-[14px] font-semibold tracking-[-0.01em] text-ink">
          {title}
        </p>
        <p className="text-[13.5px] leading-snug text-ink-2">{body}</p>
      </div>
    </div>
  );
}
