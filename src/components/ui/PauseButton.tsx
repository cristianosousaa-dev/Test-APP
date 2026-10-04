"use client";

/** Lets people stop a looping illustration (WCAG 2.2.2). Square tile, matches the buttons. */
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
      className={`label inline-flex h-11 shrink-0 items-center gap-2 px-4 text-[10.5px] transition-colors duration-300 ${
        tone === "light"
          ? "bg-chip text-fg hover:bg-fg hover:text-white"
          : "bg-white/20 text-white hover:bg-white hover:text-navy"
      }`}
    >
      <svg viewBox="0 0 16 16" className="size-3" aria-hidden>
        {paused ? (
          <path d="M5 3.5v9l7-4.5z" fill="currentColor" />
        ) : (
          <>
            <rect x="4" y="3.5" width="2.4" height="9" fill="currentColor" />
            <rect x="9.6" y="3.5" width="2.4" height="9" fill="currentColor" />
          </>
        )}
      </svg>
      {paused ? "Continuar" : "Pausar"}
    </button>
  );
}
