# ADR-0002: Next.js App Router for web, API and webhooks

**Date**: 2026-10-01
**Status**: accepted
**Deciders**: founder, Claude (ECC architect review)

## Context

The product needs a fast, Linear-grade UI, a small internal JSON API, and webhook endpoints that read raw request bodies for HMAC verification.

## Decision

We use Next.js 16 App Router. The Now view and stream detail are server components that call `packages/db` query functions directly (no self-fetch). `/api/v1/*` route handlers wrap the same query functions for polling and corrections. Webhook routes run on the Node runtime and read `req.text()` before parsing.

## Alternatives Considered

### Vite SPA + separate API server
- **Pros**: simple client model.
- **Cons**: two deploys, client waterfalls, duplicated auth.
- **Why not**: more moving parts for no user-visible benefit.

### Remix / React Router 7
- **Pros**: good data-loading model.
- **Cons**: smaller ecosystem for agent-assisted development.
- **Why not**: Next.js has the deepest ecosystem and hosting story.

## Consequences

### Positive
- One deployable for UI, API and webhooks; server-rendered first paint.

### Negative
- Next.js moves quickly; framework upgrades need attention.

### Risks
- Serverless limits on long work. Mitigation: all heavy work runs in the worker (ADR-0004).
