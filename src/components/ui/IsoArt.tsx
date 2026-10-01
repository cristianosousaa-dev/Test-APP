import { cn } from "@/lib/cn";

/*
 * Isometric line art, drawn from a few 3D primitives (box, plane, cylinder, line) projected
 * with a standard 30° isometric. Dashed strokes; the accent parts are solid signal blue.
 * Pure SVG, computed at render time on the server: no assets, no client JS.
 */

const C = Math.cos(Math.PI / 6);
const S = 0.5;
type P = [number, number];
const iso = (x: number, y: number, z: number): P => [(x - y) * C, (x + y) * S - z];
const f = (n: number) => Math.round(n * 100) / 100;
const poly = (pts: P[], close = true) =>
  `M${pts.map((p) => `${f(p[0])} ${f(p[1])}`).join("L")}${close ? "Z" : ""}`;

type Shape = {
  d?: string;
  e?: { cx: number; cy: number; rx: number; ry: number };
  accent?: boolean;
};

function box(x: number, y: number, z: number, w: number, d: number, h: number, accent = false) {
  const t = (a: number, b: number) => iso(a, b, z + h);
  const g = (a: number, b: number) => iso(a, b, z);
  const out: Shape[] = [
    { d: poly([t(x, y), t(x + w, y), t(x + w, y + d), t(x, y + d)]), accent },
    {
      d: poly([t(x + w, y), g(x + w, y), g(x + w, y + d), g(x, y + d), t(x, y + d)], false),
      accent,
    },
    { d: poly([t(x + w, y + d), g(x + w, y + d)], false), accent },
  ];
  return out;
}
function plane(x: number, y: number, z: number, w: number, d: number, accent = false): Shape[] {
  return [
    { d: poly([iso(x, y, z), iso(x + w, y, z), iso(x + w, y + d, z), iso(x, y + d, z)]), accent },
  ];
}
function ring(cx: number, cy: number, cz: number, r: number, accent = false): Shape {
  const [px, py] = iso(cx, cy, cz);
  return { e: { cx: px, cy: py, rx: r * Math.SQRT2 * C, ry: r * Math.SQRT2 * S }, accent };
}
function cylinder(cx: number, cy: number, z: number, r: number, h: number, accent = false) {
  const top = ring(cx, cy, z + h, r, accent);
  const bot = ring(cx, cy, z, r, accent);
  const rx = r * Math.SQRT2 * C;
  const [px, py] = iso(cx, cy, z);
  return [
    top,
    bot,
    {
      d: poly(
        [
          [px - rx, py - h],
          [px - rx, py],
        ],
        false,
      ),
      accent,
    },
    {
      d: poly(
        [
          [px + rx, py - h],
          [px + rx, py],
        ],
        false,
      ),
      accent,
    },
  ] as Shape[];
}
function line(a: [number, number, number], b: [number, number, number], accent = false): Shape {
  return { d: poly([iso(...a), iso(...b)], false), accent };
}

const ARTS = {
  // Phone on a platform, a message bubble floating above.
  chat: () => [
    ...cylinder(0, 0, 0, 34, 6),
    ...box(-6, -16, 6, 7, 30, 40),
    ...plane(-4, -12, 46.5, 3, 22),
    ...box(-30, -4, 58, 30, 22, 4, true),
    ring(-21, 7, 62, 2.2, true),
    ring(-15, 7, 62, 2.2, true),
    ring(-9, 7, 62, 2.2, true),
  ],
  // Systems connected: four blocks wired to a central one.
  nodes: () => [
    ...plane(-46, -46, 0, 92, 92),
    ...box(-40, -40, 0, 16, 16, 14),
    ...box(24, -40, 0, 16, 16, 14),
    ...box(-40, 24, 0, 16, 16, 14),
    ...box(24, 24, 0, 16, 16, 14),
    line([-24, -32, 0], [-10, -32, 0]),
    line([24, -32, 0], [10, -32, 0]),
    line([-32, 24, 0], [-32, 10, 0]),
    line([32, 24, 0], [32, 10, 0]),
    line([-10, -32, 0], [-10, -10, 0]),
    line([10, -32, 0], [10, -10, 0]),
    line([-32, 10, 0], [-10, 10, 0]),
    line([32, 10, 0], [10, 10, 0]),
    ...box(-11, -11, 0, 22, 22, 30, true),
  ],
  // A board with rising bars and a trend line.
  chart: () => [
    ...box(-44, -30, 0, 88, 60, 3),
    ...[10, 18, 15, 27, 38].flatMap((h, i) => box(-34 + i * 15, -6, 3, 9, 9, h, i === 4)),
    {
      d: poly(
        [10, 18, 15, 27, 38].map((h, i) => iso(-34 + i * 15 + 4.5, -1.5, 3 + h + 6)),
        false,
      ),
      accent: true,
    },
  ],
  // A calendar slab with a raised, booked slot.
  calendar: () => [
    ...box(-36, -36, 0, 72, 72, 5),
    ...[0, 1, 2].flatMap((r) =>
      [0, 1, 2].flatMap((c) =>
        r === 1 && c === 2 ? [] : plane(-28 + c * 20, -28 + r * 20, 5, 15, 15),
      ),
    ),
    ...box(12, -8, 5, 15, 15, 10, true),
  ],
  // A stack of documents.
  doc: () => [
    ...box(-26, -34, 0, 48, 64, 2),
    ...box(-22, -30, 7, 48, 64, 2),
    ...box(-18, -26, 14, 48, 64, 2),
    line([-12, -18, 16], [22, -18, 16]),
    line([-12, -10, 16], [22, -10, 16]),
    line([-12, -2, 16], [12, -2, 16]),
    line([-12, 14, 16], [6, 14, 16], true),
  ],
  // Stacks of coins.
  coins: () => [
    ...plane(-44, -36, 0, 88, 72),
    ...[0, 1, 2].flatMap((k) => cylinder(-20, -12, k * 5, 12, 5)),
    ...[0, 1, 2, 3, 4].flatMap((k) => cylinder(8, 2, k * 5, 12, 5, k === 4)),
    ...[0, 1].flatMap((k) => cylinder(-18, 22, k * 5, 12, 5)),
  ],
  // A dial lying flat, hands pointing to late evening.
  clock: () => [
    ...cylinder(0, 0, 0, 34, 8),
    ring(0, 0, 8, 26),
    ...Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return line([Math.cos(a) * 22, Math.sin(a) * 22, 8], [Math.cos(a) * 26, Math.sin(a) * 26, 8]);
    }),
    line([0, 0, 8], [0, -18, 8], true),
    line([0, 0, 8], [13, 4, 8], true),
  ],
  // A document awaiting approval: a check on top.
  shield: () => [
    ...box(-28, -34, 0, 56, 68, 3),
    ...box(-22, -28, 3, 44, 34, 1.5),
    line([-18, 14, 3], [18, 14, 3]),
    line([-18, 22, 3], [8, 22, 3]),
    { d: poly([iso(-10, -14, 22), iso(-2, -6, 18), iso(14, -22, 30)], false), accent: true },
  ],
} satisfies Record<string, () => Shape[]>;

export type IsoKind = keyof typeof ARTS;

function bounds(shapes: Shape[]) {
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
  const add = (x: number, y: number) => {
    x0 = Math.min(x0, x);
    y0 = Math.min(y0, y);
    x1 = Math.max(x1, x);
    y1 = Math.max(y1, y);
  };
  for (const s of shapes) {
    if (s.e) {
      add(s.e.cx - s.e.rx, s.e.cy - s.e.ry);
      add(s.e.cx + s.e.rx, s.e.cy + s.e.ry);
    }
    if (s.d) {
      for (const m of s.d.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)) add(Number(m[1]), Number(m[2]));
    }
  }
  const pad = 4;
  return `${f(x0 - pad)} ${f(y0 - pad)} ${f(x1 - x0 + pad * 2)} ${f(y1 - y0 + pad * 2)}`;
}

/** Decorative isometric drawing. Put it inside a `.group` to get the marching dashes on hover. */
export function IsoArt({ kind, className }: { kind: IsoKind; className?: string }) {
  const shapes = ARTS[kind]();
  return (
    <svg
      viewBox={bounds(shapes)}
      aria-hidden
      className={cn("iso text-fg-3/70", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      {shapes.map((s, i) =>
        s.e ? (
          <ellipse
            // biome-ignore lint/suspicious/noArrayIndexKey: static drawing, order never changes.
            key={i}
            {...s.e}
            className={s.accent ? "solid text-accent" : undefined}
            style={s.accent ? { stroke: "var(--color-accent)" } : undefined}
          />
        ) : (
          <path
            // biome-ignore lint/suspicious/noArrayIndexKey: static drawing, order never changes.
            key={i}
            d={s.d}
            className={s.accent ? "solid" : undefined}
            style={s.accent ? { stroke: "var(--color-accent)" } : undefined}
          />
        ),
      )}
    </svg>
  );
}
