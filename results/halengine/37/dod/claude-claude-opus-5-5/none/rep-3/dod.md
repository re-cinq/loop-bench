# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register`/`execute` and `createChatOrchestrator(...).processMessage` are real entry points the tests call today with real tools and a scripted provider; they fail because the executor runs on input the schema rejects.

## Done when these pass

- [ ] **returns a rejection naming the missing required property and never runs the executor** — `execute('get_weather', {})` returns a `ToolResponse` naming `location` as required; executor call count 0
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **names the failing path and expected type but never the offending value, in the result or the logs** — a number for a string field is rejected naming `location` and `string`; neither the result nor any log line contains the number or the payload's email
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — `register` throws a message containing `broken_tool`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call, not a stale one** — a schema whose `required` changes between calls is checked against the current one
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **resolves, shows the rejection to the provider on the next round, and runs the corrected retry** — `processMessage` resolves, round 2 sees the rejection as the `tool_result`, executor runs once with the corrected input
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies`; compile a static schema in `register`, throwing with the tool name on failure
- [ ] Validate in `execute` before the executor; return `{result}` naming paths and failed constraints, never values
- [ ] Compile function-valued schemas per call, cached by the resolved schema object
- [ ] Keep `Unknown tool: <name>` throw unchanged; one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Round's own tests for the ticket's other criteria: extra property passed through unchanged exactly once, compile-once across ten calls, unknown-tool throw pinned — each cited from the spec
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `example/weather-tool.ts` comment, and `CHANGELOG.md`; PR body carries the migration note (MINOR bump)

## Out of scope

- Returning an unknown tool name to the model instead of throwing
- Validating tool output; hallucination detection; per-tool authorization; retry, timeout and rate limiting around tool execution
- Injecting `additionalProperties: false`, coercing types or applying defaults; any opt-out flag