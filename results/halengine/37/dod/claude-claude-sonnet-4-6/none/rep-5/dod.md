# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`.

**Strategy: `direct`** — The seam already exists: `ToolRegistry.execute` and `register` are public methods that can be called directly in tests. All four acceptance tests exercise the real entry point and assert on the returned value or thrown error.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing field and never calls the executor when a required property is absent** — validation rejects missing required property; executor call count stays zero
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **returns a ToolResponse when a field has the wrong type and the returned text does not contain the rejected value** — wrong-type rejection names the field, never echoes the value
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **throws at registration time for a schema that cannot be compiled and the error names the tool** — broken schema detected at register time, not mid-conversation
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **a rejected tool call is returned to the provider rather than thrown, so processMessage resolves** — end-to-end: rejection becomes a readable tool result, model retries, processMessage resolves
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json`
- [ ] In `register`, call `ajv.compile(schema)` for static definitions; throw on compile error naming the tool
- [ ] In `execute`, validate `input` against the compiled (or freshly compiled) schema; return `ToolResponse` with error on failure
- [ ] Rejection message includes the property path and constraint, never the property value
- [ ] Add `src/orchestration/tools/registry.test.ts` with the unit tests named in the ticket's acceptance criteria
- [ ] Add tool-loop unit test to `chatOrchestrator.test.ts` (rejected call + corrected retry)
- [ ] Update `.specify/spec.md`, `README.md`, `docs/adding-a-tool.md`, and `CHANGELOG.md`
- [ ] Add one-line doc comment to `execute` pointing at the spec

## Out of scope

- Validating tool output
- Changing the `Unknown tool: <name>` throw to a returned response
- Per-tool authorization
- Retry, timeout, and rate limiting around tool execution
- Any actual tool implementation