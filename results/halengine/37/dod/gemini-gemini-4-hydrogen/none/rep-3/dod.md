# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and `createChatOrchestrator` already exist as public entry points and currently pass inputs straight through to tool executors without checking `inputSchema`. The four acceptance tests exercise those real entry points and fail today because schema validation is absent.

## Done when these pass

- [ ] **rejects schema-violating input with a ToolResponse without invoking the executor or leaking values** — missing `required` properties, wrong types, and invalid `enum` values return a `ToolResponse` naming the failing property and constraint, keep executor call count at `0`, never leak offending values into responses or logs, and still throw `Unknown tool: <name>` for unregistered tools.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **forwards valid input with extra properties unchanged without defaults or type coercion** — extra unlisted properties are preserved verbatim to the executor without injecting `additionalProperties: false` or applying schema defaults, while string values for number fields are rejected rather than coerced.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas once at registration and resolves dynamic schemas per call** — `register` throws naming the tool on an uncompilable static schema, static schemas compile once at `register` time across repeated `execute` calls, and function-valued `ToolDefinitionSource` definitions validate against the schema returned on each call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds schema validation rejections back into the orchestrator tool loop for retry** — `createChatOrchestrator` feeds a validation rejection `ToolResponse` back to the provider as a `tool_result` so the model can correct its arguments and complete the turn without throwing.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json` and update `package-lock.json`.
- [ ] Compile static schemas once in `ToolRegistry.register` (throwing an error naming the tool on invalid schema) and cache compiled validators per resolved schema object (`WeakMap`) for function-valued `ToolDefinitionSource` tools in `src/orchestration/tools/registry.ts`.
- [ ] Validate `input` in `ToolRegistry.execute` before calling the executor, returning `{result}` naming failing paths/constraints without offending values, and logging rejection metadata without values.
- [ ] Add a one-line doc comment on `ToolRegistry.execute` referencing `specs/hal-engine-tool-input-validation/spec.md` and link unit tests for any remaining unlinked statements in the spec (updating `| Status |` to `Shipped` once all statements are cited).
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `example/weather-tool.ts`, and `CHANGELOG.md` to document built-in `inputSchema` validation.

## Out of scope

- Per-tool opt-out flags, `additionalProperties: false` injection, type coercion, or default-value injection.
- Caller authorization (`beforeToolCall` veto hooks), retry/timeout/rate-limiting around tool execution, and concrete tool implementations.
- `AIProvider.generateStructured` schema validation (`specs/hal-engine-providers/spec.md`).