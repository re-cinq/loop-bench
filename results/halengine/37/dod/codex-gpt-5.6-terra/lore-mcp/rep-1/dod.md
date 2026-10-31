# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are public, real entry points. The acceptance tests register concrete tools and observe their executor results without altering production code.

## Done when these pass

- [ ] **rejects schema-invalid calls before invoking the executor while preserving accepted input** — required, type, and enum failures return a redacted result before execution, while valid extra properties pass through unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an invalid static schema when registering its named tool** — static schemas fail early and identify the invalid tool.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each function-defined tool call against its current schema** — dynamic definitions do not reuse an earlier schema.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas during registration and return redacted validation `ToolResponse` values before an executor runs.
- [ ] Resolve function-valued definitions per call and cache validators only by the resolved schema object.
- [ ] Preserve unknown input properties and the existing unknown-tool exception.

## Out of scope

- Tool-output validation, authorization, retry and timeout policy, and changing the existing unknown-tool error into a tool response.