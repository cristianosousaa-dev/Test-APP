# PRODUCT BRIEF: Work-State Graph Engine

*ECC `product-lens`, Mode 1 (Product Diagnostic). 2026-10-01.*
*Facts carry sources. **[H]** = hypothesis to validate.*

---

## Thesis (one sentence)

**The real state of every piece of work, inferred from the work itself (code, design, conversation), with the evidence attached, so nobody has to update a ticket or attend a status meeting to know what is happening.**

---

## 1. Who is this for?

**Primary user:** the **Engineering Manager / Head of Product** at a product team of **10–60 people** that uses **GitHub + Slack + Figma**, with or without Linear/Jira. Today this person runs the daily standup and the weekly status meeting, and spends time chasing "where is this?".

**Secondary users:** the engineers and designers, who are tired of updating tickets and repeating the same status update in standups.

**Not for (yet):** enterprises with heavy compliance processes, non-software teams, teams without GitHub.

## 2. What is the pain?

- **Status is manual and goes stale.** Someone has to move the card. When they don't, the board lies.
- **Meetings exist to compensate.** Standups and status meetings fill the gap the tools leave. Microsoft's Work Trend Index: communication takes ~60% of the workday, ~275 interruptions/day, and 48% of workers describe their work as chaotic and fragmented ([Microsoft WorkLab](https://www.microsoft.com/en-us/worklab/work-trend-index/breaking-down-infinite-workday)).
- **Cross-tool drift is invisible.** A design changes in Figma after the PR is opened; a decision in Slack changes scope; nobody connects these.
- **[H]** For a 20-person team, a 15-minute daily standup costs ≈25 person-hours/week. Must be measured with design partners, not assumed.

## 3. Why now?

1. **LLMs can link unstructured signals** (a Slack thread, a Figma comment) to structured ones (a PR, a branch) cheaply and reliably enough to propose links with confidence scores.
2. **Coding agents multiply the volume of parallel work** **[H]**. More PRs, more branches, more streams. Boards maintained by humans cannot keep up.
3. **The APIs now carry the right signals:**
   - Figma Webhooks V2 can be scoped per file/project and include `FILE_VERSION_UPDATE`, `FILE_COMMENT` and `DEV_MODE_STATUS_UPDATE` (a layer marked *Ready for Dev* or *Completed*) ([Figma changelog](https://developers.figma.com/docs/rest-api/changelog), [webhook types](https://developers.figma.com/docs/rest-api/webhooks-types/)). This is a first-class "design is done" signal.
   - GitHub webhooks: branches, PRs, reviews, checks, deployments.
4. **The market has proven teams accept automated status**, but only in a narrow form (next section).

---

## Competitive reality (search-first)

| Who | What they do | What they don't do |
|---|---|---|
| **Linear** | Moves an issue *In Progress → In Review → Done* when a linked branch/PR changes ([Linear GitHub](https://linear.app/integrations/github)) | Needs a ticket to exist and be linked (ID in branch/PR or magic words). Code only. No *why*. |
| **Standup bots** (Troopr, Geekbot, Spinach, Auto Standup Bot) | Draft standup text from Jira/GitHub/Slack activity ([Troopr](https://www.troopr.ai/slack-standup-bot), [Atlassian Marketplace](https://marketplace.atlassian.com/apps/542311656/auto-standup-bot)) | Text summaries per person; no persistent state model, no evidence graph, no cross-tool drift. |
| **Engineering intelligence** (Swarmia $11M Series A 2025; LinearB ~$79M total; Jellyfish; **DX, acquired by Atlassian for ~$1B, Nov 2025**) | DORA metrics, PR cycle time, investment allocation for leaders ([Atlassian/DX](https://www.atlassian.com/blog/announcements/atlassian-acquires-dx), [Swarmia](https://www.thesaasnews.com/news/swarmia-raises-11-million-in-series-a/), [Tracxn/LinearB](https://tracxn.com/d/companies/linear-b/__5q5tGeAXW0cuz_QrmX9U6dn22G505r0fnEhKYFeGxEQ)) | Aggregate metrics, not "where is *this* piece of work and why". |
| **Context layers** (Atlassian Teamwork Graph/Rovo, Microsoft Work IQ, Glean) | Search and agents over company data | Horizontal search; no state machine for work. |

**The gap we occupy:**
1. **The work stream is the unit, not the ticket.** We cluster branch + PRs + Figma frames + Slack threads into one stream, even when no ticket exists.
2. **Every state comes with evidence.** "In review for 3 days; waiting on Ana's review; CI green" carries links to the events that justify it.
3. **Cross-tool drift detection.** "Design changed after implementation started", "decision in Slack not reflected in the PR".

**Honest risk:** Linear already removes a large share of manual updates for teams living inside Linear. Our wedge must be visible in the first 10 minutes: work without tickets, the *why*, and cross-tool drift. Not "auto-move cards".

---

## 4. The 10-star version

The company's live work-state graph: every initiative, stream, decision and dependency, always current. Answers "why is this late?", predicts slips before they happen, and acts by nudging the right reviewer, opening the follow-up, or writing the update for the client. Status meetings cease to exist.

## 5. MVP (smallest thing that proves the thesis)

**Hypothesis to prove:** *a team can cancel its standup and still know what is happening, because the inferred state is correct and explained.*

**In scope:**
1. **GitHub** (GitHub App, read-only): PRs, reviews, commits, branches, checks. Backfill the last 14 days on install, so value is visible in minutes.
2. **Inference engine** (deterministic first): work streams + state (`active`, `in_review`, `blocked`, `waiting_on`, `shipped`, `stale`) + evidence for each state.
3. **"Now" view:** what moved, what is stuck and why, who is waiting on whom. One screen, Linear-grade.
4. **Daily digest to Slack** that replaces the standup.
5. **Correction loop:** one click to say "this is wrong". This measures accuracy and builds trust.

**Second slice (after the core is proven):** Slack threads linked to streams (Events API) → Figma `DEV_MODE_STATUS_UPDATE` + version updates → drift detection.

## 6. Anti-goals

- **Not a task tracker.** No manual task creation as the primary flow.
- **Not surveillance.** No per-person productivity scores, leaderboards or activity rankings. State belongs to *work*, not to people.
- **Not a DORA dashboard.** Metrics are not the product.
- **Not a chatbot.** No open-ended assistant; questions are answered from the graph with citations.

## 7. How we know it's working (metrics, not vibes)

| Metric | Target for design partners |
|---|---|
| Time from install to first useful "Now" view | < 10 min |
| Inferred state marked wrong by users | < 10% of streams |
| Design-partner teams that cancel or shorten their standup | ≥ 3 of 5 within 4 weeks |
| Weekly active viewers / team size | ≥ 60% |
| Digest opened (Slack) | ≥ 70% of working days |

---

## Risks

| Risk | Severity | Mitigation |
|---|---|---|
| **Slack API limits:** non-Marketplace commercial apps get `conversations.history`/`replies` cut to **1 req/min and 15 objects**, applied to existing installs from 3 Mar 2026 ([Slack changelog](https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps/)) | High for Slack ingestion | Use the **Events API (push)** for new messages instead of history polling; no Slack backfill until Marketplace approval; Slack is *delivery* in the MVP. |
| Linear/Atlassian ship the same | High | Win on cross-tool, ticket-less streams and evidence; stay tool-neutral (works with Linear, Jira or nothing). |
| Inference accuracy destroys trust | High | Deterministic rules first, every state explained, one-click correction, LLM only for linking and narrative with confidence thresholds. |
| Perceived as surveillance | Medium | Anti-goal enforced in the product; team-level visibility; no per-person scoring. |
| Security trust of a GitHub App | Medium | Read-only scopes, metadata-first (no source code storage), visible data policy. |

---

## Go / No-go

**GO, re-scoped.** Build the MVP as **GitHub-first state inference + evidence + Slack digest**, positioned against *standups and stale boards*, not against Linear's auto-status. Slack reading and Figma come after the core accuracy is proven.

**Conditions that would flip to NO-GO:** < 3 of 5 design partners willing to try cancelling the standup, or > 25% of inferred states corrected after tuning.

**Next lane:** `product-capability`, then turn this brief into an implementation contract (states, transitions, invariants, interfaces).
