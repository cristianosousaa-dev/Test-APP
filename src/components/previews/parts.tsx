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

/**
 * The drawing board every preview sits on: warm paper with a fine dotted grid, square, with
 * its own ink colour (never inherits from the frame around it).
 */
export function Stage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative h-[500px] overflow-hidden bg-[#f6f6f2] text-ink shadow-[inset_0_0_0_1px_var(--color-hair)]",
        "[background-image:radial-gradient(rgb(10_22_40/0.14)_1px,transparent_1.2px)] [background-size:14px_14px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A tool window drawn in the site's language: white, square, a labelled header strip. */
export function Panel({
  icon,
  title,
  meta,
  children,
  className,
  bodyClassName,
}: {
  icon?: ReactNode;
  title: string;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-col bg-white shadow-[0_0_0_1px_var(--color-hair-2),0_12px_24px_-18px_rgb(10_22_40/0.35)]",
        className,
      )}
    >
      <div className="flex h-10 shrink-0 items-center gap-2.5 border-b border-hair px-3">
        {icon}
        <span className="label truncate text-[10.5px] text-fg-2">{title}</span>
        {meta && <span className="ml-auto shrink-0 font-mono text-[10px] text-fg-3">{meta}</span>}
      </div>
      <div className={cn("relative min-h-0 flex-1", bodyClassName)}>{children}</div>
    </div>
  );
}

/** Square icon cell for panel headers. */
export function IconCell({
  children,
  tone = "plain",
}: {
  children: ReactNode;
  tone?: "plain" | "accent" | "ink" | "amber";
}) {
  const t = {
    plain: "bg-white shadow-[0_0_0_1px_var(--color-hair)]",
    accent: "bg-accent text-white",
    ink: "bg-fg text-white",
    amber: "bg-amber text-ink",
  }[tone];
  return <span className={cn("grid size-6 shrink-0 place-items-center", t)}>{children}</span>;
}

export function Tag({
  tone,
  children,
}: {
  tone: "done" | "wait" | "rose" | "sky" | "neutral";
  children: ReactNode;
}) {
  const t = {
    done: "bg-accent text-white",
    wait: "bg-amber-soft text-amber-ink",
    rose: "bg-rose-soft text-rose-ink",
    sky: "bg-accent-soft text-accent-2",
    neutral: "bg-paper-2 text-fg-2 shadow-[inset_0_0_0_1px_var(--color-hair)]",
  }[tone];
  return (
    <span
      className={cn(
        "label inline-flex h-6 items-center gap-1 px-2 text-[9.5px] whitespace-nowrap",
        t,
      )}
    >
      {children}
    </span>
  );
}

/** Outcome bar: ink tile with a signal check. Used when a flow completes. */
export function Done({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 bg-fg px-3.5 py-3 text-[13px] leading-snug text-white">
      <span className="grid size-5 shrink-0 place-items-center bg-accent">
        <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
          <path d="M2.5 6.2l2.3 2.3 4.7-5" fill="none" stroke="#fff" strokeWidth="1.8" />
        </svg>
      </span>
      <span>{children}</span>
    </div>
  );
}
