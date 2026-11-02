# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.execute` and `register` are already the entry points, and `createChatOrchestrator` already drives tool calls through `execute`, so every test calls real code today. Nothing validates input yet, so the executor runs on malformed input and the tests fail on that.

## Done when these pass

- [ ] **answers a call missing a required property with a rejection naming it, without running the executor** — a call with `{}` against a schema requiring `location` returns a `ToolResponse` naming `location` and `required`, and the executor runs zero times
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **names the property path and expected type for a wrong-typed value, and never echoes the value** — `{location: 4217}` is rejected with a result naming `location` and `string`, and the result does not contain `4217`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **fails registration of a tool whose inputSchema cannot be compiled, and the error names the tool** — `register` throws, and the message contains `broken_tool`
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **hands a rejected tool call back to the model so a corrected retry completes the turn** — through `processMessage`, a rejected call is followed by a corrected call, `processMessage` resolves with `done`, and the rejection text reaches the provider on the next round
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile each static tool schema once in `register`, with the compile error naming the tool
- [ ] Reject in `execute` before the executor runs, returning a `ToolResponse` with the failing property paths and constraints
- [ ] Re-resolve and compile a function-valued `ToolDefinitionSource` per call, cached by the resolved schema object
- [ ] Keep `Unknown tool: <name>` thrown and unchanged (already true today, guard it in the implementation round)
- [ ] Keep valid input with an unlisted extra property passed through to the executor unchanged, exactly once (already true today; not a red bar)
- [ ] Log lines carry property paths and constraints, never values
- [ ] Add the `ajv` dependency to `package.json` `dependencies`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, and `CHANGELOG.md`

## Out of scope

- Returning an unknown tool name to the model instead of throwing (tracked separately)
- Validating tool output
- Hallucination detection and an evaluation harness
- Per-tool authorization
- Retry, timeout, and rate limiting around tool execution
- Any concrete tool implementation
- Coercion, defaults, and `additionalProperties: false` injection; there is no opt-out flag