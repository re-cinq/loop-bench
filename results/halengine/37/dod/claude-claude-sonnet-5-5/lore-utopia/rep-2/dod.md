# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are the real entry points and can be called today; the tests fail because no validation happens.

## Done when these pass

- [ ] **returns a rejection naming the missing property and never runs the executor** — `{}` for a tool requiring `location` returns a `ToolResponse` naming `location`; executor call count 0.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field by path and expected type without echoing its value** — number for a string field is rejected, message names `location` and `string`, not the value.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — broken schema fails at startup.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at that call** — no stale cache.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add ajv to dependencies; validate in `execute`, return rejection `ToolResponse`.
- [ ] Compile static schemas at `register`, naming the tool on failure.
- [ ] Per-call compile cached by schema object for function-valued sources.
- [ ] Orchestrator retry-loop test, passthrough/unknown-tool/log-redaction tests (already-true behaviours such as extra-property passthrough are guards for the implementing round, not red now).
- [ ] Docs, README, `.specify/spec.md`, CHANGELOG, one-line `execute` doc comment.

## Out of scope

- Unknown tool name still throws; tool output validation; authorization; retries and timeouts.