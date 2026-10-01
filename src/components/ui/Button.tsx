import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "glass" | "text";
  size?: "md" | "sm";
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,transform,box-shadow] duration-200 ease-out-soft active:scale-[0.98] motion-reduce:active:scale-100";

const variants = {
  solid:
    "bg-ink text-white shadow-[0_1px_2px_rgb(15_16_18/0.18),0_6px_16px_-8px_rgb(15_16_18/0.45)] hover:bg-[#26282c]",
  glass: "glass text-ink hover:bg-white/80",
  text: "text-ink hover:text-ink-2",
} as const;

const sizes = { md: "h-12 px-6 text-[15px]", sm: "h-9 px-4 text-[14px]" } as const;

export function LinkButton({
  href,
  children,
  variant = "solid",
  size = "md",
  className,
}: LinkButtonProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(base, variants[variant], variant !== "text" && sizes[size], className)}
    >
      {children}
    </a>
  );
}

/** Small arrow that nudges on hover of the parent link. */
export function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-3.5 transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 8h9.5M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
