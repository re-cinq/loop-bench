# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema`.

**Strategy: `direct`** — The seam already exists: `ToolRegistry.execute` in `src/orchestration/tools/registry.ts` is a public method the acceptance tests call directly. No production code exists for the validation, so all three tests fail because the executor is invoked on invalid input (or the rejection text is never generated).

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field and never calls the executor** — executor call count is 0 and result names the missing field when required property is absent
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **never includes the offending value in the returned ToolResponse** — the rejection result differs from executor output and does not contain the value that failed validation
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **resolves processMessage when a corrected call follows a rejected one, with rejection text visible to the provider** — full orchestrator loop resolves and the round-2 tool result contains the rejected field name
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` compilation to `ToolRegistry.register` for static schemas; compile once, store alongside the executor
- [ ] Add per-call compilation (cached by schema object identity) for function-valued `ToolDefinitionSource`
- [ ] In `execute`, validate `input` against the compiled validator before calling the executor; on failure return `{result: ajv error messages joined, naming paths and constraints}`
- [ ] Ensure error messages name field paths (e.g. `/location`) and constraint keywords but never property values
- [ ] Add `register` throw for uncompilable schema (naming the tool)
- [ ] Add one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Add tool-loop test to `chatOrchestrator.test.ts` as specified in the ticket
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `CHANGELOG.md`, and `.specify/spec.md`

## Out of scope

- Validating tool output
- Adding `additionalProperties: false` to schemas (explicitly excluded)
- Coercing types or injecting defaults
- Changing the `Unknown tool: <name>` throw to a return
- Per-tool authorization
- Retry, timeout, and rate limiting around tool execution