# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are callable today, and the orchestrator already passes tool results back to providers. The new tests exercise those real entry points; the provider used by the loop test is a scripted `AIProvider` because the retry exchange needs two successive model calls.

## Done when these pass

- [ ] **rejects missing required input before execution and passes valid input through unchanged** — a rejected call does not reach the executor, and a valid call retains extra keys.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **reports type and enum failures by path and constraint without exposing input values** — malformed values produce safe, actionable results.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a broken static schema at registration and reuses a valid one** — broken definitions fail at startup, valid static schemas are compiled once, and unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **uses the current schema of a function-valued definition on each call** — dynamic definitions cannot reuse stale validation.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejected tool call to the provider for a corrected retry** — the model sees the rejection and the conversation resolves.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator to runtime dependencies; compile static schemas once at registration and cache dynamic schemas by resolved schema object.
- [ ] Return path and constraint diagnostics without values, including in logs, and keep the unknown-tool throw.
- [ ] Preserve valid input verbatim, including unknown properties, with no coercion, defaults, or opt-out.
- [ ] Keep the retry within the existing bounded tool loop.
- [ ] Update `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, the one-line `execute` comment, and `CHANGELOG.md`.
- [ ] Document the executor migration in the PR body and release the change with a MINOR version bump.
- [ ] Confirm the package build and import, typecheck, lint, formatting, and full suite in CI.

## Out of scope

- Tool output validation, unknown-tool response behavior, authorization, retries beyond the existing round bound, timeouts, rate limits, and new tool implementations.