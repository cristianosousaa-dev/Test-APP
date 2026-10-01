# Capability Contract: Work-State Graph Engine (MVP)

*ECC `product-capability`. Source: [`PRODUCT-BRIEF.md`](./PRODUCT-BRIEF.md). 2026-10-01.*
Labels: **[POLICY]** fixed product rule · **[ARCH]** architecture preference (can change with an ADR) · **[OPEN]** unresolved.

---

## CAPABILITY

An Engineering Manager of a 10–60 person product team connects GitHub once and, within minutes, sees every active piece of work as a **work stream** with an **inferred state**, **who it is waiting on**, and the **evidence** behind that state, without anyone updating a ticket. A daily Slack digest replaces the standup. Anyone can correct a wrong state in one click, and every correction is recorded to measure accuracy.

Outcome that changes: the team can drop or shorten its standup/status meeting and still trust that it knows what is happening.

---

## CONSTRAINTS

### Business rules
- **[POLICY]** State belongs to work, not to people. No per-person productivity scores, rankings or activity totals in any surface or API.
- **[POLICY]** Every displayed state must be explainable: it cites at least one evidence signal (or, for staleness, the last signal plus elapsed time).
- **[POLICY]** No source-code contents are stored. Metadata only: titles, branch names, review states, check conclusions, timestamps, actors, counts.
- **[POLICY]** A user correction is never silently discarded; it is stored even after newer evidence supersedes it.
- **[ARCH]** The core inference is deterministic (rules). LLMs are optional, only for narrative text and (later) for proposing cross-tool links, always behind a confidence threshold and a feature flag.

### Invariants
1. **Signals are immutable and idempotent.** Unique on `(workspace_id, source, external_id)`. Duplicate webhook deliveries are no-ops.
2. **State is a pure projection.** `state(stream) = f(signals ordered by occurred_at, corrections, config, now)`. It can be recomputed from scratch at any time and must give the same result. Stored state is a cache.
3. **Out-of-order delivery is tolerated.** Ordering uses `occurred_at` from the source, not arrival time.
4. **Tenant isolation.** Every row carries `workspace_id`; every query is scoped by it; no cross-workspace joins.
5. **Webhooks are authenticated before persistence** (GitHub `X-Hub-Signature-256` HMAC with constant-time comparison). Unverified payloads are rejected with no side effects.
6. **A correction overrides inference until a newer signal arrives** for that stream (`signal.occurred_at > correction.created_at`). After that, inference resumes and the correction remains in history.

### Trust boundaries
- External: GitHub webhooks and API (untrusted input, validated with schemas), Slack API (outbound messages only in the MVP), browser (authenticated session).
- Secrets: GitHub App private key, webhook secret, OAuth client secret, Slack bot token, session secret. Server-side only; never sent to the client; never logged.

### Data ownership & retention
- The customer owns their data. Deleting a workspace deletes all its rows (hard delete cascade).
- **[OPEN]** Retention of raw signals (proposal: 180 days; streams keep their computed history).

### Failure & recovery
- Webhook handler only verifies, persists the signal and enqueues a recompute; it responds `202` fast. Processing failures are retried; a stream can always be rebuilt by replay (invariant 2).
- If the GitHub App is uninstalled, the workspace's integration is marked `disconnected`; data stays until the workspace is deleted.
- Backfill is resumable and idempotent (uses the same signal keys as webhooks where possible).

---

## IMPLEMENTATION CONTRACT

### Actors
| Actor | Can |
|---|---|
| **Workspace admin** | Connect/disconnect GitHub, choose repositories, configure the digest (channel, time, timezone), delete the workspace |
| **Member** | View Now and stream detail, correct a state, mark a stream "not work" (noise), merge two streams |
| **System** | Ingest signals, recompute states, run backfills, send digests |

### Surfaces
1. **Web app**
   - `/` Now: streams grouped by attention (*Needs attention · In review · Building · Shipped recently*). Each row shows title, repo, state, waiting-on, age, and a one-line reason.
   - `/streams/[id]`: evidence timeline (signals), state history, correction controls.
   - `/settings`: integrations, repositories, digest, members.
   - Onboarding: sign in → connect GitHub → select repos → backfill progress → Now.
2. **Slack digest** (MVP: outbound only): one message per day per workspace with *Shipped · Needs attention (waiting on whom) · In review*, linking back to the app.
3. **HTTP API** (internal; consumed by the web app; versioned under `/api/v1`)
   - `POST /api/webhooks/github`: signature-verified ingestion
   - `GET /api/v1/streams?attention=&phase=&repo=`
   - `GET /api/v1/streams/{id}` with signals, transitions and corrections
   - `POST /api/v1/streams/{id}/corrections`
   - `GET|PUT /api/v1/workspace/settings`
4. **Jobs:** `recompute-stream`, `backfill-repo`, `send-digest`.

### Domain model
| Entity | Key fields |
|---|---|
| `workspace` | id, name, created_at |
| `member` | id, workspace_id, display_name, email?, role (admin/member) |
| `identity` | member_id, provider (github/slack), external_id, login. Maps a GitHub login to a member |
| `integration` | workspace_id, provider, external_installation_id, status (active/disconnected), config |
| `repository` | workspace_id, provider_repo_id, full_name, tracked (bool) |
| `signal` | workspace_id, source, external_id (unique), kind, occurred_at, actor_login, repo_id, refs (pr_number, branch, sha), data (jsonb, metadata only), stream_id? |
| `stream` | workspace_id, repo_id, key (`repo:branch`), title, ticket_key?, author_login, phase, attention, waiting_on (logins[]), reason_code, reason_text, evidence_signal_ids[], state_since, last_activity_at, computed_at |
| `stream_transition` | stream_id, at, from/to phase+attention, evidence_signal_ids[] |
| `correction` | stream_id, member_id, created_at, field (phase/attention/not_work/merge_into), value, note |
| `digest_run` | workspace_id, for_date, status, sent_at, payload |

### Stream identity (MVP rules)
- **[ARCH]** A stream is keyed by `repo + head branch`. All PRs from the same head branch belong to it; pushes to that branch belong to it.
- Ticket keys (`ABC-123`) are parsed from branch names and PR titles and displayed. No Linear/Jira API in the MVP.
- Default branch pushes (`main`) do not create streams.
- **[OPEN]** Stacked PRs and cross-repo streams (later: merge by ticket key or manual merge).

### States and transitions
Two dimensions, so the *why* is explicit:

**Phase** (lifecycle): `building → review → merged` ; any → `closed` (dropped) ; `closed → review` on reopen.

| Phase | Entered when |
|---|---|
| `building` | branch push without PR, or PR is draft |
| `review` | PR open and ready for review |
| `merged` | PR merged (terminal unless new PR on same branch) |
| `closed` | PR closed without merge and no other open PR on the stream |

**Attention** (who must act; evaluated in priority order, first match wins):

| Attention | Rule | `waiting_on` |
|---|---|---|
| `ci_failing` | latest check suite/run conclusion on head SHA is failure | author |
| `changes_requested` | a reviewer's latest review is CHANGES_REQUESTED and no push after it | author |
| `awaiting_review` | phase=review, pending requested reviewers or no review after the latest push | requested reviewers |
| `stale` | no signal for `stale_after` (default 3 business days) and phase ∈ {building, review} | author |
| `none` | otherwise (moving normally; includes approved and waiting to merge) | — |

Every computed state stores `reason_code`, human-readable `reason_text` (e.g. "Waiting on @ana's review for 2 days"), and `evidence_signal_ids`.

### Signal kinds (GitHub, MVP)
`branch_pushed`, `pr_opened`, `pr_ready_for_review`, `pr_converted_to_draft`, `pr_reopened`, `pr_closed`, `pr_merged`, `pr_review_requested`, `pr_review_request_removed`, `pr_review_submitted` (approved/changes_requested/commented), `check_completed` (success/failure/neutral/cancelled).

### Interface implications
- Webhook → `signal` row (idempotent) → enqueue `recompute-stream(stream_key)`.
- Recompute is a pure function in a library module with no I/O (`infer(signals, corrections, config, now) → StreamState`), so it is unit-testable with fixtures.
- Backfill uses the GitHub REST API (PRs, reviews, check runs for the last 14 days) and maps responses to the same signal kinds with deterministic `external_id`s.

### Security / policy
- GitHub App permissions: **read-only** `pull_requests`, `checks`, `contents: metadata only` (no file contents), `members` read. **[OPEN]** confirm minimal permission set when registering the app.
- Sessions: HTTP-only, Secure, SameSite=Lax cookies; CSRF protection on mutating routes.
- Input validation with schemas on every webhook payload and API body.
- Rate limiting on public endpoints (webhooks, auth).

### Observability
- Structured logs with `workspace_id`, `delivery_id`, `stream_id`; no payload bodies or secrets.
- Counters: webhooks received/rejected, signals inserted/duplicate, recompute latency, digest sent/failed, corrections per 100 streams (accuracy KPI).

---

## NON-GOALS (MVP)
- Reading Slack messages (Events API ingestion comes in slice 2), Figma (slice 3), Linear/Jira APIs.
- Per-person analytics, DORA dashboards, forecasting.
- Creating or editing work items manually as a primary flow.
- An open-ended chat assistant.
- Billing.

---

## OPEN QUESTIONS
1. **GitHub App registration** needs the founder's GitHub account (name, webhook URL, private key). Until then: development runs on recorded fixture payloads and a seeded demo workspace. *Not blocking for the build; blocking for real usage.*
2. **Hosting.** Proposal: Postgres (Supabase or Neon) + Next.js on Vercel. Both MCP connectors are available in this environment. Needs the founder's confirmation before any deploy.
3. Business-day calendar and timezone for `stale` (proposal: per-workspace timezone, Mon–Fri).
4. Signal retention period (proposal: 180 days).
5. LLM narrative in the digest: on or off by default? (proposal: off until an API key is configured).

---

## HANDOFF
**Needs architecture review first.** The domain is clear; stack, job execution model, auth and the "pure projection" design need ADRs.
Next ECC lanes: `architect` agent + `architecture-decision-records` → `blueprint` (planner) → `tdd-workflow` for the inference engine first (highest risk, purest code).
