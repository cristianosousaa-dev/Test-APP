import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Page frame: wide, editorial. The construction grid lines align to its edges. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1360px] px-5 sm:px-7", className)}>{children}</div>
  );
}
