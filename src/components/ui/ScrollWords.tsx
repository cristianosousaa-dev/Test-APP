import type { CSSProperties } from "react";

/**
 * The React Bits "Scroll Reveal" effect (words firm up as the line scrolls into view), done with a
 * CSS view timeline instead of GSAP so it adds no dependency and no scroll listener. Browsers
 * without view timelines, and visitors who prefer reduced motion, simply read the full text.
 */
export function ScrollWords({ text }: { text: string }) {
  return text.split(" ").map((w, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static text, order never changes.
    <span key={i} className="sw-w" style={{ "--i": i } as CSSProperties}>
      {w}{" "}
    </span>
  ));
}
