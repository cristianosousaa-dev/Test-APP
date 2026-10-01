# ECC agents & skills (curated)

Subset copied from [everything-claude-code](https://github.com/affaan-m/everything-claude-code) v2.2.2 (MIT, see `ECC-LICENSE`).
Only markdown agents and skills; no hooks, scripts or MCP configs. Committed so they survive ephemeral cloud containers.

**Agents** (`.claude/agents/`): planner, architect, code-reviewer, typescript-reviewer, react-reviewer,
security-reviewer, database-reviewer, tdd-guide, e2e-runner, silent-failure-hunter, build-error-resolver,
performance-optimizer, type-design-analyzer, refactor-cleaner, doc-updater.

**Skills** (`.claude/skills/`): product-lens, product-capability, blueprint, architecture-decision-records,
search-first, contract-first, api-design, backend-patterns, postgres-patterns, database-migrations,
frontend-patterns, nextjs-turbopack, design-system, make-interfaces-feel-better, tdd-workflow,
verification-loop, e2e-testing, coding-standards, error-handling.

## How they map to the build

| Phase | ECC piece |
|---|---|
| Product definition | `product-lens`, `product-capability`, `search-first` |
| Architecture | `architect` agent, `architecture-decision-records`, `contract-first`, `api-design` |
| Plan | `planner` agent, `blueprint` |
| Build | `tdd-workflow` / `tdd-guide`, `backend-patterns`, `postgres-patterns`, `database-migrations`, `frontend-patterns`, `nextjs-turbopack`, `design-system`, `make-interfaces-feel-better`, `error-handling` |
| Verify | `verification-loop`, `e2e-testing` / `e2e-runner`, `code-reviewer`, `typescript-reviewer`, `react-reviewer`, `security-reviewer`, `database-reviewer`, `silent-failure-hunter` |
