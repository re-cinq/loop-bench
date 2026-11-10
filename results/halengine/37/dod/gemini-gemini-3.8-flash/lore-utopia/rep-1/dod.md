# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.execute` is already a public method with a defined signature; tests call it directly on a real `ToolRegistry` instance and observe whether validation happens before the executor runs.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field and does not invoke the executor** — validates that a missing required field produces a rejection ToolResponse and the executor call count is 0
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a call whose field type is wrong, naming the field path and expected type but not the value** — validates type-mismatch rejection including PII redaction of the offending value
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time when the inputSchema is uncompilable and the message names the tool** — validates compile-at-register behaviour
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json`
- [ ] Compile static schemas at `register` time; throw naming the tool on failure
- [ ] In `execute`, resolve the definition source and validate input against its schema; on failure return a `ToolResponse` with a message naming the failing path and constraint (no values)
- [ ] Cache compiled validators for function-valued sources by resolved schema object identity
- [ ] Pass valid input with extra properties through to executor unchanged
- [ ] Add one-line doc comment to `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Add unit tests in `src/orchestration/tools/registry.test.ts` and tool-loop retry test in `src/orchestration/chatOrchestrator.test.ts`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`
- [ ] Add CHANGELOG entry for minor version bump

## Out of scope

- `Unknown tool: <name>` throw becoming a tool result (tracked separately)
- Validating tool output
- Per-tool authorisation, retry, rate limiting