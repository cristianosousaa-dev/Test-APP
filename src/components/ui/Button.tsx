import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverse" | "ghost-dark";
  arrow?: boolean;
  className?: string;
}

const variants = {
  primary:
    "bg-ink text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_1px_2px_rgb(10_10_11/0.2),0_8px_20px_-8px_rgb(10_10_11/0.5)] hover:bg-[#1c1c1f]",
  secondary:
    "bg-surface text-ink border border-line-strong shadow-[0_1px_2px_rgb(10_10_11/0.04)] hover:bg-page",
  inverse: "bg-white text-ink shadow-[0_8px_24px_-8px_rgb(0_0_0/0.5)] hover:bg-[#f4f4f5]",
  "ghost-dark": "text-white/80 border border-white/15 hover:bg-white/5 hover:text-white",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  arrow = false,
  className,
}: ButtonProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[14.5px] font-medium tracking-[-0.01em]",
        "transition-[background-color,transform,box-shadow] duration-200 ease-premium active:scale-[0.98]",
        variants[variant],
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 ease-premium group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}
