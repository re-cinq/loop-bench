# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` and `createChatOrchestrator` are callable today. Their current behavior gives a direct red bar for schema rejection and retry handling.

## Done when these pass

- [ ] **Reject malformed tool input safely** — missing, wrong-typed, and enum-invalid input returns a useful value without executing or exposing values; valid input passes unchanged, and unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Compile static schemas at registration** — an invalid schema fails immediately with the tool name.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Reuse a static compiled schema** — ten calls use the registered schema even after its source object changes.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Use the current dynamic schema** — a function-valued definition changes validation on the next call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Return rejection to the model** — the provider sees the rejection and a corrected retry completes.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator to runtime dependencies and validate before executor invocation.
- [ ] Compile static schemas at registration, and cache dynamic schemas by resolved object.
- [ ] Return property paths and constraints without input values in rejection responses or logs.
- [ ] Preserve valid input, extra properties, and the unknown-tool throw.
- [ ] Update README, tool author guide, system spec, changelog, version, and PR migration note.
- [ ] Keep the registry comment one line and point it to this spec.

## Out of scope

- Tool output validation, authorization, retry policy, timeout, rate limiting, and changing the unknown-tool error.