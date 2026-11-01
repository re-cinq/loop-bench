# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` expose the real boundary directly. Three acceptance tests use real schemas, executors and a writable logging sink; schema accessors observe registration-time work and reuse without mocking a validator.

## Done when these pass

- [ ] **rejects malformed tool input privately and passes valid input unchanged** — required, type, nested path and enum failures return descriptive results without executing or leaking values; valid input preserves extra keys and context, applies no defaults, and runs once; unknown names retain their exception.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten calls** — malformed schemas fail immediately with the tool name, and executions do not revisit the static schema.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition and caches each resolved schema object** — changing definitions change validation immediately, while repeated schema identities reuse compilation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator dependency and compile static schemas at registration, including tool names in schema errors.
- [ ] Validate before execution, returning property paths and constraints as ToolResponse results and logging no input values; preserve unknown-tool exceptions.
- [ ] Resolve dynamic definitions for each execution and cache compilation by schema identity.
- [ ] Keep valid input unmodified, including unknown properties, without coercion or defaults.
- [ ] Verify rejected tool calls followed by corrected retries through processMessage; the ticket requests a stub provider but this acceptance-authoring contract prohibits stubs, so no provider double was added here.
- [ ] Update README.md, docs/adding-a-tool.md and .specify/spec.md; add the one-line execute comment linking the contract spec.
- [ ] Add the MINOR version bump, consumer-facing changelog and PR migration note; CI verifies build, installed runtime import, typing, lint and the full suite.

## Out of scope

- Tool output validation, unknown-tool behavior changes, authorization, tool implementation, execution retries, timeouts and rate limiting.
- Source-text assertions for documentation, dependency placement or comments; those delivery requirements remain explicit facets and CI/review obligations.
- Replacing the Lore descriptor emitter: the existing .lore/test-commands.yml list command emits only id/name/file, with no spec field support; tests carry spec anchor comments and statement-side validation links.