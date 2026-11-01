# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The public `register` and `execute` methods already expose the behavior. These tests use real schemas, executors and the default logger; a child process captures both output streams without replacing logging functions.

## Done when these pass

- [ ] **rejects malformed input privately and preserves accepted input** — Required, type and enum failures return actionable results without executor calls or value disclosure; valid input retains extra keys, receives no defaults or coercion, and executes once; unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an uncompilable static schema at registration with the tool name** — Broken static schemas fail at startup with tool identity.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema at registration and reuses it for ten executions** — An observable schema getter is read during registration and never again across ten calls.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition and caches by resolved schema identity** — Switching string → number → the original string schema changes validation immediately and reuses both compiled schemas.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator as a runtime dependency and compile static schemas during registration, reporting the tool name on schema errors.
- [ ] Validate before execution and return a ToolResponse for required, type and enum failures; preserve input and the unknown-name exception.
- [ ] Describe property paths and constraints in rejection results and logs without logging property values.
- [ ] Resolve function definitions per call and cache validators by resolved schema object identity.
- [ ] Confirm corrected retries flow through the existing orchestrator tool-result path and remain subject to its five-round budget; the requested stub-provider test is not included because this acceptance-writing task forbids stubs, and the shipped mock provider cannot emit tool calls.
- [ ] Update README.md, docs/adding-a-tool.md and .specify/spec.md, and add the one-line execute comment linking to the validation spec.
- [ ] Supply the MINOR version bump, consumer-facing changelog entry and PR migration note; CI must verify runtime import, build, types, lint and the full suite.

## Out of scope

- Changing unknown-tool handling, output validation, authorization, retries/timeouts/rate limits, and actual shipped tool implementations.
- Source-text assertions for documentation, dependency placement or comment length; these remain implementation/review and existing CI gate responsibilities.
- Replacing the provider boundary to introduce a test-only seam. Schema getters observe schema reads without mocking a compiler; these tests do not constrain the validator's internal number of getter accesses during one compilation.