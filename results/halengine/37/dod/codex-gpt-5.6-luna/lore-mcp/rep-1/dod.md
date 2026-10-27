# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is already the real entry point used by the orchestration layer, so the acceptance tests call the registry directly with concrete tool definitions and executors.

## Done when these pass

- [ ] **returns a redacted schema failure and never invokes the executor** — rejected required and wrong-typed fields return a `ToolResponse` without the offending value and suppress execution.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **passes valid input and an unlisted property through unchanged exactly once** — schema-valid input is forwarded verbatim while malformed input is rejected.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **compiles static schemas at registration and rejects every malformed call** — static schemas reject repeated invalid calls and uncompilable schemas fail at registration with the tool name.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates a function-valued definition against the schema resolved for that call** — changing function-produced schemas are applied to the corresponding call rather than a stale schema.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Return a schema rejection as a `ToolResponse` before invoking the executor.
- [ ] Preserve valid unknown properties without coercion or defaults.
- [ ] Compile static schemas at registration and dynamic schemas per resolved call.
- [ ] Keep unknown-tool errors unchanged.

## Out of scope

- Tool output validation, authorization, retries beyond the existing tool-round budget, and documentation or dependency updates beyond the implementation needed to satisfy these registry behaviors.