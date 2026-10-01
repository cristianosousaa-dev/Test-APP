# ADR-0001: Modular monolith in a pnpm workspace

**Date**: 2026-10-01
**Status**: accepted
**Deciders**: founder, Claude (ECC architect review)

## Context

One founder plus AI agents must build and operate the product. The inference engine has to stay pure (no I/O) so it can be replayed and tested, and a worker process must run jobs outside the web request cycle.

## Decision

We use a pnpm workspace with `apps/web` (Next.js), `apps/worker` (Node, pg-boss handlers), `packages/core` (pure inference, no I/O), `packages/db` (Drizzle schema, migrations, scoped queries) and `packages/integrations` (GitHub, Slack). Internal packages export TypeScript source directly (no build step). One codebase, two processes. A Biome `noRestrictedImports` rule prevents `core` from importing `db`, `integrations` or Node APIs.

## Alternatives Considered

### Single Next.js app
- **Pros**: fewer files, one `package.json`.
- **Cons**: purity of the engine relies on convention; the worker would import from inside the Next app.
- **Why not**: the purity boundary is the most important invariant; it should be enforced by tooling.

### Separate services
- **Pros**: independent scaling and deploys.
- **Cons**: network contracts, more deploys, more ops.
- **Why not**: unaffordable operational load for a one-person team at MVP scale.

## Consequences

### Positive
- The engine is testable in isolation and enforced pure by lint.
- Web and worker share schema and query code with no duplication.

### Negative
- Workspace tooling (transpilePackages, tsconfig references) adds some setup.

### Risks
- Packages leaking into each other. Mitigation: lint rules and package `exports`.
