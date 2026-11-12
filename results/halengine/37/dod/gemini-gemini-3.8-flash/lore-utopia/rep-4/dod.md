# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are existing public methods on a defined class. Acceptance tests invoke them directly on real instances and observe whether schema compilation and input validation occur.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field and does not invoke the executor** — validates that input missing a required property returns a rejection ToolResponse describing the failure and the executor is not invoked
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a call whose field type is wrong, naming the field path and expected type but not the value** — validates that input violating a declared type returns a rejection ToolResponse naming the field path and expected type without leaking the offending value
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time when the inputSchema is uncompilable and the message names the tool** — validates that registering a static tool with an uncompilable inputSchema throws synchronously at registration time naming the tool
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json`
- [ ] Compile static schemas at `register` time and throw an error naming the tool on failure
- [ ] Validate tool input against `inputSchema` in `execute` before invoking the executor, returning a `ToolResponse` describing failure without calling the executor
- [ ] Redact property values from validation failure messages and logs
- [ ] Resolve and validate function-valued `ToolDefinitionSource` dynamically per call, cached by schema identity
- [ ] Add one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, and `.specify/spec.md`
- [ ] Add entry to `CHANGELOG.md`

## Out of scope

- The `Unknown tool: <name>` throw becoming a tool result (tracked separately)
- Validating tool output
- Per-tool authorisation, retry, rate limiting