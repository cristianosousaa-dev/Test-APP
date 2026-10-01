# ADR-0008: Slack: outbound digest now, Events-API-only ingestion later

**Date**: 2026-10-01
**Status**: accepted
**Deciders**: founder, Claude (ECC architect review)

## Context

The daily digest replaces the standup. Reading Slack later is valuable, but since 2025 non-Marketplace commercial apps are limited to 1 request/minute and 15 objects on `conversations.history`/`replies`, applied to existing installs from 3 March 2026 ([Slack changelog](https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps/)).

## Decision

MVP: Slack OAuth v2 with `chat:write` and `channels:read`; the bot token is stored encrypted (AES-256-GCM, key from env). `core` builds a pure `DigestModel`; `integrations/slack` renders Block Kit (≤50 blocks plus a text fallback) and posts with `chat.postMessage`. `digest_run` moves `pending → sent` and stores the Slack `ts`. Without a token, the digest renders at `/settings/digest/preview`.

Slice 2: ingestion via the **Events API only** (v0 signature, 5-minute replay window, ack within 3 s, same signal + enqueue pipeline; threads rebuilt from `thread_ts`). No history backfill until Marketplace approval; start that review early.

## Alternatives Considered

### Incoming webhook URL
- **Why not**: fixed to one channel and cannot be extended to reading.

### History polling
- **Why not**: blocked by the rate limits above.

## Consequences

### Positive
- Digest works immediately and is idempotent per day.

### Negative
- No historical Slack context at install time.

### Risks
- Marketplace review delays. Mitigation: submit early; Events API works without it.
