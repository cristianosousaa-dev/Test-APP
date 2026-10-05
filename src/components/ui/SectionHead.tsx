import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Section opener: one hairline across the frame, a quiet kicker on the left, title and lead on
 * the right (stacked on mobile). Deliberately plain: the titles carry the section, not chrome.
 */
export function SectionHead({
  kicker,
  title,
  children,
  id,
  className,
  tone = "light",
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  id: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 border-t pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8 lg:pt-8",
        dark ? "border-white/15" : "border-hair",
        className,
      )}
    >
      <p className={cn("label text-[11px]", dark ? "text-white/60" : "text-fg-3")}>{kicker}</p>
      <div>
        <h2 id={id} data-reveal="mask" className={cn("h2", dark && "text-white")}>
          {title}
        </h2>
        {children && (
          <p
            data-reveal
            className={cn(
              "mt-6 max-w-[38rem] text-[17px] leading-[1.6]",
              dark ? "text-white/70" : "text-fg-2",
            )}
          >
            {children}
          </p>
        )}
      </div>
    </div>
  );
}
