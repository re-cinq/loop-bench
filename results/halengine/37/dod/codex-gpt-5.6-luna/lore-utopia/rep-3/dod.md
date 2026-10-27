# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is a public, callable seam and `register` accepts real tool definitions and executors, so the acceptance tests exercise the registry without a transport or provider double.

## Done when these pass

- [ ] **rejects invalid input before execution and preserves valid extra properties** — rejected input returns a descriptive `ToolResponse` naming the field and expected type, without exposing the offending value or calling the executor; valid input with an extra property still reaches the executor unchanged exactly once.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **rejects an uncompilable schema while registering the named tool** — a malformed static schema fails at registration and names the tool.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **validates a function-valued definition against the schema resolved for each call** — a changing definition source is validated against its current schema on each execution.
      `src/orchestration/tools/registry.acceptance.test.ts`

- [ ] **compiles a static schema once across repeated executions** — repeated executions reuse the registration-time compilation of a static schema.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add JSON Schema validation at the registry boundary before executor invocation.
- [ ] Compile static schemas during registration and cache schemas resolved from function-valued definitions per call.
- [ ] Return safe validation failures as `ToolResponse` values while preserving the existing unknown-tool exception.

## Out of scope

- Tool output validation, orchestrator retry-loop behavior, documentation, package metadata, and provider-specific schema handling.
- Unknown-tool behavior, authorization, retries, timeouts, and rate limiting.