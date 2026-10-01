import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-7 place-items-center rounded-[9px] bg-gradient-to-br from-accent via-accent-2 to-flow shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_2px_8px_-2px_rgb(91_91_240/0.6)]",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 20 20" className="size-[62%]" fill="none" aria-hidden>
        <circle cx="5" cy="6" r="2.2" fill="white" />
        <circle cx="15" cy="14" r="2.2" fill="white" />
        <path
          d="M7 6.5c4 0 2 7 6 7"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    </span>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark />
      <span
        className={cn(
          "text-[17px] font-semibold tracking-[-0.03em]",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        {site.name}
      </span>
    </span>
  );
}
