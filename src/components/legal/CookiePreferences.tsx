"use client";
import { Check, Monitor, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export function CookiePreferences() {
  const [stored, setStored] = useState("A verificar…");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const read = () => {
      try {
        const value = localStorage.getItem("orchestr-theme") || localStorage.getItem("theme");
        setStored(
          value === "light"
            ? "Tema claro"
            : value === "dark"
              ? "Tema escuro"
              : "Preferência do sistema",
        );
      } catch {
        setStored("Armazenamento indisponível neste navegador");
      }
    };
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    window.addEventListener("storage", read);
    read();
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", read);
    };
  }, []);
  const reset = () => {
    try {
      localStorage.removeItem("orchestr-theme");
      localStorage.removeItem("theme");
    } catch {
      setMessage(
        "O navegador não permite alterar o armazenamento. Pode fazê-lo nas suas definições.",
      );
      return;
    }
    const apply = () => {
      const theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", theme === "dark" ? "#0c0e11" : "#ffffff");
      setStored("Preferência do sistema");
      setMessage("A preferência guardada foi removida. O site segue agora o tema do sistema.");
    };
    if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches)
      document.startViewTransition(apply);
    else apply();
  };
  return (
    <div className="legal-preferences">
      <div>
        <Monitor size={20} />
        <div>
          <strong>{stored}</strong>
          <p>A única preferência persistente da aplicação é o tema visual.</p>
        </div>
      </div>
      <button type="button" onClick={reset}>
        <RotateCcw size={14} />
        Usar o tema do sistema
      </button>
      <p className="legal-preference-status" role="status">
        {message && (
          <>
            <Check size={14} />
            {message}
          </>
        )}
      </p>
    </div>
  );
}
