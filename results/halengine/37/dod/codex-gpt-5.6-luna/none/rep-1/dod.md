# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is the existing real entry point, and a real executor closure can observe whether validation happens before execution without mocks.

## Done when these pass

- [x] **rejects missing required tool input before invoking the executor** — a registered tool requiring `location` returns a rejection naming `location` as required for `{}`, and its executor call count remains zero.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [x] Register a tool with a required `location` string schema and a counting executor.
- [x] Execute the tool with missing input and assert the returned validation result and zero executor calls.
- [x] Split acceptance test to one expect per `it` block (re-lint/max-expects).
- [x] Advance spec.md Status to Shipped (re-lint/require-status-matches-coverage).
- [x] Add CHANGELOG entry under [Unreleased] (scripts/check-changelog.sh).

## Out of scope

- Valid input passthrough, type and enum diagnostics, schema compilation caching, dynamic definitions, tool-loop retries, logging redaction, documentation, packaging, and migration/version changes are not pinned by this focused acceptance test.