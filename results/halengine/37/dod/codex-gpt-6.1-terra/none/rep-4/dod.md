# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `execute` expose the actual registry boundary, so tests can exercise real definitions and executors directly.

## Done when these pass

- [ ] **rejects invalid input without executing or exposing values and passes valid input unchanged** — Required, type and enum failures return safe, useful results; accepted input passes through, and unknown tools still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an invalid static schema when registering its tool** — Invalid static schemas fail at registration and identify the tool.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each call against the current dynamic definition** — Dynamic definitions use the schema resolved for each call.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas at registration and validate required fields, types and enums before execution, returning safe diagnostic results.
- [ ] Resolve and cache dynamic schemas by object while preserving extra properties and input values without coercion or defaults.
- [ ] Verify static compilation happens once across ten executions and exercise a rejected call followed by a corrected retry through the tool loop.
- [ ] Update the specified documentation, contract, changelog, dependency and minor version; include the migration note in the PR.

## Out of scope

- Changing unknown-tool errors, validating tool output, authorization, execution retries or implementing tools.