# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema`. A tool that receives unexpected input must fail
> in one predictable, known way before the rest of this epic's tool work can be built on top of it.

**Strategy: `direct`** — The seam is `ToolRegistry.execute` in `src/orchestration/tools/registry.ts`. Calling it today returns the executor's raw result regardless of whether the input is valid. The acceptance tests call it directly and assert on the returned `ToolResponse`.

## Done when these pass

- [ ] **missing required field returns a ToolResponse naming the field, never calls the executor** — `execute` with `{}` on a tool requiring `location` returns a ToolResponse whose result names `location` and the executor call count is 0
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **wrong-typed field is rejected with a message naming the field path without echoing its value** — `execute` with `{amount: 'secret-string'}` on a tool requiring a number for `amount` returns a rejection naming `amount` that contains no part of the secret string
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **register throws at registration time for an uncompilable schema, naming the tool** — passing a schema with an unresolvable `$ref` to `register` throws immediately and the message names the tool
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **a schema-rejected tool call is returned to the provider for correction without ending the conversation** — the orchestrator's `processMessage` resolves (not rejects) when the first tool call is schema-invalid and the second is valid, and the provider sees the rejection text in the second round
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json`
- [ ] In `ToolRegistry`, compile static schemas at `register` time; throw naming the tool if compilation fails
- [ ] In `ToolRegistry.execute`, validate `input` against the resolved schema; return a `ToolResponse` with the error description if validation fails (never throw, never call the executor)
- [ ] Rejection messages must name field paths and expected types; they must not include any property values
- [ ] Add a one-line doc comment to `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, and `CHANGELOG.md`
- [ ] All new tests in `src/orchestration/tools/registry.test.ts` (the full set the ticket lists) must cite spec statements

## Out of scope

- Validating tool output
- Changing the `Unknown tool: <name>` throw — that remains a throw, not a ToolResponse
- `additionalProperties: false`, type coercion, or defaults
- Per-tool authorization
- Retry, timeout, and rate limiting around tool execution