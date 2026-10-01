import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12.5px] font-medium",
          dark ? "border-white/15 text-white/70" : "border-line bg-surface text-ink-2",
        )}
      >
        <span className="size-1.5 rounded-full bg-accent" aria-hidden />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "text-[32px] leading-[1.08] font-semibold tracking-[-0.035em] sm:text-[44px]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("text-[16.5px] leading-relaxed", dark ? "text-white/60" : "text-muted")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
