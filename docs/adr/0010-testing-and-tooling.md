# ADR-0010: Vitest, real-Postgres integration, Playwright, Biome, TypeScript 6.0.3

**Date**: 2026-10-01
**Status**: accepted
**Deciders**: founder, Claude (ECC architect review)

## Context

Correctness of inference and tenant isolation are the product. Tooling must be fast and stable for agent-driven development.

## Decision

- **Vitest**: unit tests for `core` (≥90% coverage target), integration tests for `db` and route handlers against real Postgres 16 (template database cloned per test worker), and a tenant-isolation suite.
- **Playwright** (Chromium, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`) against a production build with the seeded demo and dev login.
- **Biome** for lint and format.
- **TypeScript pinned to 6.0.3** with `erasableSyntaxOnly`. TypeScript 7.0.2's package exports only `lib/version.cjs` plus `./unstable/*` (verified with `npm view`), so tools using the classic compiler API break; `typescript-eslint` declares `typescript >=4.8.4 <6.1.0`.
- CI order: Biome → `tsc --noEmit` → Vitest → build → Playwright.

## Alternatives Considered

### ESLint 10 + typescript-eslint
- **Why not**: slower, and incompatible with TS ≥ 6.1.

### TypeScript 7
- **Why not**: ecosystem not ready; revisit with a non-blocking CI job.

### Mocked database in tests
- **Why not**: hides real `ON CONFLICT`, FK and index behaviour.

## Consequences

### Positive
- Fast, deterministic checks; real database semantics in tests.

### Negative
- Integration tests need Docker/Postgres available.

### Risks
- Version churn. Mitigation: exact pins, lockfile, weekly batched updates.
