/**
 * Hero background: a faint dotted grid with "data packets" travelling along its lines towards
 * the operations board (requests arriving, tasks flowing between systems). Pure CSS
 * (transform + opacity), deterministic positions, paused off-screen by the hero's data-loop
 * and removed under reduced motion.
 */

const GRID = 32;

/* Deterministic pseudo-random sequence so server and client render the same packets. */
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Packet = {
  axis: "x" | "y";
  left: string;
  top: string;
  dist: string;
  dur: number;
  delay: number;
  tone: "accent" | "ink";
  mobile: boolean;
};

/*
 * Packets travel only where there is no text: the bands above and below the hero grid, the
 * gaps between the right-hand tiles (towards the board) and down the two column guides.
 */
const PACKETS: Packet[] = (() => {
  const r = rand(7);
  const out: Packet[] = [];
  const h = (
    top: string,
    left: string,
    dist: string,
    mobile = false,
    tone: Packet["tone"] = "accent",
  ) => out.push({ axis: "x", left, top, dist, dur: 7 + r() * 6, delay: -r() * 12, tone, mobile });
  // Band above the grid, both directions.
  h("-36px", "2%", "46vw", true);
  h("-36px", "96%", "-40vw", true, "ink");
  h("-36px", "40%", "38vw");
  // Gaps between the three pillar tiles, flowing left into the board.
  h("221px", "100%", "-30vw");
  h("457px", "100%", "-30vw", false, "ink");
  h("221px", "92%", "-24vw");
  // Band below the grid.
  h("708px", "4%", "52vw", true);
  h("708px", "98%", "-48vw", false, "ink");
  // Down the two column guides.
  for (const [i, left] of ["calc(33.33% + 4px)", "calc(66.66% - 4px)"].entries()) {
    for (let j = 0; j < 2; j++) {
      out.push({
        axis: "y",
        left,
        top: "-60px",
        dist: "800px",
        dur: 9 + r() * 4,
        delay: -(i * 3 + j * 5.5 + r() * 2),
        tone: "accent",
        mobile: false,
      });
    }
  }
  return out;
})();

export function HeroParticles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -top-16 -bottom-28 -z-10 overflow-hidden"
    >
      {/* Drawing-paper dots, fading out towards the edges. */}
      <div
        className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]"
        style={{
          backgroundImage: "radial-gradient(rgb(10 22 40 / 0.13) 1px, transparent 1.3px)",
          backgroundSize: `${GRID}px ${GRID}px`,
        }}
      />
      {PACKETS.map((p, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: static, deterministic decoration.
          key={i}
          className={`packet absolute ${p.mobile ? "" : "hidden lg:block"}`}
          style={
            {
              left: p.left,
              top: `calc(${p.top} + 64px)`,
              "--dist": p.dist,
              "--anim": `packet-${p.axis} ${p.dur.toFixed(1)}s linear ${p.delay.toFixed(1)}s infinite`,
            } as React.CSSProperties
          }
        >
          <span
            className={`block ${p.axis === "x" ? "h-px w-7" : "h-7 w-px"} ${
              p.dist.startsWith("-") ? "rotate-180" : ""
            }`}
            style={{
              background: `linear-gradient(${p.axis === "x" ? "90deg" : "180deg"}, transparent, ${
                p.tone === "accent" ? "var(--color-accent)" : "var(--color-fg)"
              })`,
            }}
          />
          <span
            className={`absolute size-[5px] ${p.tone === "accent" ? "bg-accent" : "bg-fg"} ${
              p.axis === "x"
                ? p.dist.startsWith("-")
                  ? "top-[-2px] left-[-2px]"
                  : "top-[-2px] right-[-2px]"
                : "bottom-[-2px] left-[-2px]"
            }`}
          />
        </span>
      ))}
    </div>
  );
}
