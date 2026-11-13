# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` and `register` are the real entry points and `createChatOrchestrator` drives the tool loop through them; `setLogger` is an existing seam for observing log lines. Every test calls these today and fails on behaviour: the executor runs on invalid input, `register` accepts an uncompilable schema, and the model never sees a rejection.

## Done when these pass

- [ ] **returns a rejection naming the missing required property and never runs the executor** — `execute('get_weather', {})` returns a `ToolResponse` naming `location` as required; executor call count is 0
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field by path and expected type without echoing the value in the result or the logs** — a number where a string is required is rejected naming `location` and `string`; neither the result nor any log line contains the value
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — `register` throws, message names `broken_tool`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **resolves processMessage after a rejected call and a corrected retry, showing the provider the rejection** — the rejection reaches the provider as the next round's tool result and `processMessage` resolves with the final text
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies`; compile a static schema in `register`, wrapping compile errors with the tool name
- [ ] Validate in `execute` before the executor; return `{result}` built from error `instancePath` + `keyword`/`params` only (never `data`), log the same, executor not called
- [ ] Function-valued definitions: resolve and compile per call, cached by resolved schema object (WeakMap)
- [ ] Round's own tests in a new `src/orchestration/tools/registry.test.ts`: extra property passes through unchanged exactly once (`toEqual`), function-valued schema change is honoured, static schema compiled once across ten calls, `Unknown tool: <name>` still throws; plus the tool-loop test in `chatOrchestrator.test.ts` the ticket asks for
- [ ] Cite those tests on the uncited statements in `specs/hal-engine-tool-input-validation/spec.md`, then set its Status by coverage; run `node scripts/repoint-spec-anchors.mjs`
- [ ] One-line doc comment on `execute` pointing at the spec
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `example/weather-tool.ts` (drop the defensive cast/default comment); `CHANGELOG.md` entry; MINOR version bump; migration note in the PR body
- [ ] `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits 0 (CI)

## Out of scope

- Changing the `Unknown tool: <name>` throw (tracked separately)
- Validating tool output; hallucination detection; evaluation harness
- Per-tool authorization, retry, timeout and rate limiting around tool execution
- Injecting `additionalProperties: false`, type coercion, defaults, or an opt-out flag