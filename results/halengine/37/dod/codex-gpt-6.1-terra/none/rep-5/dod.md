# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The registry's public register and execute methods expose the behavior directly using real schemas and executors.

## Done when these pass

- [ ] **rejects missing required input before invoking the executor** — Required input is enforced and valid extra properties pass through unchanged.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects wrong types and enum values without exposing input values** — Type and enum failures return safe descriptions without executing the tool.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an uncompilable static schema at registration with the tool name** — Invalid static schemas fail at registration.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition against its current schema** — Dynamic schemas are resolved for each call.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas at registration and cache dynamic schemas by resolved object; reject malformed input as a tool result without leaking values in results or logs.
- [ ] Preserve unknown tool errors and validate the retry path through the orchestrator, including the tool-round bound.
- [ ] Add the validator as a runtime dependency and verify packaging, compilation caching and the build import.
- [ ] Update the named documentation, migration note, minor version and changelog as specified in the ticket.

## Out of scope

- Tool output validation, authorization, unknown-tool behavior changes, and execution retry or rate limiting.