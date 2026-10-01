# BLUEPRINT: Work-State Graph Engine MVP (v2)

*ECC `blueprint`. Objective: build the MVP defined in [`docs/product/CAPABILITY.md`](../product/CAPABILITY.md) following [`docs/adr/`](../adr/README.md).*
*Mode: **direct**: every step is one or more commits on branch `claude/awesome-volta-p33adu`; no per-step PRs unless the founder asks.*
*v2 incorporates the adversarial review (ECC `planner`, 2026-10-01): see Log.*

## Pre-flight (2026-10-01)
- Remote `cristianosousaa-dev/Test-APP`; branch `claude/awesome-volta-p33adu`.
- Node 22, pnpm 10, PostgreSQL 16 local cluster (`pg_ctlcluster 16 main start`). Docker daemon unavailable in the cloud container; `docker-compose.yml` serves other machines.
- Chromium for Playwright at `/opt/pw-browsers`.
- No GitHub App / Slack credentials yet → fixtures + seeded demo workspace.

## Packages
`@wsg/core` (pure engine) · `@wsg/db` (schema, migrations, queries, ingest pipeline, job helpers) · `@wsg/integrations` (GitHub, Slack) · `@wsg/web` (Next.js) · `@wsg/worker` (pg-boss).

## Global invariants (checked after every step)
1. `pnpm check` green (Biome + `tsc --noEmit` + Vitest).
2. `@wsg/core` imports no Node built-ins (`node:*` or bare) and nothing from `@wsg/db`, `@wsg/integrations`, `apps/*` (Biome rule, verified in S1).
3. No secrets or `.env` committed; env validated with zod at boot.
4. Every tenant data query takes `workspaceId` first. **Documented exceptions:** Better Auth tables, `integrations.findByInstallationId` (resolves the workspace from a verified webhook), `worker_heartbeat`, pg-boss tables, operator-only `/admin` queries.
5. `signal.data` holds whitelisted metadata only; never bodies or file contents.
6. Migrations are **forward-fix only**; generated one step at a time (no parallel steps adding migrations).

## Dependency graph

```
S1 ─► S2 ─┬─► S3 ─┬─► S5 ─► S6a ─┬─► S6b ─┐
          └─► S4 ─┘              └─► S6c ─┴─► S7 ─► S8a ─► S8b ─► S9 ─► S10 ─► S11
```
- **Parallel:** S3 ∥ S4; S6b ∥ S6c. Everything after S7 is serial (shared settings layout and migrations).
- **Strongest model:** S2, S5, S6a/S6b. Default elsewhere.
- **First demo** (state + evidence visible in UI): end of S8a.

---

## S1: Workspace scaffold and quality gates ✅ (commit `11ffa4e`)
pnpm workspace, TS 6.0.3, Biome purity rule (blocks `node:fs`, bare `fs`, `@wsg/db`), Vitest projects + `@vitest/coverage-v8`, compose, `.env.example`, CI.

## S2: Inference engine (`@wsg/core`), TDD
**Context.** ADR-0006, CAPABILITY §States. Pure `infer(signals, corrections, config, now)`.
**Tasks.**
- Types + zod: `Signal` (`id`, `externalId`, `kind`, `occurredAt`, `receivedAt`, `actor`, `refs {prNumber?, branch?, sha?, headRepoId?, baseRef?}`, `data`), `Correction`, `EngineConfig` (`timezone`, `staleAfterBusinessDays`), `StreamState` (`phase`, `attention`, `waitingOn`, `reasonCode`, `reasonText`, `evidenceIds`, `stateSince`, `revalidateAt`).
- `normalize` (stable sort by `(occurredAt, externalId)`, semantic dedupe), `fold` → `Snapshot` (multiple PRs per stream; head SHA tracking incl. force-push), `phaseOf`, `attentionOf`, `applyCorrections`, `renderReason`, `businessDaysBetween`, `computeRevalidateAt`, `parseTicketKey`, `ENGINE_VERSION`.
- **Corrections rule:** `phase`/`attention` corrections apply while no signal has `receivedAt > correction.createdAt` (both server clocks, no skew). `not_work` and `merge_into` are sticky.
- **Golden scenarios:** draft PR; ready + review requested; changes requested then push; CI failing then fixed; force-push changes head (old CI result ignored); approved waiting merge; merged; closed; reopened; new PR on same branch after merge; two open PRs from one branch to different bases; stale across weekend; DST boundary; correction then newer signal; sticky `not_work`; check arriving before its push; duplicates and permutations.
- **Property tests (fast-check):** permutation invariance, duplicate invariance, non-empty evidence.
**Verify.** `pnpm --filter @wsg/core exec vitest run --coverage` (≥90% lines).
**Exit.** All scenarios and properties (500 runs) pass. **Rollback.** Revert.

## S3: Database (`@wsg/db`): schema, queries, isolation
**Context.** ADR-0003. Entities: CAPABILITY §Domain model.
**Tasks.**
- Drizzle schema: `workspace` (+ `timezone`, `stale_after_business_days`, `digest_channel_id`, `digest_local_time`), `member`, `identity`, `integration` (+ `status`), `repository` (+ `tracked`), `signal` (+ `received_at`, `stream_id` nullable), `stream` (+ `ticket_key`, `engine_version`, `revalidate_at`, `hidden_reason`, `merged_into_stream_id`), `stream_transition`, `correction`, `digest_run`, `job_cursor`, `worker_heartbeat`, Better Auth tables.
- Constraints/indexes from ADR-0003 plus `signal(workspace_id, (refs->>'sha'))` and partial `signal(workspace_id) WHERE stream_id IS NULL`.
- Query modules: `workspaces`, `members`, `identities` (`linkGithubLogin`, `findMemberByLogin`), `integrations` (`findByInstallationId`, `setStatus`), `repositories`, `signals`, `streams`, `corrections`, `digests`.
- Test harness: template DB cloned per test file; tenant-isolation suite.
**Verify.** `pg_ctlcluster 16 main start; createdb wsg_test; DATABASE_URL=postgres://…/wsg_test pnpm --filter @wsg/db test`.
**Exit.** Migrations apply from zero; isolation suite proves no cross-workspace reads. **Rollback.** Revert; drop dev DB.

## S4: GitHub mappers (`@wsg/integrations/github`)
**Context.** ADR-0007.
**Tasks.**
- `verifySignature(rawBody, header, secret)` (constant time); `ALLOWED_EVENTS` allowlist.
- **Signal mappers:** `pull_request`, `pull_request_review`, `push` (ignores default branch and `deleted: true` except to close branch), `check_suite`, `status`. Deterministic `external_id`s; refs include `headRepoId` for forks.
- **Control-event mappers** (not Signals): `installation`, `installation_repositories`, `repository` → `ControlEvent` (connect, disconnect, repos added/removed).
- Fixtures from `@octokit/webhooks-examples` + hand-made fork/force-push/status fixtures.
- Backfill client (Octokit throttling/retry) producing the same Signal shapes.
**Verify.** `pnpm --filter @wsg/integrations test`. **Exit.** Every fixture maps to valid Signals/ControlEvents; tampered body rejected. **Rollback.** Revert.

## S5: Ingest pipeline and worker
**Context.** ADR-0004. Pipeline lives in `@wsg/db/pipeline` so both web and worker import it.
**Tasks (in order).**
1. **Spike first:** pg-boss `send` inside a Drizzle/`pg` transaction; test that a rolled-back transaction leaves no job.
2. **Stream resolution:** key = `branch` for same-repo PRs and pushes, `fork:{headRepoId}:{branch}` for forks; SHA → stream fallback for `status`/`check_suite`; orphan signals (`stream_id IS NULL`) re-attached when their SHA becomes known.
3. `ingestSignals(workspaceId, signals)`: one transaction → insert (ON CONFLICT DO NOTHING) → resolve streams → enqueue `recompute-stream` (stately, singletonKey = stream id).
4. `applyControlEvent(...)`: integration status, repositories tracked/untracked.
5. Recompute handler: load signals (+ signals of streams merged into it) + corrections → `infer` → `saveState` + transition; skip hidden streams.
6. Jobs: `sweep-revalidate` (cron 15 min), `replay-workspace` (+ boot check on `ENGINE_VERSION`), `backfill-repo` (resumable cursor), `reconcile` (redeliver failed GitHub deliveries) and nightly 48 h incremental backfill (both mocked Octokit in tests).
7. Structured logger (pino; `workspace_id`, `delivery_id`, `stream_id`, `job_id`; redaction), worker heartbeat, `drainOnce()` test helper.
**Verify.** Integration tests: fixture sequence → `drainOnce()` → state equals golden; duplicates add no transitions; replay reproduces state; fork and SHA-only scenarios resolve correctly.
**Exit.** All of the above green. **Rollback.** Revert; stop worker.

## S6a: Web foundation and auth (`@wsg/web`)
**Context.** ADR-0002, ADR-0005.
**Tasks.** Next.js 16 app (Tailwind v4 base), `env.ts` (zod) with `DEV_LOGIN` production guard (+ test), Better Auth (GitHub + dev email), sign-in page, `requireMember()`; on GitHub sign-in, link `identity` and confirm membership via `GET /user/installations`; `/api/health` (DB + heartbeat age); security headers.
**Verify.** Tests for env guard and session helper; `pnpm --filter @wsg/web build`. **Exit.** Dev login reaches an authenticated empty page. **Rollback.** Revert.

## S6b: GitHub webhook route
**Tasks.** `POST /api/webhooks/github`: body cap → event allowlist → verify (no DB access before this; tested with a spy) → resolve workspace via installation → control event or `ingestSignals` → 202; unknown installation → 202 + log; rate limiting.
**Verify.** Route tests with signed fixtures. **Exit.** Bad signature → 401 and zero DB calls. **Rollback.** Revert.

## S6c: Internal API
**Tasks.** `GET /api/v1/streams` (filters, ETag from `max(computed_at)`), `GET /api/v1/streams/[id]`, `POST /api/v1/streams/[id]/corrections` (phase, attention, not_work, merge_into), `GET|PUT /api/v1/workspace/settings`; zod bodies, Origin check.
**Verify.** Route integration tests incl. cross-workspace access → 404. **Exit.** Green. **Rollback.** Revert.

## S7: Seed and replay
**Tasks.** `pnpm seed`: demo workspace, members + identities, `integration` row with fixture installation id, repos, dev user; realistic time-shifted scenario inserted via `ingestSignals` + `drainOnce()`. `pnpm replay`: same scenario as signed HTTP webhooks against a running app.
**Verify.** `pnpm seed:verify` asserts streams exist in all five attention buckets. **Exit.** One command gives a believable demo. **Rollback.** Revert; drop dev DB.

## S8a: Now view and stream detail (read-only) → first demo
**Context.** ADR-0009; ECC `frontend-patterns`, `make-interfaces-feel-better`, `design-system`.
**Tasks.** Design tokens (dark-first), Inter + JetBrains Mono, app shell, Now grouped by attention (reason, waiting-on, age, ticket key), stream detail with evidence timeline and state history, empty/loading/error states, responsive.
**Verify.** Playwright: sign in → buckets visible → open stream → evidence listed; CLS assertion ≈ 0. **Exit.** Green. **Rollback.** Revert.

## S8b: Corrections and live feel
**Tasks.** Correction menu (state, not work, merge into…) with `useOptimistic`; hidden/merged filtering; visibility-aware polling with ETag; j/k/Enter navigation; ⌘K palette.
**Verify.** Playwright: correct a state → persists after reload; keyboard-only journey passes. **Exit.** Green. **Rollback.** Revert.

## S9: Slack digest
**Tasks.** `DigestModel` builder (pure, in core), Block Kit renderer (≤50 blocks, text fallback), Slack OAuth v2 install, encrypted token (AES-256-GCM), job `digest-tick` (single name; replaces `send-digest` in CAPABILITY), `digest_run` idempotency, `/settings/digest` preview.
**Verify.** Renderer unit tests; tick twice same day → one run. **Exit.** Preview renders seeded data; idempotency test green. **Rollback.** Revert.

## S10: Onboarding, settings, data policy
**Tasks.** S10 owns `settings/layout.tsx`. GitHub App install URL + setup callback (installation → workspace), repository tracking toggles, backfill progress, members, workspace settings (timezone, staleness), workspace deletion (hard cascade), public `/data-policy` page.
**Verify.** Integration tests with mocked GitHub; e2e of settings with seeded data. **Exit.** Install callback creates/links workspace in tests; deletion removes all rows. **Rollback.** Revert.

## S11: Verification and hardening
**Tasks.** ECC `verification-loop`; `security-reviewer`, `database-reviewer`, `silent-failure-hunter`, `code-reviewer`, `react-reviewer` passes with fixes; `/admin` restricted to operator allowlist (env) showing KPIs (signals inserted/duplicate, job states, corrections per 100 streams, digest runs); heartbeat staleness surfaced on `/api/health` and `/admin`; README setup guide.
**Verify.** `pnpm check && pnpm --filter @wsg/web build && pnpm e2e`. **Exit.** All commands green; no open CRITICAL/HIGH review findings. **Rollback.** Revert individual fixes.

---

## Deferred (explicit)
- **Signal retention (CAPABILITY Q4):** no pruning in the MVP. Pruning conflicts with replay (invariant 2). Future rule: prune only signals of terminal streams after N days and freeze those streams from replay.
- Slack Events ingestion (slice 2), Figma (slice 3), LLM narrative/linking.

## Plan mutation protocol
Edit this file in the same commit as the change, with a one-line entry in the Log.

### Log
- 2026-10-01: v1 created.
- 2026-10-01: S1 done (`11ffa4e`).
- 2026-10-01: v2 after adversarial review: fork-safe stream identity and SHA fallback (C1); workspace resolution, control events, identity linking (C2); engine_version replay (C3); reconcile + nightly backfill (C4); pipeline moved to `@wsg/db` and S5→S6 edge (H1); transactional-enqueue spike first (H2); workspace config columns + settings API (H3); retention deferred (H4); event allowlist, pre-verify zero-DB test, rate limits, operator-only admin (H5); merge/not_work behaviour (H6); serial post-S7 steps (H7); S6/S8 split, DigestModel moved to S9, health moved to S6a (M1–M4); corrections compare `receivedAt` (server clock) instead of source time.
