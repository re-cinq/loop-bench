# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` expose the real boundary today. Three acceptance cases exercise real executors, schema objects with observable getters, and the public logger sink without mocks or stubs.

## Done when these pass

- [ ] **rejects malformed tool input privately and passes accepted input through unchanged** — required, type and enum rejection returns readable property/constraint diagnostics without input values in results or logs and never invokes the executor; accepted extra keys survive without defaults or coercion exactly once; unknown tools retain their exception.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten calls** — schema compilation occurs at registration, ten executions do not reread it, and invalid schemas fail registration with the tool name.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition and caches by resolved schema identity** — switching string/number schemas changes accepted input immediately, and returning to the same schema object reuses compilation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator to runtime dependencies and compile static schemas at registration with tool-named startup errors.
- [ ] Reject missing, wrong-typed and enum-invalid input before execution using a returned ToolResponse; include property paths and failed constraints in diagnostics and logs without input values.
- [ ] Preserve accepted input, unknown keys, executor result normalization and unknown-tool exceptions; disable coercion and defaults.
- [ ] Resolve dynamic definitions per execution and cache compiled validators by schema object identity.
- [ ] Preserve the orchestrator's existing tool-result feedback path and five-round retry bound; verify a malformed call followed by a corrected call resolves with rejection text visible on the next provider round.
- [ ] Point the one-line execute documentation at the validation spec and update README.md, docs/adding-a-tool.md and .specify/spec.md to describe the new contract.
- [ ] Publish a MINOR version bump and migration note in CHANGELOG.md and the PR body: executors no longer receive malformed input for custom error handling.
- [ ] Let CI verify runtime build/import, typechecking, lint, formatting and the full suite.

## Out of scope

- Unknown-tool error policy changes, output validation, authorization, execution retry/timeout/rate limiting, hallucination evaluation and tool implementations.
- New provider test doubles: this acceptance file observes the registry's returned ToolResponse directly; the existing orchestrator forwards that result through its tool loop.
- Production implementation in this definition-of-done commit.