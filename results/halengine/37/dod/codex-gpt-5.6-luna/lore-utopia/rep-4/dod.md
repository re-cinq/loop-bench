# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is an existing public seam, so the acceptance suite calls the real registry entry point and observes executor invocation, returned tool responses, registration errors, and dynamic schema resolution directly.

## Done when these pass

- [ ] **returns schema failures with the field and expected type without invoking the executor** — required and wrong-typed input is rejected as a `ToolResponse` without leaking the offending value.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid extra properties through unchanged exactly once and preserves unknown-tool errors** — valid input is forwarded unchanged, and the out-of-scope unknown-tool throw remains intact.
  `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas once, rejects an uncompilable schema at registration, and validates dynamic schemas per call** — schema compilation and dynamic definition resolution obey the ticket’s lifecycle contract.
  `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add rejection responses for required and type constraints before executor invocation.
- [ ] Preserve valid input and the existing unknown-tool exception.
- [ ] Compile static schemas at registration and resolve/cache function-valued schemas per call.

## Out of scope

- Tool output validation, authorization, retries beyond the existing tool-round budget, and changing the unknown-tool error contract.