# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` and `register` are the real entry points and `createChatOrchestrator` drives the tool loop through them, so the acceptance tests call them today and fail on behaviour: the executor runs on any input and no rejection comes back. Logs are observed through the existing `setLogger` seam, not a spy.

## Done when these pass

- [ ] **returns a missing required property to the caller as a ToolResponse and never runs the executor** — `execute('get_weather', {})` resolves to a result naming `location` as required; executor call count 0
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **names the path and expected type of a wrong-typed property without echoing any input value** — a number for a string `location` is rejected naming `location` and `string`; neither the result nor any log line carries `90210` or the `email` value
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time, naming the tool, for a schema that cannot compile** — `register` with `{type: 'strng'}` throws mentioning `broken_tool`
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema it returns at that call, not a cached one** — after the source's `required` changes, the next call is held to the new schema
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **lets the model read a rejection and retry within the tool loop, passing the corrected input through unchanged** — `processMessage` resolves, the round-2 provider request carries the rejection text, and the executor sees only the corrected input (extra `units` key intact), once
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies`; validate in `execute` before the executor and return `{result: <paths + failed constraint>}` on failure, never a value
- [ ] Compile static schemas in `register` (throw naming the tool); per-call compile for function-valued sources, cached by resolved schema object
- [ ] Round's own tests in a new `src/orchestration/tools/registry.test.ts` (compile-once over ten calls, `Unknown tool:` throw unchanged) and the tool-loop retry in `chatOrchestrator.test.ts`; cite the two uncited statements in `specs/hal-engine-tool-input-validation/spec.md`
- [ ] One-line doc comment on `execute` pointing at the spec
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `example/weather-tool.ts` cast comment, and `CHANGELOG.md`; MINOR version bump and migration note in the PR body
- [ ] Spec `Status` moves to `Shipped` once every statement is cited

## Out of scope

- The `Unknown tool: <name>` throw (tracked separately as returning it to the model)
- Validating tool output; hallucination detection; per-tool authorization; retry, timeout and rate limiting around tool execution
- Injecting `additionalProperties: false`, type coercion or defaults