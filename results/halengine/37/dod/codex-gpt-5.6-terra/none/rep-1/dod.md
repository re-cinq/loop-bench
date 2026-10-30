# Definition of Done

> The registry currently pushes this check onto each tool's own executor, leaving every consumer to implement it itself — differently each time, or not at all. A tool that receives unexpected input must fail in one predictable, known way before the rest of this epic's tool work can be built on top of it.

**Strategy: `direct`** — `ToolRegistry.execute` is the existing boundary for a resolved tool definition and its executor. Dedicated registry and orchestrator acceptance tests call that boundary with real schemas and provider messages.

## Done when these pass

- [ ] **ToolRegistry input-schema validation** — rejects malformed input before the executor while preserving valid pass-through, unknown-tool errors, registration-time schema failures, and current dynamic schemas.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Tool-loop input-schema rejection** — returns the rejection to the provider and allows its corrected next round to complete.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator at the registry boundary and return redacted `ToolResponse` failures before invoking an executor.
- [ ] Compile static schemas at registration and cache validators by resolved dynamic schema object without reusing a stale definition.
- [ ] Preserve unknown keys unchanged, retain the unknown-tool throw, and feed validation failures through the existing tool loop.

## Out of scope

- Tool output validation, authorization, retries, timeouts, rate limiting, and returning unknown tool names to the model.