# ADR-0005: Better Auth with GitHub App OAuth and guarded dev login

**Date**: 2026-10-01
**Status**: accepted
**Deciders**: founder, Claude (ECC architect review)

## Context

Users are engineering teams on GitHub. Sign-in should be one click, sessions secure, and local development must work before a real GitHub App exists.

## Decision

We use Better Auth with the GitHub provider, the Drizzle adapter and database sessions in HTTP-only, Secure, SameSite=Lax cookies. Sign-in uses the GitHub App's own user-to-server OAuth credentials (one GitHub registration). Workspace membership is confirmed via `GET /user/installations`; user tokens are not retained (or are encrypted if they must be). A dev-only email login is enabled with `DEV_LOGIN=1`, and boot fails if it is on with `NODE_ENV=production`.

## Alternatives Considered

### Auth.js
- **Why not**: v5 stayed in beta for a long time and its maintenance has moved under Better Auth.

### arctic + own sessions
- **Pros**: minimal dependencies.
- **Cons**: we own more security-critical code.
- **Why not**: kept as the fallback if Better Auth becomes a problem.

## Consequences

### Positive
- One-click GitHub sign-in; working demo locally without credentials.

### Negative
- Another fast-moving dependency to pin and track.

### Risks
- Dev login leaking to production. Mitigation: boot-time guard and a test for it.
