# ADR-0009: Tailwind v4 + shadcn/ui, Inter, polling refresh

**Date**: 2026-10-01
**Status**: accepted
**Deciders**: founder, Claude (ECC architect review)

## Context

The UI must feel Linear-grade: fast, keyboard-first, quiet, with excellent typography and accessible primitives, built by a tiny team.

## Decision

Tailwind CSS v4 with shadcn/ui components copied into the repo and restyled with a tight token set. Inter Variable via `next/font` (with `tabular-nums` for ages and counts) and JetBrains Mono for branches and SHAs. `lucide-react` icons. `cmdk` command palette, j/k navigation, `useOptimistic` for corrections. Live refresh by polling `/api/v1/streams` every 20 s while the tab is visible, with an ETag from `max(computed_at)`.

## Alternatives Considered

### Primitives from scratch
- **Why not**: accessibility cost (focus, ARIA, keyboard) is high.

### MUI / Chakra
- **Why not**: heavy and generic-looking.

### Server-Sent Events
- **Why not**: serverless timeouts and LISTEN connections for changes that happen on a minute scale.

## Consequences

### Positive
- Owned components, accessible defaults, consistent tokens.

### Negative
- Polling adds light, constant load.

### Risks
- Visual drift. Mitigation: ECC `design-system` audit before launch.
