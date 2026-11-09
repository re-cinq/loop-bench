# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The public `register` and `execute` methods expose validation and schema lifetime without replacing implementation dependencies. The registry acceptance tests use real schemas, executor effects, and a recording logger through the public logger API.

## Done when these pass

- [ ] **rejects malformed tool input privately and passes valid input unchanged** — Required, type and enum failures return property/constraint diagnostics without invoking the executor or disclosing values; valid input retains extras, receives no defaults or coercion, and executes once; unknown names retain their exception.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten calls** — Registration reads the schema, ten executions reuse it without further schema reads, and invalid schemas fail registration with the tool name.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition and caches by schema identity** — Changing and restoring the resolved schema changes which calls are accepted, and a repeated schema is reused.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator and return private validation diagnostics before invoking executors.
- [ ] Compile static schemas at registration, name the tool on compilation failures, and cache dynamic schemas by object identity.
- [ ] Resolve the retry-test constraint: the ticket requires a stub provider, but this task forbids stubs; the shipped mock provider cannot emit tool calls, and the real remote providers require external services. A retry integration acceptance test remains owed pending permission for a test-local provider or a runnable real-provider fixture.
- [ ] Demonstrate rejection followed by correction through processMessage, including provider-visible rejection text and the existing round limit.
- [ ] Document the contract in the one-line execute comment, README.md, docs/adding-a-tool.md and .specify/spec.md.
- [ ] Add the consumer changelog, MINOR version bump and PR migration note; CI verifies runtime packaging, build, types, lint and tests.
- [ ] Expose spec anchors in Lore descriptors: tests carry spec comments and statement-side links, but the current scripts/lore-list-tests.mjs emits only id/name/file and has no spec metadata reader; changing that tool is outside this tests-only edit.

## Out of scope

- Unknown-tool behavior changes, output validation, authorization, hallucination evaluation, execution retries/timeouts/rate limiting, and concrete tool implementations.
- Production edits, dependency installation, builds, typechecking and linting in this acceptance-test pod.