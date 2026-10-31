# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is an existing public seam, so the acceptance tests exercise a real registry and the orchestration loop. They fail because schema validation and rejection handling are absent, rather than because a new entry point is missing.

## Done when these pass

- [ ] **rejects invalid input safely before invoking the executor while preserving accepted input** — schema-invalid calls name the constraint without exposing values, valid extra properties pass through unchanged, and unknown tools still throw
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and resolves function schemas per call** — invalid static schemas fail at registration and dynamic definitions do not use stale schemas
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a schema rejection to the provider so its corrected retry resolves** — a rejected call returns to the provider and a corrected retry completes the tool loop
      `src/orchestration/toolInputValidation.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator as a runtime dependency and compile static schemas during registration.
- [ ] Return value-redacted validation `ToolResponse` values before invoking executors; cache dynamic validators by resolved schema object.
- [ ] Update the registry contract comment, tool documentation, README, system spec, changelog, and release migration note.

## Out of scope

- Validating tool output, authorization, retries, timeouts, rate limiting, and changing the `Unknown tool` throw into a tool result.