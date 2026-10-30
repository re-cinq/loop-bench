# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are public seams for schema lifecycle and validation, while `createChatOrchestrator` exposes the real retry path.

## Done when these pass

- [ ] **rejects schema violations before execution without disclosing values and preserves unknown-tool errors** — invalid required, type, and enum input returns safe diagnostics without calling the executor, while unknown names still throw
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input through unchanged and validates each dynamic definition current at that call** — valid values, extra keys, identity, execution count, and per-call dynamic schemas retain their contract
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a broken static schema at registration and compiles a valid static schema only there** — static schemas fail or compile at registration and are not recompiled during execution
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a validation rejection to the model so it can correct the call on the next round** — the orchestrator resolves after a rejected call is returned to the provider and corrected
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator as a runtime dependency and compile static and dynamic schemas at their specified lifecycle boundaries.
- [ ] Return redacted validation diagnostics before executor invocation while preserving the unknown-tool exception.
- [ ] Carry rejection tool results through the bounded orchestrator retry loop.
- [ ] Document the execution contract in code, README, the adding-a-tool guide, and `.specify/spec.md`.
- [ ] Add the npm-facing changelog entry and migration/version note.

## Out of scope

- Tool output validation, authorization, timeouts, rate limiting, and changing unknown-tool handling.