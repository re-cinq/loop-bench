# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`). Every tool declares a JSON Schema (`src/types/ai.ts`) that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.execute` is already a public method with a defined signature; acceptance tests call it directly on a real `ToolRegistry` instance and observe whether validation happens before the executor runs.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field and does not invoke the executor** — validates that a missing required field produces a rejection ToolResponse and the executor call count is 0
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a wrong-typed field naming the property and expected type without leaking the offending value** — validates type-mismatch rejection including PII redaction of the offending value from both returned text and log output
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time when the inputSchema is uncompilable and the message names the tool** — validates that a static tool's inputSchema is compiled at registration time and fails fast on an uncompilable schema
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates each call against the schema the definition function returns at that call** — validates that function-valued tool definition sources resolve and compile their schema per call
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json`
- [ ] Compile static schemas at `register` time; throw naming the tool on failure
- [ ] In `execute`, resolve the definition source and validate input against its schema; on failure return a `ToolResponse` with a message naming the failing path and constraint (no values)
- [ ] Cache compiled validators for function-valued sources by resolved schema object identity (not by registration)
- [ ] Add one-line doc comment to `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, and `.specify/spec.md`
- [ ] Add CHANGELOG.md entry
- [ ] Run `node scripts/repoint-spec-anchors.mjs` after any edits that shift line numbers in cited files

## Out of scope

- `Unknown tool: <name>` throw becoming a tool result (tracked separately)
- Validating tool output
- Per-tool authorization, retry, rate limiting
- Static "compile once across 10 calls" test (observable behavior is covered by repeated calls; compile count is an internal implementation detail)