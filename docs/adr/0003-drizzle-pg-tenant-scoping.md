# ADR-0003: Drizzle + pg, app-layer tenant scoping, deny-all RLS

**Date**: 2026-10-01
**Status**: accepted
**Deciders**: founder, Claude (ECC architect review)

## Context

Signals must be idempotent (`ON CONFLICT DO NOTHING`), tenants must never see each other's data, and migrations must be reviewable SQL. pg-boss and Better Auth both use the `pg` driver.

## Decision

We use Drizzle ORM with `pg` as the only driver and committed SQL migrations from `drizzle-kit generate` (`push` only in local dev). Every query function takes `workspaceId` first; composite foreign keys such as `(workspace_id, stream_id) → stream(workspace_id, id)` make cross-tenant references impossible; workspace deletion cascades. RLS is enabled with no policies (deny-all for Supabase's PostgREST roles); the app's owner role bypasses it.

Key constraints: `UNIQUE(workspace_id, source, external_id)` on `signal`; `UNIQUE(workspace_id, repo_id, key)` on `stream`; `UNIQUE(workspace_id, for_date)` on `digest_run`. `signal.data` is jsonb containing only whitelisted metadata.

## Alternatives Considered

### Prisma
- **Pros**: popular, good DX.
- **Cons**: codegen step, heavier runtime, awkward `ON CONFLICT` and partial indexes.
- **Why not**: our core write path is idempotent upserts.

### Kysely
- **Pros**: excellent typed query builder.
- **Cons**: no schema or migration story.
- **Why not**: we want schema-as-code plus generated migrations.

### Per-tenant RLS policies
- **Pros**: database-enforced isolation.
- **Cons**: requires `SET LOCAL` on every pooled transaction.
- **Why not**: the server is the only client; composite FKs and an isolation test suite give strong guarantees at lower cost.

## Consequences

### Positive
- One driver, readable SQL migrations, tenant safety at schema level.

### Negative
- Tenant scoping is partly a code convention.

### Risks
- A query forgetting `workspaceId`. Mitigation: tenant-isolation test suite running every query function against two workspaces.
