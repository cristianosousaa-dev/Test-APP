"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const subscribe = (notify: () => void) => {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
const snapshot = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";
let activeTransition: ViewTransition | undefined;

export function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribe, snapshot, () => "dark" as Theme);
  const change = () => {
    const next = snapshot() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", next === "light" ? "#ffffff" : "#0c0e11");
      try {
        localStorage.setItem("orchestr-theme", next);
      } catch {
        /* A blocked store still allows switching this page. */
      }
    };
    activeTransition?.skipTransition();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    if (document.startViewTransition) {
      const transition = document.startViewTransition(apply);
      activeTransition = transition;
      transition.finished.finally(() => {
        if (activeTransition === transition) activeTransition = undefined;
      });
    } else {
      document.documentElement.classList.add("theme-changing");
      apply();
      setTimeout(() => document.documentElement.classList.remove("theme-changing"), 700);
    }
  };
  return (
    <button
      type="button"
      className="theme-switch"
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Tema claro" : "Tema escuro"}
      onClick={change}
    >
      <span className="theme-switch-track" aria-hidden="true">
        <Sun className="theme-sun" size={15} />
        <Moon className="theme-moon" size={15} />
      </span>
    </button>
  );
}
