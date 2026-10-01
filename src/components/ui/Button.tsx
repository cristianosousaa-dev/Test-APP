import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  sm: "h-9 px-4 text-[14px]",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-[16px]",
} as const;

/** Link styled as a button. Variants map to the .btn-* classes in globals.css. */
export function LinkButton({
  href,
  children,
  variant = "accent",
  size = "md",
  className,
  arrow = false,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: "accent" | "glass" | "light";
  size?: keyof typeof sizes;
  className?: string;
  arrow?: boolean;
  /** Accessible name when the visible label is shortened. */
  ariaLabel?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn("btn group", `btn-${variant}`, sizes[size], className)}
    >
      {children}
      {arrow && (
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5"
        >
          <path
            d="M3 8h9.5M8.5 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  );
}
