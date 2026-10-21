# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is a callable public seam, and its current implementation reaches the executor directly. The acceptance tests exercise that real entry point with registered schemas.

## Done when these pass

- [ ] **Reject missing required input** — returns a validation result and never invokes the executor
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Reject a wrong field type** — describes the field and expected type without exposing its supplied value
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Preserve valid input** — passes extra properties unchanged to the executor exactly once
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Validate registered input against its JSON Schema before executor invocation.
- [ ] Return validation failures as `ToolResponse` values without exposing rejected values.
- [ ] Preserve valid input exactly, including unlisted properties.

## Out of scope

- Tool loop retry behavior, schema compilation timing and caching, and documentation or release changes.
- Unknown tool names continue to use their existing error path.