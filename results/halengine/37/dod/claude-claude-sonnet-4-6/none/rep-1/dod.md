# Definition of Done

> "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`"

**Strategy: `direct`** — the seam exists: `ToolRegistry.execute` is a public method on `ToolRegistry` that can be called directly in tests, and `createChatOrchestrator` provides the end-to-end seam for the integration test.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field and does not invoke the executor** — `execute` with `{}` against a schema requiring `location` returns a ToolResponse whose `result` contains "location" and whose executor call count is 0
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **returns a ToolResponse with the field path in the message but not the offending value when a property has the wrong type** — `execute` with `{name: 12345}` against a schema requiring `name` as string returns a ToolResponse containing "name" but not "12345", executor count 0
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **feeds the validation failure back to the model as a ToolResponse so processMessage resolves through a rejected tool call** — provider calls search with `{q: 99}` (number, not string) in round 1; orchestrator feeds the rejection ToolResponse back; provider returns text in round 2; `processMessage` resolves with executor call count 0
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json` (it is already in `node_modules` as a transitive dep but not declared)
- [ ] In `ToolRegistry`, compile schemas at `register` time (static) or per call (function-valued); inject `Ajv` validator
- [ ] In `execute`, run compiled validate; on failure return `{result: <ajv error text>}` without calling executor
- [ ] Ensure rejection messages include property path and constraint but not property values
- [ ] Add a one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, and `.specify/spec.md` per ticket
- [ ] Add `CHANGELOG.md` entry for the MINOR version bump
- [ ] Confirm `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits 0

## Out of scope

- `Unknown tool: <name>` throw stays unchanged (intentional — tracked separately)
- Validating tool output
- Per-tool authorization
- Retry, timeout, rate limiting around tool execution
- Schema compilation caching by object identity for function-valued tools (can be added as an optimization)