# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry` already exposes `register` and `execute`, `createChatOrchestrator` wires `ToolRegistry` into the model tool loop, and `setLogger` exposes log output without mocks. All five acceptance tests call these real entry points directly and fail today because `inputSchema` is neither compiled at registration nor validated before execution.

## Done when these pass

- [ ] **returns a rejection ToolResponse naming missing required fields before running the executor** — `ToolRegistry.execute` rejects `{}` for a required `location` property without invoking the executor and returns a `ToolResponse` naming `location` as required.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects type and enum violations without leaking offending or identifying values in results or logs** — wrong-typed and invalid-enum inputs are rejected before execution with field path and constraint details, and neither returned text nor log lines include offending or identifying payload values.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time naming the tool when its inputSchema cannot compile** — `ToolRegistry.register` compiles static schemas eagerly and throws an error naming the tool when compilation fails.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **re-validates a function-valued tool definition against the current schema on each call** — a function-valued `ToolDefinitionSource` whose returned `inputSchema` changes between calls validates against the current schema rather than a stale cached validator.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds validation rejections back to the model for retry and passes valid input with extra fields unmodified** — `ChatOrchestrator` hands a schema rejection back as a `tool_result` so the model retries, enforces `required`/types/`enum` without type coercion or defaults, and passes unlisted extra properties through to the executor unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json` and configure a non-coercing, non-defaulting, non-verbose validator instance in `src/orchestration/tools/registry.ts`.
- [ ] Compile static `ToolDefinition` schemas once at `register` time (throwing with the tool name on invalid schema) and cache function-valued `ToolDefinitionSource` validators by resolved schema object (`WeakMap`).
- [ ] Validate `input` in `ToolRegistry.execute` before invoking the executor, returning a rejection `ToolResponse` naming only failing paths and constraints (never values) and logging without payload values, while keeping `Unknown tool: <name>` throw intact.
- [ ] Add one-line doc comment on `ToolRegistry.execute` pointing to `specs/hal-engine-tool-input-validation/spec.md`, plus unit tests in `src/orchestration/tools/registry.test.ts` (static compile-once across repeated calls, `Unknown tool` throw) and link them in `specs/hal-engine-tool-input-validation/spec.md`, updating spec status to `Shipped`.
- [ ] Update `docs/adding-a-tool.md`, `README.md`, and `.specify/spec.md` to reflect automatic `inputSchema` validation, and verify `example/weather-tool.ts` and `smoke/full.mjs` still pass.

## Out of scope

- Output validation of tool return values, `beforeToolCall` / human-oversight veto hooks, retry/timeout/rate-limiting around tool execution, and any actual domain tool implementation.