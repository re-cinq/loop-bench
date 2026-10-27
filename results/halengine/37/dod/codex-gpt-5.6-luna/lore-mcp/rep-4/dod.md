# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` and `ToolRegistry.register` are callable directly, so the acceptance tests exercise the real registry entry points without mocks or stubs.

## Done when these pass

- [ ] **rejects missing required input and passes valid extra properties through unchanged** — invalid input returns a descriptive `ToolResponse` without invoking the executor, while valid unknown keys reach it unchanged and exactly once.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a wrong-typed field without leaking its value** — a type failure names the property and expected type but not the offending value.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **compiles static schemas once and uses the current function-valued schema** — static schemas are compiled at registration and dynamic definitions are validated against the schema resolved for each call.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects an uncompilable schema at registration** — a broken static schema fails startup and identifies its tool.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add JSON Schema validation at the registry boundary while preserving the existing executor response normalization.
- [ ] Cache compiled static and resolved dynamic schemas with registration-time failures for static tools.
- [ ] Keep validation failures as model-readable `ToolResponse` values and redact input values from failure text and logs.

## Out of scope

- Unknown tool names continue to throw `Unknown tool: <name>`.
- Tool output validation, authorization, retries, timeouts, rate limiting, and implementation of individual tools.