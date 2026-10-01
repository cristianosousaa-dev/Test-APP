import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Section opener: mono kicker with index, display title, one line of plain explanation. */
export function SectionHead({
  index,
  kicker,
  title,
  children,
  id,
  align = "left",
  className,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  id: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={cn(
        "max-w-[46rem]",
        align === "center" && "mx-auto flex flex-col items-center text-center",
        className,
      )}
    >
      <p className="kicker flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span className="h-px w-6 bg-hair-2" />
        {kicker}
      </p>
      <h2 id={id} className="h2 ink-sheen mt-5">
        {title}
      </h2>
      {children && (
        <p className="mt-5 max-w-[38rem] text-[17.5px] leading-[1.65] text-fg-2">{children}</p>
      )}
    </div>
  );
}
