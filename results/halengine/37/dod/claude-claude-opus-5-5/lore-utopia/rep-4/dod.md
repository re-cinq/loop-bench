# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` and `ToolRegistry.register` are the seam: the tests call them on a real registry with real schemas, and drive the real `createChatOrchestrator` tool loop with a scripted provider. No production code exists yet; every test is red because the executor runs on input the schema rejects.

## Done when these pass

- [ ] **returns a rejection naming the missing required property and never runs the executor** — `execute('get_weather', {})` returns a `ToolResponse` naming `location` as required; executor call count is 0
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field by path and expected type without echoing any input value to the result or the log** — the result names `age` and `integer`; no returned text or log line contains a value from the rejected input; executor not invoked
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable inputSchema, naming the tool** — `register` throws for `{type: 'strin'}` with a message naming `broken_tool`
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds the rejection back to the provider and resolves after a corrected retry** — `processMessage` resolves, the provider's next round sees the rejection text, and the executor only ever receives the corrected `{location: 'Berlin'}`
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies`; validate in `execute` and return `{result: <what was wrong>}` for a missing required property
- [ ] Name property path and expected type for type/enum failures; never put an input value in a message or a log line
- [ ] Compile static schemas once in `register`, throwing with the tool name; compile function-valued sources per call, cached by the resolved schema object
- [ ] Round-owned tests in `src/orchestration/tools/registry.test.ts` and `chatOrchestrator.test.ts`: extra properties pass through unchanged (`toEqual`), per-call schema for function-valued sources, compiled once across ten calls, `Unknown tool: <name>` still throws — each cited in `specs/hal-engine-tool-input-validation/spec.md`
- [ ] One-line doc comment on `execute` pointing at the spec
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md` and `CHANGELOG.md`; MINOR bump and migration note in the PR body
- [ ] Re-check the spec's `Status` row against its citations once the round's tests are cited

## Out of scope

- Changing the `Unknown tool: <name>` throw into a returned result
- Validating tool output; hallucination detection; per-tool authorization; retry, timeout or rate limiting of tool execution
- Injecting `additionalProperties: false`, coercing types, applying defaults, or an opt-out flag