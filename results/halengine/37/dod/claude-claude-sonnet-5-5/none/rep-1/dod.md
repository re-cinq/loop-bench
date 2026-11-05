# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are the real entry points and can be called today; the tests fail because no validation happens.

## Done when these pass

- [ ] **rejects input missing a required property with a result naming it, and never runs the executor** — rejection is a returned `ToolResponse` naming `location`; executor count is 0.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input with an unlisted extra property to the executor unchanged, exactly once** — extras pass through untouched (and invalid input is rejected first).
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming its path and expected type, and leaks its value nowhere** — neither result nor log lines contain the value.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool**
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at that call**
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add ajv to `dependencies`; validate in `execute` before the executor, returning a `ToolResponse`
- [ ] Compile static schemas in `register` (throw naming the tool); per-call cache for function sources
- [ ] Docs, README, `.specify/spec.md`, CHANGELOG; one-line doc comment on `execute`
- [ ] Tests listed in the ticket but not pinned here (compile-once, orchestrator retry loop, `Unknown tool` throw) are written by the implementing round

## Out of scope

- The `Unknown tool: <name>` throw, output validation, authorization, retry/timeout/rate limiting