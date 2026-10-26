# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.execute` is already the real entry point for tool calls, and `createChatOrchestrator` exposes the existing tool-loop path. The acceptance suite exercises both directly without introducing a seam or production fixture.

## Done when these pass

- [ ] **rejects malformed input before invoking the executor** — required and wrong-typed fields return readable `ToolResponse` failures, redact the offending value, and never invoke the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input through unchanged, including an extra property** — valid input reaches the executor exactly once with undeclared properties preserved.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and validates the current dynamic schema** — broken static schemas fail at registration with the tool name, while function-valued definitions follow the schema resolved for each call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **feeds a validation rejection into the retry round and preserves the unknown-tool throw** — the orchestrator resolves after a malformed call, exposes the rejection to the provider on retry, and keeps the intentional unknown-tool exception.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add schema validation at the registry boundary and return rejection text as a `ToolResponse`.
- [ ] Compile static definitions during registration and cache resolved dynamic schemas by object identity.
- [ ] Preserve pass-through input, redacted diagnostics, and the unknown-tool error contract.
- [ ] Keep the orchestrator tool loop alive through a rejected call so the model can correct it.

## Out of scope

- Tool output validation, authorization, retry policy beyond the existing round budget, and changing the unknown-tool throw.
- Documentation, dependency, changelog, version, and migration-note edits required by the implementation ticket; this round defines the executable behavior contract only.