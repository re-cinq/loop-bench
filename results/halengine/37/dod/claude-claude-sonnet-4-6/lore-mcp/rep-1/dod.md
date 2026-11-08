# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.execute` is a callable entry point today. The tests call it with invalid input and assert on the returned value and executor call count; they fail because validation is absent.

## Done when these pass

- [ ] **returns a ToolResponse naming the missing required field without calling the executor** — `execute` called with an empty object against a tool requiring a `location` string returns a `ToolResponse` whose `result` mentions `location` and never invokes the executor
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects a wrong-typed field without exposing the submitted value** — `execute` called with a number for a required string field returns a `ToolResponse` naming the field path, and the returned text does not contain the submitted numeric value
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json`
- [ ] In `ToolRegistry.register`, compile the schema once for static definitions; cache compiled validators by schema object reference for function-valued sources
- [ ] In `ToolRegistry.execute`, validate `input` against the compiled schema before calling the executor; on failure return `{result: '<error naming the field path and constraint>'}` without invoking the executor
- [ ] Ensure the rejection message names the failing path and constraint but never the submitted value
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, and `CHANGELOG.md`

## Out of scope

- Validating tool output
- Changing the `Unknown tool: <name>` throw behaviour
- Per-tool authorization or opt-out flags
- Coercing types or injecting `additionalProperties: false`