# ADR-0004: pg-boss for background jobs with transactional enqueue

**Date**: 2026-10-01
**Status**: accepted
**Deciders**: founder, Claude (ECC architect review)

## Context

Webhook handlers must answer fast (202) and never lose work. Bursts of events for one stream should not cause dozens of recomputes. Some states change with time alone (staleness), and digests run at each workspace's local time.

## Decision

We use pg-boss on the same Postgres:
- The webhook handler verifies, maps, then in **one transaction** inserts signals and enqueues `recompute-stream` (transactional outbox), then returns 202.
- `recompute-stream` uses the **stately** policy with `singletonKey = stream_id`: at most one queued plus one active job per stream. Coalescing is safe because recompute rereads all signals.
- `infer()` returns `revalidate_at`; a `sweep-revalidate` cron (every 15 min) enqueues streams whose time has come.
- `digest-tick` cron (every 5 min) sends digests for workspaces whose local time has passed and have no `digest_run` for today.
- The worker runs as one always-on container.

## Alternatives Considered

### graphile-worker
- **Pros**: very fast, mature.
- **Cons**: needs LISTEN/NOTIFY on a direct connection; cron without timezone.
- **Why not**: pg-boss covers retries, DLQ, cron with tz and singleton policies with fewer constraints.

### Hand-rolled SKIP LOCKED table
- **Why not**: we would rebuild retries, backoff and cron.

### External queue (SQS, Inngest, QStash)
- **Why not**: extra vendor and no transactional enqueue with the signal insert.

## Consequences

### Positive
- No lost jobs, natural dedupe, one database to operate.

### Negative
- Requires an always-on worker process (not serverless).

### Risks
- Worker dies silently. Mitigation: heartbeat row and alert, `/api/health`.
