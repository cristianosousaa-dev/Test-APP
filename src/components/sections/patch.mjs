import fs from "node:fs";

let s = fs.readFileSync("hero-score.css", "utf8");
const R = (a, b) => {
  if (!s.includes(a)) throw new Error("missing: " + a.slice(0, 60));
  s = s.replace(a, () => b);
};
// no ripples
R(".sc-dot,\n.sc-fill,\n.sc-ring {", ".sc-dot,\n.sc-fill {");
const ringStart = s.indexOf(".sc-ring {\n  border:");
if (ringStart > -1) {
  const ringEnd = s.indexOf("}\n", ringStart) + 2;
  s = s.slice(0, ringStart) + s.slice(ringEnd);
}
// stem grows from the card down to its note
R(".sc-stem {\n  display: none;\n}", ".sc-stem {\n  display: none;\n}");
// playhead: a clean line, no flash
R(".sc-play {\n  --flash: 0;", ".sc-play {");
R(
  "  width: calc(2px + 2px * var(--flash));\n  background: linear-gradient(180deg, transparent, var(--color-accent-hi) 22%, var(--color-accent-hi) 78%, transparent);\n  box-shadow: 0 0 calc(22px * var(--flash)) color-mix(in srgb, var(--color-accent-hi) calc(var(--flash) * 100%), transparent);",
  "  width: 2px;\n  background: linear-gradient(180deg, transparent, var(--color-accent-hi) 22%, var(--color-accent-hi) 78%, transparent);\n  box-shadow: 0 0 14px color-mix(in srgb, var(--color-accent-hi) 45%, transparent);",
);
// the step card: number + icon, a progress line along its top edge, and a clear "done" state via opacity
const a = s.indexOf("  .sc-chips {\n    position: relative;");
const b = s.indexOf("  .sc-staff {\n    margin-block: 0;");
if (a < 0 || b < a) throw new Error("chips block");
s =
  s.slice(0, a) +
  `  .sc-chips {
    position: relative;
    display: block;
    height: 82px;
    margin-bottom: 36px;
  }
  .sc-chip {
    --k: 1;
    position: absolute;
    top: 0;
    left: var(--x);
    width: min(196px, 13.6vw);
    margin-left: calc(min(196px, 13.6vw) / -2);
    padding: 11px 14px 12px;
    border: 1px solid var(--color-nline-2);
    border-radius: 9px;
    background: var(--stage-base);
    list-style: none;
  }
  .sc-chip::before {
    content: "";
    position: absolute;
    top: -1px;
    right: -1px;
    left: -1px;
    height: 2px;
    border-radius: 9px 9px 0 0;
    background: var(--color-accent-hi);
    transform: scaleX(var(--k));
    transform-origin: left;
  }
  .sc-chip-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7px;
    color: var(--color-accent-hi);
  }
  .sc-no {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    color: var(--color-nmute);
  }
  .sc-chip b {
    display: block;
    font-size: 13.5px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--color-strong);
  }
  .sc-chip small {
    display: block;
    margin-top: 3px;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--color-nmute);
  }
` +
  s.slice(b);
R(
  "    top: -36px;\n    left: 0;\n    display: block;\n    width: 1px;\n    height: calc(36px + var(--line) * var(--gap));\n    background: var(--color-nline-2);",
  "    top: -36px;\n    left: 0;\n    display: block;\n    width: 1px;\n    height: calc(36px + var(--line) * var(--gap));\n    background: var(--color-accent-hi);\n    opacity: 0.55;\n    transform-origin: top;",
);
// motion allowed: cards start hidden and are shown by the timeline
s += `
@media (prefers-reduced-motion: no-preference) {
  .sc-chip {
    opacity: 0;
  }
  .sc-stem {
    transform: scaleY(0);
  }
}
`;
// watermark: static, left, fainter, the logo green, theme-aware
const w = s.indexOf("/* Hero watermark");
if (w < 0) throw new Error("watermark");
s =
  s.slice(0, w) +
  `/* Hero watermark: the Orchestr symbol in the logo green, huge and very faint, still, on the left so
   none of it is cut off. The colour follows the theme through --color-accent-hi. */
.hero-wm {
  position: absolute;
  top: 50%;
  left: -4%;
  z-index: 0;
  width: min(66vw, 900px);
  aspect-ratio: 1;
  transform: translateY(-46%);
  color: var(--color-accent-hi);
  opacity: 0.045;
  pointer-events: none;
}
:root[data-theme="dark"] .hero-wm {
  opacity: 0.055;
}
@media (max-width: 1023px) {
  .hero-wm {
    left: -18%;
    width: 120vw;
    top: 42%;
  }
}
`;
fs.writeFileSync("hero-score.css", s);

let h = fs.readFileSync("Hero.tsx", "utf8");
const i = h.indexOf("      {/* The symbol, very large");
const j = h.indexOf('      <Container className="relative">');
if (i < 0 || j < i) throw new Error("hero wm");
h =
  h.slice(0, i) +
  `      {/* The symbol, very large and very faint, still, behind everything (a watermark). */}
      <div aria-hidden className="hero-wm">
        <svg viewBox="0 0 32 32" className="size-full">
          <g fill="none" stroke="currentColor" strokeWidth={SYMBOL.stroke} strokeLinecap="round">
            {SYMBOL.arcs.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <circle cx={SYMBOL.dot.cx} cy={SYMBOL.dot.cy} r={SYMBOL.dot.r} fill="currentColor" />
        </svg>
      </div>
` +
  h.slice(j);
h = h.replace(
  'import { OrchestrMark } from "@/components/brand/OrchestrLogo";',
  'import { SYMBOL } from "@/components/brand/orchestr-paths";',
);
fs.writeFileSync("Hero.tsx", h);
console.log("ok");
