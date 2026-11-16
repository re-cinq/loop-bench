# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`.

**Strategy: `direct`** — `ToolRegistry.execute` exists at `src/orchestration/tools/registry.ts` and can be called directly in tests. The seam is the `execute` method itself: tests call it with valid and invalid input and assert on the returned `ToolResponse` and executor invocation count.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field and never calls the executor** — `execute` with `{}` on a tool requiring `location` returns a ToolResponse whose result mentions "location", and the executor call count is 0
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a wrong-typed field, naming the path and expected type, without the offending value** — `execute` with `{location: 42}` returns a ToolResponse whose result mentions "string", with executor count 0 and the offending value "42" absent from the result
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at register time for a schema that cannot be compiled, naming the tool** — `register` with `{required: 'must-be-an-array-not-a-string'}` throws synchronously with a message matching /broken/
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **resolves processMessage when a tool call is rejected, with the rejection text visible to the provider** — a scripted provider sends a tool_use with `{}` input; processMessage resolves to 'done' and the captured tool result strings include something matching /location/
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json`
- [ ] In `ToolRegistry.register`: compile static schemas via ajv at registration time; throw on compile error naming the tool
- [ ] In `ToolRegistry.execute`: validate input against the resolved schema before calling the executor; return a `ToolResponse` whose result names the failing constraint on failure
- [ ] Ensure rejection messages include field path and expected type but never the offending value
- [ ] Add a one-line doc comment to `execute` pointing at this spec
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, and `CHANGELOG.md`
- [ ] All four acceptance tests green

## Out of scope

- Validating tool output
- `additionalProperties: false` enforcement or type coercion
- An opt-out flag for validation
- Changing the `Unknown tool: <name>` throw for unregistered tools
- Per-tool authorization
- Retry, timeout, and rate limiting around tool execution