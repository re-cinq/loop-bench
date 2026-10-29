# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are callable today, and the orchestrator accepts a provider and registry. The tests exercise those real entry points.

## Done when these pass

- [ ] **rejects malformed input without executing or exposing values** — required, type, and enum failures return safe feedback before the executor runs.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **passes valid input unchanged after validating against the registered schema** — extra keys survive and a static schema is compiled once at registration.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a broken static schema at registration** — an invalid schema fails early with the tool name.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition against its current schema** — execution uses the schema resolved for that call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns validation feedback to the provider for a corrected retry** — a malformed call returns a readable result and the model can retry.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator to runtime dependencies and validate before executor invocation.
- [ ] Compile static schemas at registration and cache dynamic schemas by resolved object.
- [ ] Return property paths and failed constraints without input values in feedback or logs.
- [ ] Keep schema-valid input unchanged and retain the unknown-tool throw.
- [ ] Document the contract in README.md, docs/adding-a-tool.md, .specify/spec.md and a one-line execute comment; add the consumer changelog entry and minor version bump.
- [ ] Record the executor migration note in the PR body and pass the repository CI gates.

## Out of scope

- Tool output validation, authorization, retries, timeouts, and changing unknown-tool behavior.