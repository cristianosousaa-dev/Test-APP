import { site } from "@/lib/site";

/** Two nodes joined by a flow: something happens, something gets done. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const bg = tone === "dark" ? "#0E0F12" : "#D4FF3A";
  const fg = tone === "dark" ? "#D4FF3A" : "#0E0F12";
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
        <rect width="32" height="32" rx="10" fill={bg} />
        <circle cx="10.5" cy="11" r="3.2" fill={fg} />
        <circle cx="21.5" cy="21" r="3.2" fill={fg} />
        <path
          d="M13.4 11.6c5.8 0 2.6 8.8 5.2 8.8"
          stroke={fg}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span
        className={`text-[18px] font-semibold tracking-[-0.03em] ${tone === "dark" ? "text-ink" : "text-white"}`}
      >
        {site.name}
      </span>
    </span>
  );
}
