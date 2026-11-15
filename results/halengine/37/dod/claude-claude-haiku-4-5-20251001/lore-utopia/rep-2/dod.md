# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator added to `dependencies` — compile a static tool's schema once at `register` time so a broken schema fails at startup, not mid-conversation; a schema produced by a function-valued `ToolDefinitionSource` resolves and compiles per call, cached by the resolved schema object. A rejection returns a `ToolResponse` rather than throwing, so a malformed call becomes something the model can read and correct within the existing `DEFAULT_MAX_TOOL_ROUNDS = 5` budget.

**Strategy: `direct`** — The `ToolRegistry.execute` method is the entry point for tool execution and a clear seam exists. The acceptance tests call `execute` directly and observe the behavior through the returned `ToolResponse`.

## Done when these pass

- [ ] **validates required fields and rejects missing input** — Missing required fields return a `ToolResponse` with a validation error, and the executor is never called
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **passes valid input with unlisted extra properties to executor unchanged** — Valid input with extra properties passes through unchanged to the executor (toEqual check ensures no defaults or coercion)
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects wrong-typed field with message naming field path and type, not value** — Type mismatches are rejected with a message naming the field path and expected type, but never the actual value
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time for uncompilable schema** — An invalid schema throws during `register()` with a message naming the tool
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates function-valued schemas against current schema on each call** — Function-valued schemas are resolved per call and validated against the current schema, not a stale cached version
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **compiles static schemas once across multiple execute calls** — Static schemas are compiled once at register time and reused across calls
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws for unknown tool name** — Unknown tool names still throw `Unknown tool: <name>`, unchanged behavior
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects enum constraint violations** — Enum constraint violations are rejected with a message naming the field, not the invalid value
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in package.json
- [ ] Create validator instance in registry to compile schemas at register time
- [ ] Add schema compilation to `register()` method; throw on invalid schema
- [ ] Add input validation to `execute()` method before calling executor
- [ ] Return validation error as `ToolResponse` instead of throwing
- [ ] Handle function-valued schemas: resolve per call, cache by resolved schema object
- [ ] Ensure rejection messages never include property values (redaction)

## Out of scope

- Tool output validation
- Hallucination detection
- Per-tool authorization
- Changing the `Unknown tool: <name>` throw to a `ToolResponse`
- Retry, timeout, and rate limiting around tool execution