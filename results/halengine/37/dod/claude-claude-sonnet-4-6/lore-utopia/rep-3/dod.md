# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.execute` is a public method that can be called directly in a test; the seam already exists. The two acceptance tests call it through the real entry points (`ToolRegistry.execute` and `createChatOrchestrator`) without stubs.

## Done when these pass

- [ ] **skips the executor and names the missing required field in its rejection** — `execute` with a missing required field returns a `ToolResponse` naming that field and never calls the executor
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **resolves and makes the rejection text visible to the provider before the caller retries** — `processMessage` resolves when a tool call is rejected by validation, and the rejection text is in the `ToolResultMessage` the provider receives on the next round
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json` and install it
- [ ] Compile each static tool's schema once inside `register`; throw naming the tool for an uncompilable schema
- [ ] Validate `input` against the compiled schema inside `execute` before calling the executor
- [ ] Return a `ToolResponse` on failure (never throw); include the failing field path and constraint in `result`, never the field's value
- [ ] Cache compiled schemas for function-valued `ToolDefinitionSource` per resolved schema object
- [ ] Add `execute` one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, and `CHANGELOG.md`
- [ ] Ensure `npm run build` and smoke tests pass

## Out of scope

- Validating tool *output* (only input is validated)
- Changing the `Unknown tool: <name>` throw for unregistered tools
- Per-tool authorization or any `beforeToolCall` hook
- Coercing types, injecting `additionalProperties: false`, or applying schema defaults
- An opt-out flag for validation