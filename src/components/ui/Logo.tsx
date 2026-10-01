import { site } from "@/lib/site";

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
        <rect width="32" height="32" rx="9" fill="#0F1012" />
        <circle cx="11" cy="11.5" r="3" fill="#fff" />
        <circle cx="21" cy="20.5" r="3" fill="#fff" />
        <path
          d="M13.6 12.2c5.4 0 2.4 7.6 4.8 7.6"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{site.name}</span>
    </span>
  );
}
