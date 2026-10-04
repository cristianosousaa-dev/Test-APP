import { Check, Zap } from "lucide-react";
import type { CSSProperties } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { cn } from "@/lib/cn";
import type { Flow, FlowEdge, FlowNode, NodeIcon } from "./types";

/*
 * An editor-style workflow canvas. Everything is laid out in stage units (1040 × 440 unless the
 * flow sets its own stage) and scaled with the container width through --u (see .flow-stage),
 * so it stays crisp at any size without measuring in JS. Edges are one SVG on the same grid.
 */
export const STAGE: readonly [number, number] = [1040, 440];

const NODE = 84;
const AGENT_W = 208;
const SUB = 52;
const SUB_DY = 128;
const SUB_GAP = 76;
const PORT_DY = 18;

type RunState = "idle" | "running" | "done";

const u = (n: number) => `calc(var(--u) * ${n})`;
const width = (n: FlowNode) => (n.kind === "agent" ? AGENT_W : NODE);

function outPoint(n: FlowNode, port?: FlowEdge["port"]) {
  const dy = n.kind === "logic" && port ? (port === "yes" ? -PORT_DY : PORT_DY) : 0;
  return { x: n.x + width(n) / 2, y: n.y + dy };
}

function geometry(a: FlowNode, b: FlowNode, port?: FlowEdge["port"]) {
  const p0 = outPoint(a, port);
  const p3 = { x: b.x - width(b) / 2, y: b.y };
  const dx = Math.max(36, (p3.x - p0.x) / 2);
  const p1 = { x: p0.x + dx, y: p0.y };
  const p2 = { x: p3.x - dx, y: p3.y };
  // Midpoint of a cubic Bézier: (P0 + 3·P1 + 3·P2 + P3) / 8.
  const mid = {
    x: (p0.x + 3 * p1.x + 3 * p2.x + p3.x) / 8,
    y: (p0.y + 3 * p1.y + 3 * p2.y + p3.y) / 8,
  };
  return { d: `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`, mid };
}

function subX(agent: FlowNode, i: number, count: number) {
  return agent.x + (i - (count - 1) / 2) * SUB_GAP;
}

function Glyph({ icon, size }: { icon: NodeIcon; size: number }) {
  const box: CSSProperties = { width: u(size), height: u(size) };
  if (typeof icon === "string") {
    return (
      <span className="flow-ico" style={box}>
        <BrandIcon brand={icon} />
      </span>
    );
  }
  const G = icon.glyph;
  return (
    <span className="flow-ico" style={{ ...box, color: icon.tone }}>
      <G strokeWidth={1.75} />
    </span>
  );
}

/**
 * phase "fade" clears the finished run softly (decorations fade, nothing rewinds); "reset" then
 * returns every node to idle with transitions off, so the next run starts clean, without a cut.
 * fadeAll also fades the nodes, for when the next run is a different flow.
 */
export function FlowCanvas({
  flow,
  step,
  phase = "run",
  fadeAll = false,
}: {
  flow: Pick<Flow, "nodes" | "edges" | "order" | "stage">;
  step: number;
  phase?: "run" | "fade" | "reset";
  fadeAll?: boolean;
}) {
  const [W, H] = flow.stage ?? STAGE;
  const byId = new Map(flow.nodes.map((n) => [n.id, n]));
  const stateOf = (id: string): RunState => {
    const i = flow.order.indexOf(id);
    if (i < 0 || i > step) return "idle";
    return i < step ? "done" : "running";
  };

  const edges = flow.edges.flatMap((e) => {
    const a = byId.get(e.from);
    const b = byId.get(e.to);
    if (!a || !b) return [];
    const from = stateOf(e.from);
    const to = stateOf(e.to);
    // An edge carries data only when its source ran before its target (skipped branches stay grey).
    const live =
      from === "done" && to !== "idle" && flow.order.indexOf(e.from) < flow.order.indexOf(e.to);
    return [{ ...e, ...geometry(a, b, e.port), state: live ? to : ("idle" as RunState) }];
  });

  return (
    <div
      className="flow-stage"
      data-phase={phase}
      data-fade-all={fadeAll || undefined}
      aria-hidden
      style={{ "--stage-w": W, "--stage-h": H } as CSSProperties}
    >
      <svg
        aria-hidden
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 size-full overflow-visible"
      >
        <defs>
          <marker
            id="flow-arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M0 0.8 7 4 0 7.2z" fill="#b9c0ca" />
          </marker>
        </defs>

        {flow.nodes
          .filter((n) => n.kind === "agent")
          .flatMap((n) =>
            (n.subs ?? []).map((s, i, all) => {
              const x = subX(n, i, all.length);
              return (
                <line
                  key={`${n.id}-${s.label}`}
                  x1={x}
                  y1={n.y + NODE / 2}
                  x2={x}
                  y2={n.y + SUB_DY - SUB / 2}
                  className="flow-sub-line"
                  data-state={stateOf(n.id)}
                />
              );
            }),
          )}

        {edges.map((e) => (
          <g key={`${e.from}-${e.to}`}>
            <path d={e.d} className="flow-edge" markerEnd="url(#flow-arrow)" />
            <path
              d={e.d}
              pathLength={1}
              className="flow-edge-done"
              // Draws in step with the travelling pulse, then settles green once the node is done.
              data-on={e.state === "idle" ? undefined : e.state}
            />
            {e.state === "running" && (
              <path
                key={`${e.from}-${e.to}-${step}`}
                d={e.d}
                pathLength={1}
                className="flow-packet"
              />
            )}
          </g>
        ))}
      </svg>

      {edges.map(
        (e) =>
          e.items && (
            <span
              key={`items-${e.from}-${e.to}`}
              className="flow-items"
              data-on={e.state === "done" || undefined}
              style={{ left: u(e.mid.x), top: u(e.mid.y) }}
            >
              {e.items}
            </span>
          ),
      )}

      {flow.nodes.map((n) => {
        const w = width(n);
        const state = stateOf(n.id);
        return (
          <div key={n.id}>
            <div
              className="flow-node"
              data-kind={n.kind}
              data-state={state}
              style={{ left: u(n.x - w / 2), top: u(n.y - NODE / 2), width: u(w), height: u(NODE) }}
            >
              {n.kind === "agent" ? (
                <span
                  className="flex items-center"
                  style={{ gap: u(12), paddingInline: u(18), width: "100%" }}
                >
                  <Glyph icon={n.icon} size={34} />
                  <span className="flex min-w-0 flex-col text-left">
                    <span className="flow-app">{n.app}</span>
                    <span className="flow-title">{n.title}</span>
                  </span>
                </span>
              ) : (
                <Glyph icon={n.icon} size={n.kind === "logic" ? 34 : 38} />
              )}

              {n.kind === "trigger" && (
                <span className="flow-bolt">
                  <Zap strokeWidth={0} fill="currentColor" />
                </span>
              )}
              {n.kind !== "trigger" && <span className="flow-port" style={{ left: u(-5) }} />}
              {n.kind === "logic" ? (
                <>
                  <span
                    className="flow-port"
                    style={{ right: u(-5), top: u(NODE / 2 - PORT_DY - 5) }}
                  />
                  <span
                    className="flow-port"
                    style={{ right: u(-5), top: u(NODE / 2 + PORT_DY - 5) }}
                  />
                </>
              ) : (
                <span className="flow-port" style={{ right: u(-5) }} />
              )}
              <span className="flow-spin" />
              <span className="flow-check">
                <Check strokeWidth={3.2} />
              </span>
            </div>

            {n.kind === "logic" && (
              <>
                <span
                  className="flow-port-label"
                  style={{ left: u(n.x + NODE / 2 + 10), top: u(n.y - PORT_DY - 17) }}
                >
                  sim
                </span>
                <span
                  className="flow-port-label"
                  style={{ left: u(n.x + NODE / 2 + 10), top: u(n.y + PORT_DY + 3) }}
                >
                  não
                </span>
              </>
            )}

            {n.kind !== "agent" && (
              <span
                className="flow-label"
                style={{ left: u(n.x - 78), top: u(n.y + NODE / 2 + 9), width: u(156) }}
              >
                <span className="flow-app">{n.app}</span>
                <span className="flow-title">{n.title}</span>
              </span>
            )}

            {n.subs?.map((s, i, all) => {
              const x = subX(n, i, all.length);
              const y = n.y + SUB_DY;
              return (
                <div key={s.label}>
                  <span
                    className="flow-sub"
                    data-state={state}
                    style={{
                      left: u(x - SUB / 2),
                      top: u(y - SUB / 2),
                      width: u(SUB),
                      height: u(SUB),
                    }}
                  >
                    <Glyph icon={s.icon} size={24} />
                  </span>
                  <span
                    className="flow-label"
                    style={{ left: u(x - 40), top: u(y + SUB / 2 + 6), width: u(80) }}
                  >
                    <span className="flow-title">{s.label}</span>
                  </span>
                </div>
              );
            })}

            {n.output && (
              <span
                className={cn("flow-bubble", n.bubble === "bottom" && "is-below")}
                data-on={state === "done" || undefined}
                style={{
                  // Kept inside the stage so edge nodes never push their output off-canvas.
                  left: u(Math.min(Math.max(n.x - 96, 8), W - 200)),
                  width: u(192),
                  ...(n.bubble === "bottom"
                    ? { top: u(n.y + NODE / 2 + 50) }
                    : { bottom: u(H - (n.y - NODE / 2 - 12)) }),
                }}
              >
                <span className="flow-bubble-head">Saída</span>
                {n.output}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
