# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is already a callable entry point. The acceptance test registers a real tool definition and observes both its returned response and whether its executor ran.

## Done when these pass

- [ ] **Rejects missing required tool input before calling the executor** — missing `location` returns a failure response naming the required property and leaves the executor uncalled.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Check input against the resolved tool schema before executing.
- [ ] Return a `ToolResponse` that identifies a schema rejection without invoking the executor.

## Out of scope

- Schema compilation timing, function-valued definitions, additional properties, coercion, defaults, privacy of validation messages and logs, retry-loop behavior, and documentation updates beyond the named validation contract.