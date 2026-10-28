# Definition of Done

> A tool that receives unexpected input must fail in one predictable, known way before the rest of this epic's tool work can be built on top of it.

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are callable today with real schemas and executors. A subprocess captures the real logger; schema accessors observe compilation traversal without mocking the validator.

## Done when these pass

- [ ] **rejects malformed calls privately and preserves accepted input** — required, type and enum failures return safe tool results before execution; accepted input is unchanged, and unknown tools still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten calls** — invalid schemas fail at startup with the tool name; valid schemas are compiled eagerly and not traversed again on execution.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates dynamic definitions against the current schema and caches by identity** — each call resolves its definition, schema changes take effect immediately, and returning to an earlier schema reuses its compilation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator dependency and compile static schemas during registration, naming the tool on compilation failure.
- [ ] Reject invalid input before execution with safe path/constraint diagnostics in tool results and logs; preserve accepted input and unknown-name throws.
- [ ] Resolve dynamic definitions per execution and cache validators by schema identity.
- [ ] Keep rejection results on the existing bounded tool loop; no test provider double is introduced because this acceptance contract forbids stubs.
- [ ] Update README.md, docs/adding-a-tool.md and .specify/spec.md with rejection, extra-key and retry-bound semantics; add the one-line execute comment pointing to the new spec.
- [ ] Add the consumer-facing changelog entry and MINOR version bump, and state the hand-validation migration note in the PR body; CI verifies packaging and build gates.

## Out of scope

- Tool output validation, authorization, execution retries/timeouts/rate limits, actual tool implementations, and changing the unknown-tool exception.
- Source-text assertions about documentation, dependencies or comments; these remain review and CI obligations.