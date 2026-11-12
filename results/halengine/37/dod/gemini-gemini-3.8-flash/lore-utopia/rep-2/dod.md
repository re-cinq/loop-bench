# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry` and its `execute` and `register` methods already exist as public interfaces; acceptance tests exercise them directly with real inputs and schemas without stubs or mocks.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field and does not invoke the executor** — validates that execute checks required fields against inputSchema and returns a ToolResponse without invoking the executor
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a call whose field type is wrong, naming the field path and expected type but not the value** — validates type mismatch rejection and ensures the offending value is redacted from the response
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time when the inputSchema is uncompilable and the message names the tool** — validates that invalid schemas cause register to throw synchronously naming the tool
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add ajv to dependencies in package.json
- [ ] Compile static schemas at register time, throwing with the tool name if invalid
- [ ] Validate input against resolved inputSchema in ToolRegistry.execute before calling executor
- [ ] Return ToolResponse describing failure without leaking property values on validation error
- [ ] Add one-line doc comment on execute pointing to specs/hal-engine-tool-input-validation/spec.md
- [ ] Update README.md, docs/adding-a-tool.md, and .specify/spec.md
- [ ] Add CHANGELOG.md entry for 0.4.0

## Out of scope

- Validating tool output
- Invented/unknown tool name handling (remains Error throw)
- Per-tool authorization, retry, and rate limiting