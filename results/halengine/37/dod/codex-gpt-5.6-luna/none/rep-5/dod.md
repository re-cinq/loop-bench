# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is the real entry point used by callers and can be exercised directly with registered tool definitions and executors. No mock or replacement seam is needed.

## Done when these pass

- [ ] **rejects invalid required and typed tool input without invoking the executor** — malformed required and typed values return rejection text and never reach the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid tool input and unlisted properties through unchanged** — valid input, including an extra property, is delivered exactly once without defaults or coercion.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and resolves dynamic schemas per call** — static schemas remain registration-bound and function-valued definitions follow the current schema on each execute call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an uncompilable schema at registration with the tool name** — a broken static schema fails startup registration with the tool name in the error.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the registry acceptance tests against the real `ToolRegistry` seam.
- [ ] Add the validation spec statements and link each acceptance test.
- [ ] Format, run only the acceptance test file, and preserve the expected red bar for the missing validation behavior.

## Out of scope

- Tool output validation, unknown-tool behavior, orchestrator retry-loop behavior, authorization, and documentation or dependency changes are implementation-round work outside these acceptance tests.