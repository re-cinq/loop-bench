# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register`/`execute` is the real seam and is directly callable; the tool loop is reachable through `createChatOrchestrator(...).processMessage` with a scripted provider. No double is needed.

## Done when these pass

- [ ] **returns a rejection naming the missing required property and never calls the executor** — `execute('get_weather', {})` returns a `ToolResponse` naming `location`; executor call count is 0
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field by path and expected type without echoing any input value into the result or logs** — a number where a string is required is rejected naming `location` and `string`; neither the result nor any log line contains the input values
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — `register` compiles a static schema and throws with the tool name
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **resolves after a rejected call and a corrected retry, showing the rejection to the provider and passing the retry through unchanged** — the rejection is a tool result on the next round, the retry (with an extra property) reaches the executor exactly once, `toEqual` its input, and `processMessage` resolves
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies`
- [ ] Compile a static schema in `register`, throwing with the tool name on failure
- [ ] Validate in `execute` before the executor; return `{result}` naming path and constraint, never values; log the same
- [ ] Function-valued `ToolDefinitionSource`: resolve and compile per call, cached by resolved schema object
- [ ] Round's own `src/orchestration/tools/registry.test.ts`: compile-once across ten calls, function-valued schema freshness, `Unknown tool: <name>` still thrown; tool-loop test in `chatOrchestrator.test.ts`; cite each in `specs/hal-engine-tool-input-validation/spec.md`
- [ ] One-line doc comment on `execute` pointing at the spec
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `example/weather-tool.ts` defensive cast, and `CHANGELOG.md`; MINOR bump; migration note in PR body

## Out of scope

- Returning an unknown tool name to the model instead of throwing (separate issue)
- Validating tool output, hallucination detection, evaluation harness
- Per-tool authorization, retry/timeout/rate limiting around tool execution
- Injecting `additionalProperties: false`, type coercion, defaults, or an opt-out flag