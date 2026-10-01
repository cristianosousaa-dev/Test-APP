# ADR-0007: Read-only GitHub App as the first signal source

**Date**: 2026-10-01
**Status**: accepted
**Deciders**: founder, Claude (ECC architect review)

## Context

GitHub holds the most structured truth about engineering work. Customers must trust us with access; we must never lose or double-count events.

## Decision

We use a GitHub App with read-only permissions: `metadata`, `pull_requests`, `checks`, `statuses`, org `members`, and `contents: read`. `contents: read` is required to receive `push` events; we never call content endpoints and state this in the data policy.

Events: `pull_request`, `pull_request_review`, `push`, `check_suite`, `status`, `installation`, `installation_repositories`, `repository`.

Deterministic `external_id`s: `review:{id}`, `check_suite:{id}:{completed_at}`, `push:{repo}:{ref}:{after}`, `pr:{repo}:{number}:{kind}:{occurred_at}`. Stream keys come from the payload (`head.ref`, `head_branch`, push ref), with a SHA→stream fallback.

Backfill: one resumable `backfill-repo` job per repository (14 days), Octokit throttling/retry. GitHub does not retry failed deliveries, so a `reconcile` cron redelivers failed deliveries and a nightly 48-hour incremental backfill closes gaps; both are idempotent. Local dev replays signed fixtures through the real HMAC path.

## Alternatives Considered

### OAuth App
- **Cons**: broad `repo` scope (includes write), no central webhooks.
- **Why not**: unacceptable trust posture.

## Consequences

### Positive
- Minimal, auditable permissions; per-installation rate limits.

### Negative
- The founder must register the App (name, webhook URL, keys) before real use.

### Risks
- Missed deliveries. Mitigation: reconcile cron and incremental backfill.
