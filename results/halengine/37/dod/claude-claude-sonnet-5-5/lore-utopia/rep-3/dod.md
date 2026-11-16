# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are the real entry points and are callable today; the tests fail because no validation happens, and need no double.

## Done when these pass

- [ ] **returns a rejection naming the missing required field and never runs the executor** — `execute('weather', {})` returns a `ToolResponse` naming `location`; executor call count is 0.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming its path and expected type, without echoing the value** — message names `location` and `string`, omits the offending value, executor not called.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — `register` throws with the tool name.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at each call** — no stale cached schema.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add ajv to `dependencies`; compile static schemas in `register`, throwing with the tool name
- [ ] Validate in `execute` and return a path/constraint-only rejection `ToolResponse` (no values)
- [ ] Resolve and cache by schema object for function-valued definitions
- [ ] Spec at `specs/hal-engine-tool-input-validation/spec.md` is cited by the tests; later rounds add the ticket's remaining unit tests (pass-through, compile-once, unknown tool, orchestrator retry loop, log redaction) in `registry.test.ts` and `chatOrchestrator.test.ts`
- [ ] Update docs/adding-a-tool.md, README.md, .specify/spec.md, CHANGELOG.md

## Out of scope

- Unknown tool name still throws; validating tool output; per-tool authorization; retry/timeout/rate limiting.
- Pass-through of extra properties already works today, so it is a regression guard for the round rather than an acceptance test.