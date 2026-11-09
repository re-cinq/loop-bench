# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The public `register` and `execute` methods already expose the validation boundary. Real tool executors, schema objects with observable accessors, and a collecting logger exercise the contract without validator mocks or stubs.

## Done when these pass

- [ ] **returns private actionable rejections and passes accepted input through unchanged** — Required, type, enum, nested paths, private results/logs, zero rejected executions, unchanged extras, no defaults/coercion, and the existing unknown-name throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects an uncompilable static schema at registration with the tool name** — Broken schemas fail at startup with an actionable tool identifier.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema at registration and reuses it for ten executions** — Schema inspection happens at registration and is not repeated on execution.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition and caches each resolved schema object** — Changing required fields takes effect on the current call, and returning to an earlier schema reuses its compiled validator.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator to runtime dependencies and compile static schemas at registration, naming the tool on compilation errors.
- [ ] Validate before executor invocation; return actionable path/constraint errors without input values in results or logs.
- [ ] Preserve valid input, extra keys, normalization, and the unknown-tool throw; do not apply defaults or coerce values.
- [ ] Resolve function definitions for each call and cache validators by resolved schema object identity.
- [ ] Verify the existing orchestrator tool-result path delivers rejection text on the next round, permits a corrected retry, resolves processMessage, and remains bounded by the default five tool rounds; the ticket requests a stub-provider regression test, which is not added here because this acceptance task prohibits stubs.
- [ ] Update README.md, docs/adding-a-tool.md, and .specify/spec.md with validation, executor guarantees, unchanged extras, returned rejections, and the retry bound; replace the weather example's stale warning.
- [ ] Add the one-line execute comment pointing at specs/hal-engine-tool-input-validation/spec.md, an npm-facing changelog entry, a MINOR version bump, and the PR migration note about malformed inputs no longer reaching executors.
- [ ] Keep spec citations and descriptor anchors current; let CI verify packaging/import, typechecking, lint, formatting, and the complete test suite.

## Out of scope

- Tool output validation, authorization, unknown-tool recovery, retries/timeouts/rate limits around executors, hallucination evaluation, and new tool implementations.