/**
 * Builds the Orchestr logo files from the brand geometry and Mona Sans (wdth 112, wght 600).
 * Outputs: public/brand/*.svg, src/app/icon.svg and src/components/brand/orchestr-paths.ts.
 *
 * Needs a TTF of Mona Sans (variable) and fontkit, which are not project dependencies:
 *   npx -y -p fontkit@2 node scripts/build-brand-logo.mjs path/to/MonaSans.ttf
 */

import { mkdirSync, writeFileSync } from "node:fs";
import * as fontkit from "fontkit";

const FONT = process.argv[2] ?? "MonaSans.ttf";
const root = new URL("../", import.meta.url);
const base = fontkit.openSync(FONT);
const font = base.getVariation({ wdth: 112, wght: 600 });

/* ---- Wordmark: "orchestr", outlined, tracked tight. ---- */
const TEXT = "orchestr";
const SIZE = 30; // units, in a 32-unit-tall lockup
const scale = SIZE / font.unitsPerEm;
const tracking = -0.03 * SIZE;
const run = font.layout(TEXT);
let x = 0;
const parts = [];
run.glyphs.forEach((g, i) => {
  const p = g.path.scale(scale, -scale).translate(x, 0);
  parts.push(p.toSVG());
  x += run.positions[i].xAdvance * scale + (i < run.glyphs.length - 1 ? tracking : 0);
});
const wordWidth = x;
const xHeight = (font["OS/2"]?.xHeight ?? 500) * scale;
const wordD = parts.join(" ");

/* ---- Symbol: an "e" drawn as one stroke whose bar runs out to a node. ---- */
const SYMBOL = {
  // Three sections of the orchestra (arcs) around the conductor (centre node).
  arcs: [
    "M18.29 5.24A11 11 0 0 1 26.94 17.15",
    "M24.17 23.36A11 11 0 0 1 9.53 24.90",
    "M5.54 19.40A11 11 0 0 1 11.53 5.95",
  ],
  dot: { cx: 16, cy: 16, r: 3.4 },
  stroke: 3.4,
};
const symbol = (stroke, dot) =>
  `<g fill="none" stroke="${stroke}" stroke-width="${SYMBOL.stroke}" stroke-linecap="round">${SYMBOL.arcs.map((d) => `<path d="${d}"/>`).join("")}</g><circle cx="${SYMBOL.dot.cx}" cy="${SYMBOL.dot.cy}" r="${SYMBOL.dot.r}" fill="${dot}"/>`;

const GRAD = `<defs><linearGradient id="or-g" x1="4" y1="6" x2="30" y2="26" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#B6F7DD"/><stop offset="0.55" stop-color="#3DE0A0"/><stop offset="1" stop-color="#7C8BFF"/></linearGradient></defs>`;

/* Lockup geometry: symbol 32 high; wordmark baseline aligned so its x-height centres on the bar. */
const baseline = 16 + xHeight / 2;
const gap = 9;
const wordX = 32 + gap;
const lockW = Math.ceil(wordX + wordWidth + 1);

const lockup = (symStroke, symDot, wordFill, defs = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lockW} 32" role="img" aria-label="Orchestr">${defs}${symbol(symStroke, symDot)}<path transform="translate(${wordX.toFixed(2)} ${baseline.toFixed(2)})" fill="${wordFill}" d="${wordD}"/></svg>\n`;

const tile = (size = 32) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}" role="img" aria-label="Orchestr">${GRAD}<rect width="32" height="32" rx="8.5" fill="#0B0F0E"/><rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="none" stroke="#FFFFFF" stroke-opacity="0.12"/><g transform="translate(3.2 3.2) scale(0.8)">${symbol("url(#or-g)", "#3DE0A0")}</g></svg>\n`;

const out = new URL("public/brand", root).pathname;
mkdirSync(out, { recursive: true });
writeFileSync(
  `${out}/orchestr-symbol.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Orchestr">${GRAD}${symbol("url(#or-g)", "#3DE0A0")}</svg>\n`,
);
writeFileSync(
  `${out}/orchestr-symbol-mono-dark.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Orchestr">${symbol("#07090B", "#07090B")}</svg>\n`,
);
writeFileSync(
  `${out}/orchestr-symbol-mono-light.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Orchestr">${symbol("#FFFFFF", "#FFFFFF")}</svg>\n`,
);
writeFileSync(`${out}/orchestr-app-icon.svg`, tile(512));
writeFileSync(`${out}/orchestr-logo-on-dark.svg`, lockup("url(#or-g)", "#3DE0A0", "#F2F5F4", GRAD));
writeFileSync(`${out}/orchestr-logo-on-light.svg`, lockup("#07090B", "#13935F", "#07090B"));
writeFileSync(new URL("src/app/icon.svg", root), tile(32));

/* Path data for the site component (renders identically without depending on the font). */
writeFileSync(
  new URL("src/components/brand/orchestr-paths.ts", root),
  `// Generated from Mona Sans (wdth 112, wght 600) by the brand build script. Do not edit.
export const WORDMARK = { d: ${JSON.stringify(wordD)}, x: ${wordX.toFixed(2)}, baseline: ${baseline.toFixed(2)}, width: ${lockW} } as const;
export const SYMBOL = ${JSON.stringify(SYMBOL)} as const;
`,
);
console.log({ wordWidth: wordWidth.toFixed(1), xHeight: xHeight.toFixed(1), lockW });
