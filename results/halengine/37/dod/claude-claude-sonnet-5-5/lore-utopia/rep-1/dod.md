# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are real entry points that can be called today with real schemas and executors; the tests fail on missing validation behaviour.

## Done when these pass

- [ ] **rejects input missing a required property without running the executor** — result names `location`, executor call count 0.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming its path and expected type, never its value** — no value in result or log lines.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool**
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at that call**
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add ajv to dependencies; validate in `execute`, return a `ToolResponse` on rejection
- [ ] Compile static schemas at `register`; per-call cache for function-valued definitions
- [ ] Round adds: extra-property passthrough, compile-once, unknown-tool throw, chatOrchestrator retry-loop tests (not red today or not observable without a double)
- [ ] Docs, README, `.specify/spec.md`, CHANGELOG, one-line `execute` comment

## Out of scope

- Unknown tool throw, output validation, authorization, retries