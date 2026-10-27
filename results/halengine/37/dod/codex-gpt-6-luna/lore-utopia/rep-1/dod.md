# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is the real registry entry point, so acceptance tests can observe rejection, executor calls, and input pass-through without doubles.

## Done when these pass

- [ ] **Rejects invalid input before invoking the executor** — invalid input returns a useful, non-sensitive rejection and the executor is not called.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Passes valid input through unchanged** — valid extra keys arrive unchanged and the executor runs exactly once.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Validates each resolved function schema** — changing the function-valued definition changes the schema used by the next call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Preserves unknown tool errors** — an unregistered name retains its existing throw behavior.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Return a `ToolResponse` for schema rejection before executor invocation.
- [ ] Preserve valid input exactly, including extra properties.
- [ ] Resolve function-valued schemas for each call.
- [ ] Keep unknown-tool failures unchanged.

## Out of scope

- Orchestrator retry behavior, docs, dependency/build requirements, schema compile caching, and release notes are tracked by the ticket but are not pinned by these registry acceptance tests.