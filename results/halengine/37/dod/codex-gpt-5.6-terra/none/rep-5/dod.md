# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is the real execution boundary and can be exercised with registered definitions and executors. The acceptance suite records executor calls directly, without test doubles.

## Done when these pass

- [ ] **ToolRegistry input-schema validation** — rejects malformed input before execution, preserves valid extra properties, resolves function definitions per call, and rejects invalid static schemas at registration.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas during registration and report invalid schemas with their tool name.
- [ ] Resolve and validate schemas before execution, returning a redacted `ToolResponse` on failure.
- [ ] Cache validators by resolved dynamic-schema object while using the schema returned for each call.

## Out of scope

- Unknown-tool handling, output validation, authorization, and retry or timeout policy.