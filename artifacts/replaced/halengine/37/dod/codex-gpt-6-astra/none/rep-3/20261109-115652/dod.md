# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The public `ToolRegistry.register` and `ToolRegistry.execute` methods already expose the required behavior. Tests use real schemas and executors; a child process captures the real logger output without replacing it, and schema accessors observe compilation traversal without mocking the validator.

## Done when these pass

- [ ] **rejects malformed input privately and passes valid input unchanged** — Required fields, types and enums reject before execution with useful, value-free results and logs; valid extra keys survive, defaults and coercion are absent, execution occurs once, and unknown tools still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten calls** — Invalid schemas fail at startup naming the tool; valid schemas are traversed at registration and never traversed again over ten executions.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition and caches by schema identity** — Changing a function-valued definition changes validation immediately; returning a previous schema object reuses its compiled validator.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator and reject invalid static schemas at registration with the tool name.
- [ ] Return safe property-path and constraint diagnostics before executing malformed calls, keeping values out of logs and results.
- [ ] Preserve valid input exactly, including unknown keys, without coercion, defaults or an opt-out.
- [ ] Reuse static compilation and cache dynamic compilation by resolved schema identity while resolving definitions per execution.
- [ ] Confirm rejected tool results support corrected model retries through the existing bounded orchestrator loop.
- [ ] Update README.md, docs/adding-a-tool.md and .specify/spec.md; add the one-line execute comment pointing to the new contract spec.
- [ ] Add the consumer-facing CHANGELOG entry, MINOR version bump and PR migration note; let CI verify build, packaged import, types, lint and the complete suite.

## Out of scope

- Changing unknown-tool errors, tool-output validation, authorization, execution retries, timeouts, rate limits, and concrete tool implementations.
- Production changes in this acceptance-test commit.
- Source-text assertions for documentation or packaging; those remain delivery review and CI obligations.

The named spec was absent, so this commit introduces its contract before implementation. Test comments stamp the three spec anchors; the current Lore Jest descriptor script emits only id/name/file, so it cannot expose a spec field without a separate tooling change. Statement-side citations provide the established traceability.

Run only these acceptance tests with `npm test -- --runInBand --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`. All three failed on the original behavior: malformed inputs were serialized by the executor, invalid registration did not throw, and dynamic input returned `{"location":12}` instead of a string-type rejection.