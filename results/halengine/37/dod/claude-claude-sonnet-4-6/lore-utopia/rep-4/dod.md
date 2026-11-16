# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`.

**Strategy: `direct`** — `ToolRegistry.execute` already exists and is importable; the acceptance tests call it directly and assert on the absence of validation behaviour that is not yet implemented.

## Done when these pass

- [ ] **returns ToolResponse naming the missing required field, executor not called** — `execute` returns a `ToolResponse` naming the missing field and the executor is never called when input omits a required field
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a wrong-typed field naming its path and type without exposing the offending value in result or logs** — the rejection message names the field path and expected type but contains neither the offending value nor any other property value from the input
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at registration time for an uncompilable schema, naming the tool** — `register` compiles the schema at registration time and throws immediately for a bad schema, with a message naming the tool
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates against the current schema per execute call for function-valued definitions** — a function-valued `ToolDefinitionSource` is validated against the schema it returns at the time of each call, not a stale cached one
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **resolves processMessage when a tool call fails validation and the rejection text reaches the provider on retry** — schema-rejected tool calls produce a `ToolResponse` that resolves the promise and is visible to the provider on the next round
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies`
- [ ] Compile static schemas in `ToolRegistry.register`; throw for uncompilable schemas
- [ ] Validate `input` against compiled/resolved schema in `ToolRegistry.execute` before calling executor
- [ ] Return `ToolResponse` (not throw) on validation failure; redact all property values from the message
- [ ] Cache compiled schemas for function-valued definitions by resolved schema object identity
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, and `CHANGELOG.md`
- [ ] Add one-line `execute` doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`

## Out of scope

- Validating tool *output*
- Changing the `Unknown tool: <name>` throw to a returned `ToolResponse`
- Per-tool authorization or `beforeToolCall` hooks
- Retry, timeout, and rate limiting around tool execution
- Any actual tool implementation written against this contract