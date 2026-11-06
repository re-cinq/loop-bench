# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`. Every tool declares a JSON Schema that is handed verbatim to both providers, but nothing validates what comes back from the model.

**Strategy: `direct`** — `ToolRegistry.execute` and `ToolRegistry.register` already exist as the real entry points. Calling them directly with invalid input exposes the absent validation behaviour today.

## Done when these pass

- [ ] **rejects missing required field: returns ToolResponse naming the field, executor not invoked** — `execute` with `{}` on a tool requiring `location` returns a ToolResponse whose `result` contains "location" and whose executor call count is 0
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects wrong type: message names the field path, does not contain the offending value** — `execute` with `{location: 42}` returns a ToolResponse whose `result` contains "location" but does not contain "42"
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at registration time for an uncompilable schema, message names the tool** — `register` with `{type: 'object', required: 'must-be-array'}` throws before any `execute` call, and the message names the tool
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **processMessage resolves and rejection text is visible to provider on the retry round** — a provider that sends an invalid tool call in round one receives the rejection text in its tool-result message in round two; `processMessage` resolves rather than throws
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies` (not devDependencies)
- [ ] In `ToolRegistry`, compile static schemas at `register` time; throw naming the tool on compile failure
- [ ] In `ToolRegistry.execute`, validate input against the resolved schema; return `ToolResponse` with error on failure without calling the executor
- [ ] Rejection messages name field path and expected type only — never the offending value
- [ ] Add spec citation links and ensure `npm run spec:names` passes
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `CHANGELOG.md`
- [ ] Ensure `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits 0

## Out of scope

- Validating tool output (only input is validated)
- The `Unknown tool: <name>` throw stays unchanged — intentional split from validation failure
- Per-tool authorization; retry/timeout/rate-limiting around tool execution
- Function-valued `ToolDefinitionSource` caching strategy (implementor chooses whether to cache by schema identity)
- Extra-property passthrough is a correctness constraint on the implementation: the existing test at `registry.acceptance.test.ts` does not cover it because the registry currently passes all input through (no validation at all), so a "passes extra properties" test would be green before implementation. The implementor must add a unit test for this in `registry.test.ts` during the green phase.