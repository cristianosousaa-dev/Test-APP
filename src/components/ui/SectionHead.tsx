import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Kicker + title + one line of plain explanation. Every section opens with one. */
export function SectionHead({
  kicker,
  title,
  children,
  id,
  tone = "light",
  className,
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  id: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div data-reveal className={cn("max-w-[46rem]", className)}>
      <p
        className={cn(
          "inline-flex items-center gap-2 text-[13.5px] font-semibold tracking-wide uppercase",
          tone === "light" ? "text-ink-2" : "text-white/70",
        )}
      >
        <span className={cn("size-2.5 rounded-[3px]", tone === "light" ? "bg-brand" : "bg-mint")} />
        {kicker}
      </p>
      <h2
        id={id}
        className="mt-4 text-[34px] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-[48px]"
      >
        {title}
      </h2>
      {children && (
        <p
          className={cn(
            "mt-4 max-w-[38rem] text-[17.5px] leading-[1.6]",
            tone === "light" ? "text-ink-2" : "text-white/70",
          )}
        >
          {children}
        </p>
      )}
    </div>
  );
}
