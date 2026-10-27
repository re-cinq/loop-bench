# Definition of Done

> The registry currently pushes this check onto each tool's own executor, leaving every consumer to implement it itself — differently each time, or not at all.

**Strategy: `direct`** — `ToolRegistry.execute` is an existing callable seam. The acceptance test registers a real definition and observes the executor boundary directly.

## Done when these pass

- [ ] **Required input is rejected before execution** — invalid input returns a descriptive result and the executor is not called.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Return a validation result for input missing a required field before invoking the executor.

## Out of scope

- Additional validation constraints, schema compilation timing, retry-loop behavior, documentation, and packaging changes.