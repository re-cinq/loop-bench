# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.execute` is already the public entry point for tool execution with a defined signature; tests call it directly on a real `ToolRegistry` instance and assert that input validation happens before the executor runs. Every test fails today because schema validation is completely absent.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field and does not invoke the executor** — validates that `execute` checks the schema for required properties, returning a rejection `ToolResponse` and leaving executor calls at 0
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a wrong-typed field naming the field path and expected type without leaking the offending value** — validates constraint checking on field types and ensures the offending value is redacted from both the rejection result and log lines
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time when the inputSchema is uncompilable and the message names the tool** — validates that static tool schemas are compiled synchronously at registration and throw an error naming the tool on invalid schemas
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates each call against the schema a function-valued definition source returns at that call** — validates that dynamic tool definitions are resolved and validated per call rather than using a stale schema
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json`
- [ ] Compile static tool schemas at `register` time and throw an Error naming the tool if compilation fails
- [ ] Validate input against `inputSchema` in `execute` before invoking the executor, returning a rejection `ToolResponse` on validation failure without leaking property values
- [ ] Compile and cache schemas for function-valued `ToolDefinitionSource` per call
- [ ] Add one-line doc comment to `execute` referencing `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, and `.specify/spec.md`
- [ ] Add CHANGELOG entry for minor version bump

## Out of scope

- `Unknown tool: <name>` throw becoming a tool result (tracked separately)
- Validating tool output
- Per-tool authorization, retry, timeout, or rate limiting
- Hallucination detection or evaluation harnesses