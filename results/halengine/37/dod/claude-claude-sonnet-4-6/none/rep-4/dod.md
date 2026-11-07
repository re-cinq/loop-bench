# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.execute` is a public method that can be called directly in a test; no seam needs building.

## Done when these pass

- [ ] **rejects a wrong-typed input without echoing its value and without calling the executor** — asserts `callCount: 0` (executor not invoked) and `mentionsField: true` (result names the failing path) and `echoesValue: false` (result does not echo the input value)
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` in `package.json`
- [ ] In `ToolRegistry.register`, compile the schema once for static definitions; cache compiled validators for function-valued sources
- [ ] In `ToolRegistry.execute`, validate `input` against the resolved schema before calling the executor; on failure return a `ToolResponse` whose `result` describes the error (field path + constraint, no value)
- [ ] Ensure log lines on the rejection path name field paths and constraints, not values
- [ ] Add `registry.test.ts` with the full set of unit tests the ticket lists (missing-required, wrong-type, extra-properties pass-through, compile-once, function-valued source, unknown-tool throw, tool-loop integration in `chatOrchestrator.test.ts`)
- [ ] Add spec citations to all new tests per `re-lint/require-spec-link`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `CHANGELOG.md` as the ticket requires

## Out of scope

- Validating tool output
- Per-tool authorization or `beforeToolCall` veto hooks
- Changing the `Unknown tool: <name>` throw to a returned `ToolResponse`
- Retry, timeout, or rate-limiting around tool execution