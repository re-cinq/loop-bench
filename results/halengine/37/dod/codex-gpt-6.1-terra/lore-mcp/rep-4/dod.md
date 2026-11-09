# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `execute` expose the real tool boundary and accept real schemas and executors.

## Done when these pass

- [ ] **rejects invalid inputs and passes valid input through unchanged** — Required fields, types and enums reject without invoking the executor or exposing values; valid inputs retain extra properties and receive no defaults or coercion.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each function-valued definition against its current schema** — Each call uses the resolved schema rather than a stale definition.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an uncompilable static schema at registration with the tool name** — Invalid static schemas fail at startup with an actionable tool name.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas on registration and cache dynamic schemas by resolved object; retain the existing unknown-tool exception.
- [ ] Validate before invoking tools and return actionable, value-free rejection results and logs; preserve accepted input unchanged.
- [ ] Verify static schemas compile once and a rejected call can be corrected in the bounded orchestrator tool loop.
- [ ] Update the named documentation, contract comment, changelog, dependency and minor version; include the migration note in the PR.
- [ ] Run the repository's required CI checks.

## Out of scope

- Tool output validation, authorization, unknown-tool behavior changes, execution retries, timeouts and rate limits.