import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Section opener on the construction grid: a dotted rule draws in across the frame, the
 * index badge pops at its start, the title wipes up. Kicker on the left column, title and
 * lead on the right (stacked on mobile).
 */
export function SectionHead({
  index,
  kicker,
  title,
  children,
  id,
  className,
  tone = "light",
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  id: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("relative", className)}>
      <div data-draw="x" aria-hidden className={cn("rule-x", dark && "rule-light")} />
      <span data-pop aria-hidden className="marker -top-[3px] -left-[3px]" />
      <div className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8 lg:pt-8">
        <p className="flex items-center gap-3">
          <span className={cn("badge", dark && "badge-light")}>{index}</span>
          <span className={cn("label", dark ? "text-white/70" : "text-fg-2")}>{kicker}</span>
        </p>
        <div>
          <h2 id={id} data-reveal="mask" className={cn("h2", dark && "text-white")}>
            {title}
          </h2>
          {children && (
            <p
              data-reveal
              className={cn(
                "mt-6 max-w-[40rem] text-[17px] leading-[1.6]",
                dark ? "text-white/70" : "text-fg-2",
              )}
            >
              {children}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
