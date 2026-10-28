# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The public `ToolRegistry.register` and `ToolRegistry.execute` methods already expose the required seam. Tests use real tool definitions and executors, schema getters to observe compilation reads, and a collecting logger through the public logger configuration; no mocks or stubs are needed.

## Done when these pass

- [ ] **rejects malformed calls safely and passes valid calls through unchanged** — Required, type and enum violations return readable, value-free rejections and never invoke the executor; logs identify paths and constraints; valid extra keys survive without defaults or coercion, exactly once; unknown names retain their exception.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them** — Invalid static schemas fail at startup with the tool name; a valid static schema is read during registration and never reread across ten executions.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates dynamic definitions against the current schema and caches each schema object** — Each execution resolves the definition, switching schemas changes validation, and returning to an existing schema object reuses compilation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator to runtime dependencies and compile static schemas during registration, naming the tool in compilation errors.
- [ ] Validate before execution, return rejection ToolResponses with property paths and constraints, and keep input values out of rejection results and logs.
- [ ] Preserve valid input, unknown extra keys, and the unknown-tool exception; do not coerce or apply defaults, add implicit additionalProperties restrictions, or expose an opt-out.
- [ ] Resolve function definitions per call and cache validators by schema object identity.
- [ ] Confirm the existing orchestration path delivers rejection results to the provider and completes after a corrected retry within the existing round bound. The ticket requests a stub-provider loop test; this acceptance pod forbids stubs, so no provider double is introduced here.
- [ ] Add the one-line execute comment pointing at the validation spec and update README.md, docs/adding-a-tool.md and .specify/spec.md with validated executor input, preserved unknown keys and model-readable rejections.
- [ ] Add a consumer-facing CHANGELOG.md entry, bump MINOR, and include the executor migration note in the PR description.
- [ ] Let CI verify the built package imports, type checks, full suite, lint and formatting; retain spec citations for implementation-round tests.

## Out of scope

- Unknown-tool error redesign, output validation, authorization, hallucination evaluation, execution retries/timeouts/rate limits, and actual tool implementations.
- Production changes in this acceptance-only commit; prose and release obligations are reviewed as facets rather than tested by source-text assertions.