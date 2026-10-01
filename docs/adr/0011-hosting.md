# ADR-0011: Hosting: Vercel (web) + Supabase Postgres + worker container

**Date**: 2026-10-01
**Status**: proposed (needs founder confirmation)
**Deciders**: founder (pending), Claude (ECC architect review)

## Context

The web app suits serverless hosting; the pg-boss worker needs an always-on process. Vercel and Supabase connectors are already available to the founder.

## Decision (proposed)

Vercel for `apps/web` (Supabase transaction pooler, small pool `max`), Supabase as plain Postgres (Data API disabled, deny-all RLS), and one worker container on Fly.io or Railway (session pooler or direct connection). Fallback: one container host running both processes.

## Alternatives Considered

### Everything on one container host
- **Pros**: one vendor, simplest networking.
- **Cons**: lose Vercel's preview deploys and edge.
- **Why not**: kept as fallback.

## Consequences

### Positive
- Preview deploys per branch; managed Postgres with backups.

### Negative
- Three vendors to manage.

### Risks
- Connection exhaustion from serverless. Mitigation: transaction pooler, small pool size.
