# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The public `register` and `execute` methods expose the required boundary today. Real schemas, executors and an in-memory log sink exercise it without mocks; schema getters observe compilation and reuse without coupling to a validator's private API.

## Done when these pass

- [ ] **rejects malformed input privately and passes valid input unchanged** — Required, type and enum failures return private diagnostics without executor calls; logs name paths and constraints, valid extras survive without defaults, and unknown names retain their exception.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them** — Invalid schemas fail at startup naming the tool; static schemas are inspected at registration and reused over ten executions.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates the current dynamic schema and caches each schema object** — Changed definitions take effect immediately and returning to a schema object reuses its compilation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator dependency and compile static definitions during registration, naming the tool on schema errors.
- [ ] Validate before execution, returning path/constraint diagnostics without input values in either responses or logs; retain valid input and unknown-name semantics.
- [ ] Resolve dynamic definitions per call and cache validators by resolved schema identity.
- [ ] Keep rejections as ordinary tool results so the existing orchestrator can deliver them to the model within its five-round limit; add the requested corrected-retry integration coverage during implementation (the ticket's proposed provider stub is excluded by this pod's no-stubs rule).
- [ ] Add the one-line execute spec reference, update README.md, docs/adding-a-tool.md and .specify/spec.md, and provide the MINOR version bump, migration note and npm-facing changelog entry.
- [ ] Let CI verify build/import, type checks, lint, formatting and existing tests; no production changes were made in this acceptance-test commit.

## Out of scope

- Changing unknown-tool exceptions, output validation, authorization, hallucination evaluation, retries/timeouts/rate limiting and actual tool implementations.
- Source-text assertions for documentation, dependency placement or release prose; review those delivery facets directly.