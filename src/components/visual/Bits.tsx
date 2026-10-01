import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Three dots that breathe while someone (or something) is typing. */
export function Typing({ running }: { running: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-[18px] rounded-bl-[6px] bg-paper px-3.5 py-3 ring-1 ring-hair">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn("size-1.5 rounded-full bg-mute", running && "animate-pulse")}
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </span>
  );
}

type Tone = "neutral" | "sky" | "sage" | "sand" | "rose" | "lilac" | "go";
const TONES: Record<Tone, string> = {
  neutral: "bg-canvas text-ink-2",
  sky: "bg-sky text-sky-ink",
  sage: "bg-sage text-sage-ink",
  sand: "bg-sand text-sand-ink",
  rose: "bg-rose text-rose-ink",
  lilac: "bg-lilac text-lilac-ink",
  go: "bg-[#dff2e8] text-go",
};

export function Pill({
  tone = "neutral",
  wrap = false,
  children,
  className,
}: {
  tone?: Tone;
  /** Allow the label to wrap inside narrow containers. */
  wrap?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium",
        wrap ? "min-h-6 py-0.5 leading-tight" : "h-6 whitespace-nowrap",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("size-3.5", className)} fill="none" aria-hidden>
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Frosted surface every preview is drawn on; the page backdrop tints it per chapter. */
export function Stage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative h-[540px] overflow-hidden rounded-[28px] bg-white/45 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_1px_2px_rgb(15_16_18/0.05),0_40px_90px_-40px_rgb(15_16_18/0.35)] ring-1 ring-white/70",
        className,
      )}
    >
      {children}
    </div>
  );
}
