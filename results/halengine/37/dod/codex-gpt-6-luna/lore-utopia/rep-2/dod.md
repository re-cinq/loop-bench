# Definition of Done

> The registry currently pushes this check onto each tool's own executor, leaving every consumer to implement it itself — differently each time, or not at all.

**Strategy: `direct`** — `ToolRegistry.execute` is an existing callable seam, so the acceptance tests exercise the registry and the real orchestrator path directly.

## Done when these pass

- [ ] **rejects invalid input without exposing values and preserves valid input** — rejected required and wrong-typed fields return a useful tool result, do not call the executor, and do not expose the supplied value in logs or result text; valid extra properties arrive unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an invalid schema when registering its tool** — broken static schemas fail at registration with the tool name; unknown names retain their existing throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema at registration and reuses it for ten executions** — schema compilation happens at registration and is not repeated for each call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates function sourced tools against the current schema** — each function-valued definition's current schema controls validation.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejected call to the provider so it can correct the input next round** — the actual tool loop completes and exposes the rejection to the next provider round.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Return validation failures as `ToolResponse` values before invoking the executor.
- [ ] Preserve valid input, extra properties, and the unknown-tool exception behavior.
- [ ] Compile invalid static schemas at registration and resolve function-valued definitions per call.
- [ ] Reuse a static schema validator across repeated calls.
- [ ] Feed a validation rejection through the tool loop for a later model retry.

## Out of scope

- Tool output validation, authorization, retries beyond the existing tool-round limit, and edits to tool implementations or user-facing documentation.