# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is an existing public seam that can be called directly with a real tool definition and input. The acceptance test verifies a required field is rejected before the registered executor runs.

## Done when these pass

- [ ] **rejects missing required input before invoking the executor** — missing required input produces a rejection result naming the field, with no executor call.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add validation against the resolved tool definition's `inputSchema` before executor invocation.
- [ ] Return validation failures as readable tool results and keep the unknown tool error behavior unchanged.
- [ ] Update the tool documentation and release notes to describe the validation contract.

## Out of scope

- Schema compilation timing and caching, provider retry behavior, tool output validation, authorization, and changing the unknown tool failure behavior.