# BLUEPRINT: Work-State Graph Engine MVP

*ECC `blueprint`. Objective: build the MVP defined in [`docs/product/CAPABILITY.md`](../product/CAPABILITY.md) following [`docs/adr/`](../adr/README.md).*
*Mode: **direct** (all steps are commits on branch `claude/awesome-volta-p33adu`; no per-step PRs unless the founder asks).*

## Pre-flight (2026-10-01)
- Git remote `cristianosousaa-dev/Test-APP`, working branch `claude/awesome-volta-p33adu`.
- Node 22, pnpm 10, PostgreSQL 16 installed locally (cluster `16/main`, start with `pg_ctlcluster 16 main start`). Docker daemon not running in the cloud container: local Postgres is used here; `docker-compose.yml` is provided for other machines.
- Chromium for Playwright at `/opt/pw-browsers`.
- No GitHub App or Slack app credentials yet → fixtures + seeded demo workspace (CAPABILITY open question 1).

## Global invariants (verified after every step)
1. `pnpm check` is green (Biome + `tsc --noEmit` + Vitest).
2. `packages/core` imports nothing from `db`, `integrations`, `apps/*` or Node built-ins (Biome rule).
3. No secrets or `.env` files committed; env is validated with zod at boot.
4. Every `packages/db` query function takes `workspaceId` as its first argument.
5. No source-code contents stored; `signal.data` only holds whitelisted metadata.

## Dependency graph

```
S1 ─► S2 ─┬─► S3 ─┬─► S5 ─┬─► S7 ─┬─► S8 (UI)        ─┐
          └─► S4 ─┘       │       ├─► S9 (Slack)       ├─► S11
                  S3,S4 ─► S6 ────┘   S10 (onboarding) ─┘
```
- **Parallel:** S3 ∥ S4 (after S2). S8 ∥ S9 ∥ S10 (after S7; they touch disjoint routes, but S8/S10 share `app/(app)/layout.tsx`: S8 owns it).
- **Strongest model:** S2 (engine), S5 (recompute pipeline), S6 (auth + webhook path). Default model elsewhere.

---

## S1: Workspace scaffold and quality gates
**Context brief.** Greenfield repo with docs only. ADR-0001 (layout), ADR-0010 (tooling: Biome, Vitest, TS 6.0.3 pinned, `erasableSyntaxOnly`).
**Tasks.**
- Root `package.json` (`packageManager: pnpm@10`), `pnpm-workspace.yaml` (`apps/*`, `packages/*`), `.npmrc`, `.gitignore`, `.editorconfig`, `.nvmrc` (22).
- `tsconfig.base.json` (strict, `noUncheckedIndexedAccess`, `erasableSyntaxOnly`, `verbatimModuleSyntax`, ES2023, bundler resolution).
- `biome.json` incl. `noRestrictedImports` for `packages/core`.
- `vitest.workspace` / root `vitest.config.ts` with projects.
- Empty packages `core`, `db`, `integrations` with `exports` to `src/index.ts`.
- Scripts: `check`, `lint`, `format`, `typecheck`, `test`.
- `docker-compose.yml` (Postgres 16), `.env.example`.
- `.github/workflows/ci.yml`: Biome → tsc → Vitest (Postgres service) → build.
**Verify.** `pnpm install && pnpm check`.
**Exit.** Green check on an empty workspace; a deliberate `import 'node:fs'` in core fails lint.
**Rollback.** Revert the commit.

## S2: Inference engine (`packages/core`), TDD
**Context brief.** ADR-0006. Pure `infer(signals, corrections, config, now)`. States/attention rules from CAPABILITY §States. Evidence ids mandatory. Corrections: phase/attention apply until a newer signal; `not_work`/`merge_into` sticky. Staleness in business days, workspace tz.
**Tasks (red → green → refactor per rule).**
- Types: `Signal`, `SignalKind`, `Correction`, `EngineConfig`, `StreamState`, `Phase`, `Attention`, `ReasonCode`; zod schemas for `Signal`.
- `normalize` (stable sort, semantic dedupe), `fold` → `Snapshot`, `phaseOf`, `attentionOf` (priority list), `applyCorrections`, `renderReason`, `businessDaysBetween`, `revalidateAt`.
- `ENGINE_VERSION` constant.
- Golden scenarios (`test/scenarios/*.ts`): draft PR, ready + review requested, changes requested then push, CI failing, approved waiting merge, merged, closed, reopened, stale over weekend, DST boundary, correction then newer signal, duplicate/out-of-order signals.
- Property tests (fast-check): permutation invariance, duplicate invariance, evidence non-empty.
- `DigestModel` builder (pure) for S9.
**Verify.** `pnpm --filter @wsg/core test --coverage` ≥ 90% lines.
**Exit.** All scenarios pass; property tests pass with 500 runs.
**Rollback.** Revert; nothing depends on it yet.

## S3: Database (`packages/db`)
**Context brief.** ADR-0003. Entities from CAPABILITY §Domain model. Composite FKs for tenant safety. pg-boss schema is managed by pg-boss itself.
**Tasks.**
- Drizzle schema: `workspace`, `member`, `identity`, `integration`, `repository`, `signal`, `stream`, `stream_transition`, `correction`, `digest_run`, `job_cursor`, `worker_heartbeat` + Better Auth tables (`user`, `session`, `account`, `verification`).
- Constraints and indexes listed in ADR-0003; `ON DELETE CASCADE` from workspace; RLS enabled, no policies.
- Generated SQL migration committed; `migrate` script.
- Query modules: `signals.insertMany` (ON CONFLICT DO NOTHING, returns inserted), `streams.upsertByKey`, `streams.list(workspaceId, filters)`, `streams.get`, `streams.saveState` (+ transition if changed), `corrections.add`, `repositories.*`, `workspaces.*`, `digests.*`.
- Test harness: create template DB once, clone per test file; tenant-isolation suite.
**Verify.** `pnpm --filter @wsg/db test` against local Postgres.
**Exit.** Migrations apply cleanly from zero; isolation suite proves no cross-workspace reads.
**Rollback.** Revert; drop dev database.

## S4: GitHub integration (`packages/integrations/github`)
**Context brief.** ADR-0007. Map webhook payloads to `Signal[]` with deterministic `external_id`s and stream keys; HMAC verify; backfill client.
**Tasks.**
- `verifySignature(rawBody, header, secret)` constant-time.
- Event mappers: `pull_request` (opened, ready_for_review, converted_to_draft, reopened, closed→merged/closed, review_requested, review_request_removed, synchronize→branch_pushed), `pull_request_review`, `push`, `check_suite`, `status`, `installation*`.
- Field whitelist (no bodies, no file contents).
- Fixtures from `@octokit/webhooks-examples` (dev dependency).
- Backfill: list PRs updated in last N days, reviews, check suites → same mappers' signal shapes; Octokit throttling/retry; cursor.
**Verify.** `pnpm --filter @wsg/integrations test`.
**Exit.** Every subscribed event fixture maps to valid `Signal`s; tampered body fails verification.
**Rollback.** Revert.

## S5: Worker and recompute pipeline (`apps/worker`)
**Context brief.** ADR-0004. pg-boss queues: `recompute-stream` (stately, singletonKey stream id), `sweep-revalidate` (cron 15 min), `backfill-repo`, `digest-tick` (S9). Heartbeat row.
**Tasks.**
- `packages/db/jobs.ts`: queue names, typed payloads, `enqueueRecompute(tx, …)` used inside the signal transaction.
- `ingestSignals(workspaceId, signals)`: one transaction → insert signals, resolve/create streams, enqueue recompute per affected stream.
- Recompute handler: load stream signals + corrections → `infer` → `saveState` (+ transition) → `revalidate_at`.
- Sweep cron; backfill handler; heartbeat every 30 s; graceful shutdown.
**Verify.** Integration test: ingest fixture sequence → run worker once → stream state equals golden expectation.
**Exit.** Duplicate ingestion produces no extra transitions; replay of a stream reproduces the same state.
**Rollback.** Revert; stop worker.

## S6: Web foundation (`apps/web`): auth, webhook, API
**Context brief.** ADR-0002, ADR-0005, ADR-0009. Next.js 16 App Router; Better Auth (GitHub + guarded dev login); webhook route; `/api/v1`.
**Tasks.**
- Next app with Tailwind v4, tokens (dark-first), Inter + JetBrains Mono, shadcn/ui base.
- `env.ts` zod validation; boot guard for `DEV_LOGIN` in production.
- Better Auth config + routes; sign-in page; session helper `requireMember()`.
- `POST /api/webhooks/github`: size cap → verify → map → `ingestSignals` → 202.
- `GET /api/v1/streams`, `GET /api/v1/streams/[id]`, `POST /api/v1/streams/[id]/corrections` with zod bodies and Origin check.
- Security headers (CSP, HSTS, frame-ancestors).
**Verify.** Route-handler integration tests (signed fixture → 202 → signal rows; bad signature → 401, no rows).
**Exit.** Sign-in works with dev login; API returns scoped data only.
**Rollback.** Revert.

## S7: Seed and replay tooling
**Context brief.** Development without real GitHub. Fixtures must exercise the real HMAC + ingest path.
**Tasks.** `pnpm seed` (demo workspace, members, repos, dev user) and `pnpm replay` (time-shifted realistic scenario signed with dev secret, POSTed to the webhook) covering every attention state.
**Verify.** After `pnpm seed && pnpm replay`, `/api/v1/streams` returns streams in every attention bucket.
**Exit.** One command produces a believable demo.

## S8: Product UI: Now, stream detail, corrections
**Context brief.** ADR-0009; ECC `frontend-patterns`, `make-interfaces-feel-better`, `design-system`. One central idea: what needs attention and why.
**Tasks.** App shell; Now view grouped by attention with reason, waiting-on, age; stream detail with evidence timeline and state history; correction menu with optimistic update; empty/loading (skeleton)/error states; visibility-aware polling with ETag; j/k + Enter navigation; ⌘K palette; responsive layout.
**Verify.** Playwright: sign in → Now shows buckets → open stream → correct state → persisted after reload.
**Exit.** Lighthouse-equivalent check: no layout shift on load, keyboard-only flow works.

## S9: Slack digest
**Context brief.** ADR-0008.
**Tasks.** Slack OAuth v2 install, encrypted token storage, Block Kit renderer from `DigestModel`, `digest-tick` cron, `digest_run` idempotency, `/settings/digest` with preview.
**Verify.** Unit tests for renderer (≤50 blocks, text fallback); integration: tick twice same day → one run.

## S10: Onboarding and settings
**Context brief.** GitHub App install flow and repository selection.
**Tasks.** Install URL, setup callback linking installation → workspace, repo list with track toggle, backfill progress, members, workspace deletion (hard cascade).
**Verify.** Integration tests with mocked GitHub API responses; e2e of settings pages with seeded data.

## S11: Verification and hardening
**Context brief.** ECC `verification-loop`, `security-reviewer`, `database-reviewer`, `silent-failure-hunter`, `code-reviewer`.
**Tasks.** Full e2e journeys, `/admin` KPIs from SQL, `/api/health`, review findings fixed, README with setup.
**Exit.** Verification report PASS.

---

## Plan mutation protocol
Split, insert, skip or reorder steps by editing this file in the same commit as the change, with a one-line reason in the log below.

### Log
- 2026-10-01: plan created.
