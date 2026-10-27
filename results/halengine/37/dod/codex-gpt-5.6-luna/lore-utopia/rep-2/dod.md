# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is the real public seam and can be called with registered definitions and real executor functions. The acceptance tests observe returned `ToolResponse` values and executor calls without mocks or source-text assertions.

## Done when these pass

- [ ] **rejects a missing required property before invoking the executor** — a required-field failure is returned as a tool result and the executor is not called.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed value without exposing it** — a type failure names the field and expected type while omitting the offending value.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input and extra properties through unchanged after rejecting invalid input** — valid input, including an undeclared property, is forwarded once and unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an uncompilable schema during registration** — a broken static schema fails at registration and names its tool.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates function-valued definitions against the schema current at each call** — a dynamic definition is not validated against a stale schema.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Return a descriptive validation `ToolResponse` before invoking an executor.
- [ ] Preserve valid unknown properties without coercion or defaults.
- [ ] Compile static schemas at registration and resolve function-valued schemas per call.

## Out of scope

- Unknown tool names continue to throw, as specified by the ticket.
- Tool output validation, authorization, retries, timeouts, rate limiting, documentation, dependency/version changes, and migration notes are not acceptance behavior covered by this direct seam.