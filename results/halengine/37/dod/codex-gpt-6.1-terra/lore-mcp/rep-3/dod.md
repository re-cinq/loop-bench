# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `execute` expose the real registration and execution boundary directly.

## Done when these pass

- [ ] **rejects invalid input and passes valid input unchanged** — Required, type and enum violations return useful, value-free errors without invoking the executor; valid extra properties pass through unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an invalid static schema during registration with the tool name** — Invalid static schemas fail at startup with the tool identified.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each call against the current dynamic schema** — Dynamic definitions use the current schema for each invocation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas at registration and cache dynamic schemas by resolved object; use a runtime JSON Schema dependency.
- [ ] Return value-free property and constraint errors before execution, without coercion, defaults or rejecting extra keys; keep unknown tool errors unchanged.
- [ ] Verify rejection logs omit input values and the orchestrator feeds the result back for a corrected retry within the existing round limit.
- [ ] Update the named documentation, migration note, minor version and changelog as specified in the ticket.

## Out of scope

- Tool output validation, authorization, execution retries, timeouts, rate limits and changing unknown-tool handling.