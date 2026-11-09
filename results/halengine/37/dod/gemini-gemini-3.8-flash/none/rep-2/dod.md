# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.execute` and `register` are already public methods with defined signatures; acceptance tests call them directly on a real `ToolRegistry` instance and observe whether schema validation and compilation occur.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field and does not invoke the executor** — validates that input missing a required property produces a rejection ToolResponse and the executor is never invoked
      `src/orchestration/tools/toolValidation.acceptance.test.ts`

- [ ] **rejects a call whose field type is wrong, naming the field path and expected type but not the value** — validates that wrong-typed input is rejected with field path and expected type while redacting the offending value
      `src/orchestration/tools/toolValidation.acceptance.test.ts`

- [ ] **throws at register time when the inputSchema is uncompilable and the message names the tool** — validates that static schemas are compiled at registration time and uncompilable schemas throw synchronously naming the tool
      `src/orchestration/tools/toolValidation.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json`
- [ ] Compile static tool schemas at `register` time and throw naming the tool if uncompilable
- [ ] In `ToolRegistry.execute`, validate `input` against resolved `inputSchema` before calling the executor
- [ ] Return a rejection `ToolResponse` naming failing property paths and constraints without exposing property values
- [ ] Support function-valued `ToolDefinitionSource` by resolving and compiling per call, caching by schema object
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and tool-loop retry test in `src/orchestration/chatOrchestrator.test.ts`
- [ ] Add one-line doc comment on `execute` referencing `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, and `.specify/spec.md`
- [ ] Add `CHANGELOG.md` entry

## Out of scope

- `Unknown tool: <name>` throw becoming a tool result (tracked separately)
- Validating tool output
- Per-tool authorization, retry, rate limiting, or execution timeouts
- Coercing types, injecting defaults, or adding `additionalProperties: false`