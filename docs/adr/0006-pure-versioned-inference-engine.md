# ADR-0006: Pure, versioned inference engine as a replayable projection

**Date**: 2026-10-01
**Status**: accepted
**Deciders**: founder, Claude (ECC architect review)

## Context

Trust depends on the inferred state being correct and explained. Rules will evolve. Webhooks arrive out of order and sometimes twice. Some states depend on the passage of time.

## Decision

`infer(signals, corrections, config, now) → { phase, attention, waitingOn, reasonCode, reasonText, evidenceIds, stateSince, revalidateAt }` lives in `packages/core`, with no I/O, no `Date.now`, no randomness. Pipeline: **normalize** (stable sort by `(occurred_at, external_id)`, semantic dedupe) → **fold** into a snapshot → **phase rules** → **attention rules** (priority order, first match wins) → **corrections overlay** → **reason rendering**.

- Corrections to `phase`/`attention` apply only while no signal on the stream has `occurred_at > correction.created_at`. Corrections are never deleted.
- `not_work` and `merge_into` corrections are **sticky**: they persist through new activity, because they change stream membership, not the displayed state.
- Staleness uses business days (Mon–Fri) in the workspace timezone via `@date-fns/tz`.
- Each stream stores `engine_version`; bumping it replays all streams.

Tests: golden scenarios, recorded webhook fixtures, and property tests (permutation and duplicate invariance).

## Alternatives Considered

### Incremental state machine updated per event
- **Pros**: cheaper per event.
- **Cons**: order-dependent, hard to replay, bugs persist in stored state.
- **Why not**: replayability is a core invariant.

### LLM-based classification of state
- **Why not**: non-deterministic and hard to explain; LLMs are reserved for narrative and linking.

## Consequences

### Positive
- Deterministic, explainable, fully testable; rule changes fix history by replay.

### Negative
- Recompute rereads all signals of a stream (bounded by stream lifetime; acceptable).

### Risks
- Stream identity errors (forks, reused branch names, stacked PRs). Mitigation: golden corpus from design partners, corrections KPI.
