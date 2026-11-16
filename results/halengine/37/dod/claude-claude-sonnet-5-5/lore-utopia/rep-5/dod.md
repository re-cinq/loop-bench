# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are the real entry points and can be called today; the tests fail because no validation exists.

## Done when these pass

- [ ] **rejects input missing a required property without running the executor** — `{}` for a required `location` returns a ToolResponse naming `location`; executor count 0.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **names the path and expected type of a wrong-typed field but never its value** — rejection names path and type; neither result nor any log line holds the value.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time naming the tool when its schema cannot compile** — startup failure names the tool.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — no stale cached schema.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add ajv to dependencies; compile static schemas in register; validate in execute and return a ToolResponse on failure
- [ ] Per-call compile cached by schema object for function-valued sources
- [ ] Spec, README, docs/adding-a-tool.md, .specify/spec.md, CHANGELOG, one-line doc comment on execute
- [ ] Round-owned tests: compile-once (needs a seam), extra-property passthrough and Unknown tool throw (already pass today), chatOrchestrator retry loop

## Out of scope

- Unknown tool name handling, output validation, authorization, retry/timeout/rate limiting