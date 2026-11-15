# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is the seam: the tests register a real tool with a real schema and call `execute` (and `createChatOrchestrator(...).processMessage` for the end-to-end loop) directly; today they fail because the executor runs on input the schema rejects.

## Done when these pass

- [ ] **returns a rejection naming the missing required property and never invokes the executor** — `execute('get_weather', {})` returns a `ToolResponse` naming `location` as required; executor call count 0
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field by path and expected type without echoing its value in the result or any log line** — a number where a string is declared is rejected naming the path and `string`; the value appears in neither the result nor any log line; executor not invoked
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **resolves after a rejected call and a corrected retry, with the rejection visible to the provider** — the rejection is a tool result fed back to the provider, the retry runs the executor once with the corrected input, and `processMessage` resolves
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies`; validate in `execute` against the resolved `inputSchema`, return `{result: <what was wrong>}` for a missing `required` property
- [ ] Rejection text and log lines name the path and the failed constraint (expected type, enum), never the value
- [ ] Compile a static schema once at `register`; `register` throws naming the tool for an uncompilable schema (round test in `registry.test.ts`)
- [ ] Function-valued definitions resolve and compile per call, cached by schema object (round test: changed schema between calls is honoured; static schema compiled once across ten calls)
- [ ] Pin: extra properties pass through unchanged (`toEqual`, exactly once); `Unknown tool: <name>` throw unchanged
- [ ] One-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`; cite each new round test from the spec
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `example/weather-tool.ts` comment, and `CHANGELOG.md` (MINOR); PR body carries the migration note

## Out of scope

- Returning an unknown tool name to the model instead of throwing (separate ticket)
- Validating tool output; hallucination detection; evaluation harness
- Per-tool authorization, `beforeToolCall` veto hook
- Retry, timeout and rate limiting around tool execution
- Injecting `additionalProperties: false`, type coercion, defaults, or an opt-out flag