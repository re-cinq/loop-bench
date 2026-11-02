# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`.

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are real entry points that exist today, so the tests call them directly and fail on the missing validation.

## Done when these pass

- [ ] **rejects a call missing a required property and never runs the executor** — a call with `{}` against a tool requiring `location` returns a result naming `location` as required, and the executor is called zero times
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field with its path and expected type, never the offending value** — `{location: 4242}` is rejected with a result naming `location` and `string`, and the result does not contain `4242`
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **refuses a schema that cannot be compiled at register time, naming the tool** — `register` throws with a message containing the tool name for `inputSchema: {type: 'strng'}`
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` and compile static schemas in `register`
- [ ] Validate `input` in `execute` before the executor runs and return a `ToolResponse` on rejection
- [ ] Pin that an unknown tool name still throws `Unknown tool: <name>`
- [ ] Add a test that a function-valued definition is validated against the schema current at each call (not a stale cache)
- [ ] Add a test that a static schema is compiled once across ten `execute` calls
- [ ] Add a test that valid input with an unlisted extra property reaches the executor unchanged, exactly once
- [ ] Add a chat-orchestrator tool-loop test: rejected call, corrected retry, `processMessage` resolves
- [ ] Log lines and rejection text name property paths and constraints, never values
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, and `CHANGELOG.md`

## Out of scope

- Validating tool output
- Coercing types, applying defaults, or injecting `additionalProperties: false`
- An opt-out flag for validation
- Changing the `Unknown tool` throw
- Per-tool authorization