# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The registry's public registration and execution methods expose the behavior using real definitions and executors.

## Done when these pass

- [ ] **rejects invalid input without exposing values and passes valid input unchanged** — Validate required, type and enum constraints, preserve accepted input, redact values, and retain unknown-tool errors.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an uncompilable static schema at registration with the tool name** — Fail early with actionable attribution.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition against its current schema** — Resolve validation against the current definition for each call.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas at registration and cache validators for dynamic schema objects; use a runtime dependency.
- [ ] Return descriptive, value-free validation results before invoking executors; preserve valid input and unknown-tool errors.
- [ ] Verify compilation reuse and corrected retries through the tool loop with the existing test infrastructure.
- [ ] Update the registry contract, README, tool guide, system spec, changelog, minor version and PR migration note as specified in the ticket.
- [ ] Run the ticket's CI checks and ensure all added tests have spec links.

## Out of scope

- Tool output validation, authorization, unknown-tool behavior changes, execution retries and actual tool implementations.