# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is the real public seam for tool calls. The acceptance test registers a required string field and exercises malformed input through that entry point.

## Done when these pass

- [ ] **Missing required input is returned as a validation result before execution** — a call missing the required `location` returns a result describing the failure, and the executor is not invoked.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Validate tool input against the resolved schema and return a readable `ToolResponse` on rejection.
- [ ] Compile static schemas at registration and resolve function-valued schemas per call.
- [ ] Document the schema validation contract in the README, tool guide, and system specification.

## Out of scope

- Unknown tool handling, tool output validation, authorization, retry policy, timeout, and rate limiting.