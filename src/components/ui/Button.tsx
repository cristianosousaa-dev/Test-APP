import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  sm: "h-9 text-[11px]",
  md: "h-11 text-[11.5px]",
  lg: "h-13 text-[12px]",
} as const;
const arrowSizes = { sm: "w-9", md: "w-11", lg: "w-13" } as const;

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
      <path
        d="M2.5 8h10.5M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

/**
 * Link styled as a square tile button: a label cell and a separate arrow cell.
 * Hover: the label fills from the left and the arrow is swapped. Variants map to .btn-* in
 * globals.css.
 */
export function LinkButton({
  href,
  children,
  variant = "ink",
  size = "md",
  className,
  arrow = true,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: "ink" | "mist" | "glass" | "light";
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
      className={cn("btn label", `btn-${variant}`, sizes[size], className)}
    >
      <span className="btn-label flex-1">{children}</span>
      {arrow && (
        <span className={cn("btn-arrow", arrowSizes[size])}>
          <Arrow />
          <Arrow />
        </span>
      )}
    </a>
  );
}
