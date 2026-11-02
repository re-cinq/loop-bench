# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` in `src/orchestration/tools/registry.ts` is a real entry point that already takes a tool name and input, so the tests call it directly. The seam exists; the validation step does not.

## Done when these pass

- [ ] **rejects input missing a required property without invoking the executor** — a tool requiring `location` called with `{}` returns a `ToolResponse` naming `location` as required, and the executor is called zero times
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed property naming its path and expected type, never echoing the value** — `location: 4217` is rejected with a result naming `location` and `string`, without the value `4217`, and the executor is called zero times
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Validate `input` with `ajv` (already in `node_modules`; add it to `dependencies`) inside `ToolRegistry.execute` before the executor runs, returning a `ToolResponse` on rejection
- [ ] Compile a static tool's schema once at `register`, so a broken schema throws at startup naming the tool
- [ ] Compile a function-valued `ToolDefinitionSource` per call, cached by the resolved schema object
- [ ] Redact: rejection text and log lines carry property paths and constraints, never values
- [ ] Keep `Unknown tool: <name>` thrown, pinned by a test
- [ ] Document the contract: one-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`; statements for extra-property passthrough, retry bound, and rejection-as-result still need spec lines and tests
- [ ] Tool-loop test in `chatOrchestrator.test.ts` (rejected call, corrected retry, `processMessage` resolves)
- [ ] Update `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, and `CHANGELOG.md`

## Out of scope

- Validating tool output
- Coercion, defaults, or `additionalProperties: false` injection; no opt-out flag
- Per-tool authorization
- Retry, timeout, or rate limiting around tool execution
- Changing the `Unknown tool` throw to a returned result (tracked separately)
- Any concrete tool implementation