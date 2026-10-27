# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is the existing entry point, so acceptance tests can call it directly with real schemas and executors. The orchestrator retry case uses the same registry through `processMessage`.

## Done when these pass

- [ ] **Registry validates schema inputs** — missing and wrong-typed values return a useful result without calling the executor; valid extra keys pass through unchanged; function definitions use the schema resolved for that call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Rejected tool call can be corrected** — the orchestrator resolves after the provider receives the rejection and retries with valid input.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Return path-specific schema errors without exposing rejected values or calling the executor.
- [ ] Preserve valid input exactly, including additional properties.
- [ ] Resolve function-valued definitions for each call and validate against the current schema.
- [ ] Feed a rejection back to the model so a corrected call can complete the conversation.

## Out of scope

- Unknown tool handling, tool output validation, authorization, retries beyond the existing tool-round bound, and tool-specific schema work.