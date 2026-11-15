# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register`/`execute` are the seam: the tests call them with real schemas and a counting executor, and drive the tool loop through `createChatOrchestrator` with a scripted provider. Today every malformed call reaches the executor, and `register` accepts an uncompilable schema without complaint.

## Done when these pass

- [ ] **returns a result naming the missing required property and never invokes the executor** — `execute('get_weather', {})` returns a result naming `location` as required; executor call count is 0
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field by path and expected type without echoing any input value to the result or the log** — a number for `location` is rejected naming `location` and `string`; neither that value nor an identifying `contact_email` value appears in the result or any log line
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time, naming the tool, when the static schema cannot be compiled** — `register` throws a message containing `broken_tool` for `{type: 'strng'}`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at that call, not a stale one** — after the source's schema switches from requiring `city` to requiring `postcode`, `{city}` is rejected naming `postcode`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **resolves processMessage and shows the rejection to the provider on the next round, which then retries** — a rejected call followed by a corrected retry: `processMessage` resolves, round two's messages carry the rejection text, and the executor sees only the corrected input
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies`; compile a static schema in `register`, throwing with the tool name on failure
- [ ] Validate in `execute` before the executor; return `{result: <paths + failed constraint>}` built from ajv errors without `data`/values (no `allErrors` value echo, no `useDefaults`, no `coerceTypes`, no injected `additionalProperties: false`)
- [ ] Function-valued sources: resolve and compile per call, cached by the resolved schema object (WeakMap)
- [ ] Round tests the ticket lists that are guards, green today, still owed: extra property passed through unchanged exactly once (`toEqual`); static schema compiled once across ten `execute` calls; `Unknown tool: <name>` still thrown; a tool-loop test in `chatOrchestrator.test.ts`; a `registry.test.ts`. Each cites its statement in `specs/hal-engine-tool-input-validation/spec.md`
- [ ] One-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `example/weather-tool.ts` comment, `CHANGELOG.md`; MINOR version bump; migration note in the PR body
- [ ] Re-evaluate the spec `Status` row once every statement cites a test

## Out of scope

- The `Unknown tool: <name>` throw stays a throw (tracked separately)
- Validating tool output; hallucination detection; per-tool authorization
- Retry, timeout and rate limiting around tool execution; any concrete tool implementation