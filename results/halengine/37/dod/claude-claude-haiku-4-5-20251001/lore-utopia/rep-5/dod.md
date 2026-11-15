# Definition of Done

> Validate `input` against the resolved tool definition's `inputSchema` inside `ToolRegistry.execute`, before the executor runs, using a JSON Schema validator (`ajv` unless the build proves otherwise) added to `dependencies`.

**Strategy: `direct`** — The `ToolRegistry.execute` method exists and is the seam where validation should be added. Acceptance tests call this method directly with valid and invalid inputs, asserting that invalid inputs are rejected with a `ToolResponse` describing the failure, and that the executor is never invoked. The chatOrchestrator test verifies the tool-loop behavior when validation rejects a call.

## Done when these pass

- [ ] **Rejects input missing a required field** — Invalid input with a missing required field returns a `ToolResponse` with an error describing the failure, and the executor is never invoked.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Passes extra properties through unchanged** — Valid input with undeclared extra properties is passed to the executor unchanged (not coerced or augmented).
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Rejects wrong-typed fields** — Input with a field of the wrong type is rejected with a message naming the field path and expected type, without including the offending value.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Throws on uncompilable schema at register time** — A tool with an invalid schema throws during `register()`, with the tool name in the error message.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Validates function-valued schemas per call** — When a tool definition is a function that returns different schemas, validation uses the current schema at call time, not a cached one.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Validates static schemas consistently** — A static tool schema validates input correctly across multiple calls, rejecting invalid input consistently.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Rejects enum constraint violations** — Input with a value outside an enum constraint is rejected, with the field name in the message but not the offending value.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Throws for unknown tool** — An unregistered tool name throws `Unknown tool: <name>`, unchanged from current behavior.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Redacts identifying data from error messages** — When validation rejects input with identifying data (e.g., an email address), the rejection message includes the field name but not the value.
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **Returns rejection as ToolResponse to the model** — In the orchestrator's tool loop, when a tool call is rejected by validation, the rejection is returned as a `ToolResponse` (not thrown), allowing the model to retry within the `DEFAULT_MAX_TOOL_ROUNDS` budget.
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Add `ajv` to `package.json` `dependencies`
- [ ] In `ToolRegistry.register()`, compile static tool schemas at registration time, throwing if invalid
- [ ] In `ToolRegistry.execute()`, validate input against the resolved schema, returning a `ToolResponse` on failure with a redacted error message
- [ ] For function-valued schemas, resolve and compile per call, caching by the schema object identity
- [ ] Verify rejection messages name field paths and constraints, never values
- [ ] Add one-line doc comment to `execute` pointing to the spec (once written)

## Out of scope

- Changing the `Unknown tool: <name>` throw to a returned rejection (tracked separately)
- Validating tool output or hallucination detection
- Type coercion, default injection, or `additionalProperties: false` enforcement
- Per-tool authorization
- Retry, timeout, or rate limiting logic