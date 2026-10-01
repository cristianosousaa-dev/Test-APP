import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "glass" | "text" | "light";
  size?: "md" | "sm" | "lg";
  className?: string;
  /** Show the trailing arrow that slides on hover. */
  arrow?: boolean;
}

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap font-medium tracking-[-0.01em] transition-[background-color,color,transform,box-shadow] duration-200 ease-out-soft active:scale-[0.97] motion-reduce:active:scale-100";

const variants = {
  solid:
    "btn-shine bg-ink text-white shadow-[0_1px_2px_rgb(15_16_18/0.18),0_8px_20px_-8px_rgb(15_16_18/0.5)] hover:bg-[#1d1f23] hover:shadow-[0_1px_2px_rgb(15_16_18/0.18),0_14px_28px_-10px_rgb(15_16_18/0.55)]",
  light: "btn-shine bg-white text-ink shadow-[0_8px_24px_-10px_rgb(0_0_0/0.6)] hover:bg-[#f1f2f4]",
  glass: "glass text-ink hover:bg-white/80",
  text: "text-ink hover:text-ink-2",
} as const;

const sizes = {
  sm: "h-9 px-4 text-[14px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-[16px]",
} as const;

export function LinkButton({
  href,
  children,
  variant = "solid",
  size = "md",
  className,
  arrow = false,
}: LinkButtonProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(base, variants[variant], variant !== "text" && sizes[size], className)}
    >
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

/** Arrow that slides out and back in on hover, like it is being pulled forward. */
export function Arrow() {
  return (
    <span className="relative -mr-1 inline-grid size-4 overflow-hidden" aria-hidden>
      {[0, 1].map((i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className={cn(
            "col-start-1 row-start-1 size-4 transition-transform duration-300 ease-out-soft",
            i === 0
              ? "group-hover/btn:translate-x-[120%] group-hover:translate-x-[120%]"
              : "-translate-x-[120%] group-hover/btn:translate-x-0 group-hover:translate-x-0",
          )}
        >
          <path
            d="M3 8h9.5M8.5 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}
