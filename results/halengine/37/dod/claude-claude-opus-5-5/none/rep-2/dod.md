# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register`/`execute` and `createChatOrchestrator(...).processMessage` are real entry points that the tests call today; they fail because no validation happens.

## Done when these pass

- [ ] **rejects input missing a required property with a result naming it, without invoking the executor** — `execute('get_weather', {})` returns a `ToolResponse` naming `location` as required; executor call count is 0
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed property naming its path and expected type, never its value in result or logs** — a number for a required string is rejected naming `location` and `string`; neither the result nor any log line contains the value
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — `register` throws with the tool name in the message
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds the rejection to the provider, runs the corrected retry, and resolves processMessage** — rejection text reaches the provider on the next round, the executor runs only for the corrected call, and `processMessage` resolves
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies`; compile static schemas in `register`, throwing with the tool name on failure
- [ ] Validate in `execute` before the executor; return `{result}` describing paths and failed constraints, never values; log paths only
- [ ] Function-valued definitions: compile per call, cached by the resolved schema object (own test in `registry.test.ts`)
- [ ] Ticket's own unit tests: new `registry.test.ts` (extra props pass through unchanged via `toEqual`, compile-once across ten calls, stale-schema, `Unknown tool:` throw unchanged) and the tool-loop test in `chatOrchestrator.test.ts`; cite each in `specs/hal-engine-tool-input-validation/spec.md`
- [ ] One-line doc comment on `execute` pointing at the spec
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `example/weather-tool.ts` comment; `CHANGELOG.md` entry; MINOR bump and migration note in PR body
- [ ] `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits 0

## Out of scope

- Changing the `Unknown tool: <name>` throw
- Validating tool output; hallucination detection; per-tool authorization
- Retry, timeout or rate limiting around tool execution
- `additionalProperties: false` injection, type coercion, defaults, an opt-out flag