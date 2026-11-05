import type { CSSProperties } from "react";
import "./hero-staff.css";

/* Orchestr orchestrates: the hero rests on a staff, and a few notes (work moving between people,
   processes and programs) cross it slowly. Line is 0 to 4, d the seconds per crossing. */
const NOTES = [
  { line: 1, d: 58, delay: -6, s: 6 },
  { line: 3, d: 74, delay: -41, s: 5 },
  { line: 0, d: 90, delay: -23, s: 5 },
  { line: 4, d: 66, delay: -52, s: 7 },
  { line: 2, d: 82, delay: -12, s: 5 },
  { line: 3, d: 100, delay: -70, s: 6 },
] as const;
const BARS = [14, 38, 62, 86] as const;

export function HeroStaff() {
  return (
    <div aria-hidden className="hs">
      <div className="hs-staff">
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} className="hs-line" style={{ top: i * 14 }} />
        ))}
        {BARS.map((x) => (
          <i key={x} className="hs-bar" style={{ left: `${x}%` }} />
        ))}
        {NOTES.map((n) => (
          <b
            key={`${n.line}-${n.d}`}
            className="hs-note"
            style={
              {
                "--line": n.line,
                "--d": `${n.d}s`,
                "--delay": `${n.delay}s`,
                "--s": `${n.s}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
