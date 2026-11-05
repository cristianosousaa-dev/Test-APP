"use client";

import { Moon, Sun } from "lucide-react";
import { setTheme, useTheme } from "@/lib/theme";

/** Light / dark switch. The icon turns and cross-fades; the page cross-fades with it. */
export function ThemeToggle() {
  const theme = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Mudar para o modo claro" : "Mudar para o modo escuro"}
      className="relative grid size-11 shrink-0 place-items-center bg-nfill-2 text-strong transition-[background-color,transform] duration-300 ease-out-soft hover:bg-nline-2 active:scale-[0.94] sm:size-9"
    >
      <Sun
        aria-hidden
        strokeWidth={1.6}
        className="absolute size-[18px] transition-[opacity,transform] duration-500 ease-out-soft dark:-rotate-90 dark:scale-50 dark:opacity-0"
      />
      <Moon
        aria-hidden
        strokeWidth={1.6}
        className="absolute size-[18px] rotate-90 scale-50 opacity-0 transition-[opacity,transform] duration-500 ease-out-soft dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  );
}
