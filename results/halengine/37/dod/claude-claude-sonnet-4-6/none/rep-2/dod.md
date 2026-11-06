# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.execute` and `ToolRegistry.register` are both public methods callable in tests today; the seam exists and no parallel-change scaffolding is needed.

## Done when these pass

- [ ] **rejects a call missing a required field and never invokes the executor** — registers a tool requiring a `location` string, calls `execute` with `{}`, and asserts the returned result mentions `location` and the executor call count is `0`
  `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **a schema-invalid tool call does not throw so the model receives the rejection text and can retry** — drives the full orchestrator through one invalid tool call followed by a corrected second round; asserts `processMessage` resolves and that the rejection text naming `location` is visible in the round-2 messages the provider receives
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies` (it is already a transitive dep; promote it to direct)
- [ ] In `ToolRegistry`, compile a static tool's schema once at `register` time using `ajv.compile`; store the compiled validate function alongside the executor
- [ ] In `execute`, run the compiled validate function against `input` before calling the executor; if it fails, return a `ToolResponse` whose `result` names the failing property paths and the constraint — never the offending value
- [ ] Add a one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, and `CHANGELOG.md` to match

## Out of scope

- `Unknown tool: <name>` throw stays unchanged
- Validation of tool output
- `additionalProperties: false` injection, type coercion, or defaults
- Per-tool opt-out flag
- Per-tool authorisation
- Retry, timeout, and rate limiting
- Any actual tool implementation