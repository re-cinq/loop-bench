# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is an existing callable seam. The acceptance tests invoke it with real registered definitions and executors.

## Done when these pass

- [ ] **Reject missing required input** — an invalid call returns a result naming the missing field and leaves the executor uncalled.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Pass valid input through unchanged** — an undeclared extra property remains intact at the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Resolve dynamic schemas per call** — each execution is checked against the function-valued definition's current schema.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Return a validation rejection before executor invocation for missing required input.
- [ ] Preserve valid input, including undeclared properties, without mutation.
- [ ] Resolve and validate against the current schema for function-valued definitions.

## Out of scope

- Tool output validation and authorization.
- Unknown tool handling, which remains an exception.