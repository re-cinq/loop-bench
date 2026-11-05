# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`

**Strategy: `direct`** — `ToolRegistry.execute` and `register` are the real entry points and can be called today; they simply never validate.

## Done when these pass

- [ ] **rejects input missing a required property without running the executor** — result names `location`, executor call count 0
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a wrong-typed field naming its path and expected type, never its value or in logs** — path and type named; no value in result or log lines
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input with an unlisted extra property to the executor unchanged, once** — no defaults, coercion or additionalProperties injection (green today; guards the fix)
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool**
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at that call**
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add `ajv` to `dependencies`; validate in `execute` and return a `ToolResponse` on rejection
- [ ] Compile static schemas in `register` (throw naming the tool); per-call cached compile for function sources
- [ ] Rejection text and logs name paths and constraints, never values
- [ ] Remaining ticket items: chatOrchestrator retry test, compile-once test, unknown-tool test, docs, README, .specify/spec.md, CHANGELOG, one-line doc comment on `execute`

## Out of scope

- Unknown tool name still throws; tool output validation; authorization; retry/timeout around tools