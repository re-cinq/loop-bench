# Definition of Done

> The registry currently pushes this check onto each tool's own executor, leaving every consumer to implement it itself — differently each time, or not at all.

**Strategy: `direct`** — `ToolRegistry.execute` is the real entry point and accepts a registered definition and executor, so the test exercises validation and executor suppression without doubles.

## Done when these pass

- [ ] **Reject missing required input** — a missing required `location` returns a validation message and never invokes the registered executor.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Validate the input against the resolved definition's schema before executor invocation.
- [ ] Return a readable `ToolResponse` for rejected input.

## Out of scope

- Tool output validation, authorization, retries, timeouts, and rate limiting.