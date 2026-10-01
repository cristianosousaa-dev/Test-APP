import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Fades/slides in once the preview reaches `at`, and back out when it loops. */
export function At({
  step,
  at,
  until,
  children,
  className,
  collapse = false,
}: {
  step: number;
  at: number;
  until?: number;
  children: ReactNode;
  className?: string;
  /** Take no space while hidden (for stacked lists like a chat), animating the height. */
  collapse?: boolean;
}) {
  const on = step >= at && (until === undefined || step < until);
  if (collapse) {
    return (
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-out-soft motion-reduce:transition-none",
          on ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          className,
        )}
      >
        <div className="step-in min-h-0 overflow-hidden" data-on={on}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className={cn("step-in", className)} data-on={on}>
      {children}
    </div>
  );
}

/** The neutral surface every preview is drawn on. */
export function Stage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative h-[500px] overflow-hidden rounded-[28px] bg-[#ecebe5] ring-1 ring-line",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Tag({
  tone,
  children,
}: {
  tone: "lime" | "violet" | "rose" | "sky" | "neutral";
  children: ReactNode;
}) {
  const t = {
    lime: "bg-lime text-ink",
    violet: "bg-violet-soft text-violet",
    rose: "bg-rose-soft text-rose-ink",
    sky: "bg-sky-soft text-sky-ink",
    neutral: "bg-paper text-ink-2",
  }[tone];
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-full px-2.5 text-[12px] font-semibold whitespace-nowrap",
        t,
      )}
    >
      {children}
    </span>
  );
}
