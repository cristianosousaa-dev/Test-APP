import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  sm: "h-10 px-4 text-[14px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-[16px]",
} as const;

/** Link styled as a button. Variants map to the .btn-* classes in globals.css. */
export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "dark" | "light" | "line";
  size?: keyof typeof sizes;
  className?: string;
  arrow?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn("btn group", `btn-${variant}`, sizes[size], className)}
    >
      {children}
      {arrow && (
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
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
