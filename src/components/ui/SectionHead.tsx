import type { ReactNode } from "react";

/**
 * Section opener: one hairline across the frame, a quiet kicker on the left, title and lead on
 * the right (stacked on mobile). Deliberately plain: the titles carry the section, not chrome.
 * Colours come from theme tokens, so it reads the same on paper and on a night stage.
 */
export function SectionHead({
  kicker,
  title,
  children,
  id,
  center,
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  id: string;
  /** Centres kicker, title and lead (used where the content below is a full-width set). */
  center?: boolean;
}) {
  if (center)
    return (
      <div className="flex flex-col items-center border-t border-hair-2 pt-6 text-center lg:pt-8">
        <p className="label text-[11px] text-fg-3">{kicker}</p>
        <h2 id={id} data-reveal="mask" className="h2 mt-5 max-w-[22ch] text-strong">
          {title}
        </h2>
        {children && (
          <p data-reveal className="mt-6 max-w-[38rem] text-[17px] leading-[1.6] text-fg-2">
            {children}
          </p>
        )}
      </div>
    );
  return (
    <div className="grid grid-cols-1 gap-5 border-t border-hair-2 pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8 lg:pt-8">
      <p className="label text-[11px] text-fg-3">{kicker}</p>
      <div>
        <h2 id={id} data-reveal="mask" className="h2 text-strong">
          {title}
        </h2>
        {children && (
          <p data-reveal className="mt-6 max-w-[38rem] text-[17px] leading-[1.6] text-fg-2">
            {children}
          </p>
        )}
      </div>
    </div>
  );
}
