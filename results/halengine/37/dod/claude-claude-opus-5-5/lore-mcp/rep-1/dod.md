# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register`/`execute` are the real entry points and `createChatOrchestrator(...).processMessage` drives the tool loop end to end; `setLogger` captures log lines without a double. Every test fails today because the executor runs on input the schema rejects.

## Done when these pass

- [ ] **rejects input missing a required field as a result naming it, without invoking the executor** — `execute('get_weather', {})` returns `{result}` naming `location` as required; executor call count 0
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **names the failing path and expected type but never a value, in the result or any log line** — a number where a string is required is rejected naming `location` and `string`; neither the offending value nor an identifying field's value appears in the result or any log line
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — `register` throws for `{type: 'strng'}` with the tool name in the message
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at that call, not a stale one** — a schema that changes between calls is validated as it is at each call
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a rejected tool call back to the model, which retries and the message resolves** — `processMessage` resolves, the provider sees the rejection text on the next round, and only the corrected call reaches the executor
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies`; validate in `execute` before the executor, returning `{result: <paths + constraint>}` on failure
- [ ] Build rejection text and log fields from error paths/keywords only (no `verbose`, no `data`), so no value leaks
- [ ] Compile static schemas in `register`, wrapping compile errors with the tool name
- [ ] Compile function-valued schemas per call, cached by resolved schema object (WeakMap)
- [ ] Round tests in a new `src/orchestration/tools/registry.test.ts`: extra properties pass through unchanged (`toEqual`, exactly once); static schema compiled once across ten calls; `Unknown tool: <name>` throw unchanged
- [ ] Round test in `chatOrchestrator.test.ts` for the reject-then-retry tool loop, as the ticket lists
- [ ] One-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `example/weather-tool.ts` cast/default, `CHANGELOG.md`; MINOR version bump; migration note in the PR body
- [ ] `npm run build && node --input-type=module -e "import('./dist/index.js')"` exits 0 (CI)

## Out of scope

- The `Unknown tool: <name>` throw (stays a throw; tracked separately)
- Validating tool output, hallucination detection, evaluation harness
- Per-tool authorization, retry/timeout/rate limiting around execution
- Injecting `additionalProperties: false`, type coercion, defaults, an opt-out flag