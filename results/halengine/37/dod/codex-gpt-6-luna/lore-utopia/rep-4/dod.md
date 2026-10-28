# Definition of Done

> The registry currently pushes this check onto each tool's own executor, leaving every consumer to implement it itself — differently each time, or not at all.

**Strategy: `direct`** — `ToolRegistry.execute` is the existing public seam, so the test calls it with a real registered schema and observes whether malformed input reaches the executor.

## Done when these pass

- [ ] **Rejects missing required input before invoking the executor** — a required `location` omitted from input produces a validation result without running the tool.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Return a validation `ToolResponse` for input that fails the registered schema before calling the executor.

## Out of scope

- Unknown tool handling, tool output validation, and the remaining implementation and documentation criteria listed in issue #37.