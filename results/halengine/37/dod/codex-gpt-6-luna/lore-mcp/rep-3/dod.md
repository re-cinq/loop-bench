# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is the real callable seam; a registered tool with a required `location` field can prove rejection happens before executor invocation.

## Done when these pass

- [ ] **Reject missing required input before execution** — input missing the schema's required `location` returns a validation failure naming that field and leaves executor call count at zero.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Validate missing required properties through `ToolRegistry.execute` and return a readable `ToolResponse` before the executor runs.

## Out of scope

- Valid input passthrough, other validation constraints, schema compilation/caching, orchestrator retry behavior, and documentation changes remain ticket criteria for implementation, but this acceptance slice pins the reported unchecked-input failure.