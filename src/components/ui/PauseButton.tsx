"use client";

/** Lets people stop a looping illustration (WCAG 2.2.2). */
export function PauseButton({
  paused,
  onToggle,
  tone = "light",
}: {
  paused: boolean;
  onToggle: () => void;
  tone?: "light" | "dark";
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium ring-1 transition-colors ${
        tone === "light"
          ? "text-ink-2 ring-line-2 hover:bg-white hover:text-ink"
          : "text-white/70 ring-white/15 hover:bg-white/10 hover:text-white"
      }`}
    >
      <svg viewBox="0 0 16 16" className="size-3" aria-hidden>
        {paused ? (
          <path d="M5 3.5v9l7-4.5z" fill="currentColor" />
        ) : (
          <>
            <rect x="4" y="3.5" width="2.4" height="9" rx="0.8" fill="currentColor" />
            <rect x="9.6" y="3.5" width="2.4" height="9" rx="0.8" fill="currentColor" />
          </>
        )}
      </svg>
      {paused ? "Continuar" : "Pausar"}
    </button>
  );
}
