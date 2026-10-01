import type { Signal } from "./types.ts";

function compare(a: Signal, b: Signal): number {
  const dt = a.occurredAt.getTime() - b.occurredAt.getTime();
  if (dt !== 0) return dt;
  if (a.externalId !== b.externalId) return a.externalId < b.externalId ? -1 : 1;
  if (a.id === b.id) return 0;
  return a.id < b.id ? -1 : 1;
}

function stableJson(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : 1));
  return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${stableJson(v)}`).join(",")}}`;
}

/** Two signals describing the same fact (e.g. from backfill and from a webhook). */
function factKey(s: Signal): string {
  return [
    s.kind,
    s.occurredAt.getTime(),
    s.refs.prNumber ?? "",
    s.refs.sha ?? "",
    s.actor ?? "",
    stableJson(s.data),
  ].join("|");
}

/**
 * Total, input-order-independent ordering by (occurredAt, externalId, id), then
 * removal of redelivered duplicates (same externalId) and same-fact duplicates.
 * The first signal in order is kept, so the result is deterministic.
 */
export function normalize(signals: readonly Signal[]): Signal[] {
  const sorted = [...signals].sort(compare);
  const seenExternal = new Set<string>();
  const seenFacts = new Set<string>();
  const out: Signal[] = [];
  for (const s of sorted) {
    const fact = factKey(s);
    if (seenExternal.has(s.externalId) || seenFacts.has(fact)) continue;
    seenExternal.add(s.externalId);
    seenFacts.add(fact);
    out.push(s);
  }
  return out;
}
