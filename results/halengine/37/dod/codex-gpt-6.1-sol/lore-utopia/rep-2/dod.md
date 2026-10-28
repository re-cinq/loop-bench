# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The public `ToolRegistry.register` and `ToolRegistry.execute` methods already expose the required behavior. Tests exercise actual executors and schemas; a child process observes real logger output without replacing the logger or console, and schema accessors observe compilation without mocking a validator.

## Done when these pass

- [ ] **rejects malformed input privately and preserves valid input and unknown-tool behavior** — Required, type and enum failures return descriptive results without executing tools or exposing values; valid extra keys survive unchanged, defaults remain absent, and unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them across ten executions** — Invalid schemas fail immediately with the tool name; valid schemas are consumed at registration and never reread during ten calls.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition and caches by resolved schema identity** — A changed resolved schema governs the next call, repeated schema objects reuse validation, and correcting input permits execution.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator to runtime dependencies and reject required/type/enum violations before the executor; never coerce, insert defaults or disallow unspecified keys implicitly.
- [ ] Return model-readable rejection results with property paths and constraints, excluding values from text and logs; preserve the unknown-name exception.
- [ ] Compile static schemas at registration with tool-named errors and cache dynamic validators by resolved schema object.
- [ ] Preserve tool-loop delivery of returned results and the default five-round bound; verify a rejected call followed by a corrected call through the orchestrator without introducing provider stubs under this task's no-doubles constraint.
- [ ] Add a one-line execute doc comment pointing to the input-validation spec, and update README.md, docs/adding-a-tool.md and .specify/spec.md with the accepted-input, extra-key and returned-rejection contract.
- [ ] Add the consumer-facing changelog, MINOR version bump and PR migration note about executors no longer receiving malformed input for custom errors.
- [ ] Let CI verify the runtime dependency's packed import, build, types, lint, formatting and existing regressions; no production files are changed in this acceptance-test commit.

## Out of scope

- Returning unknown tool names as model-readable results, output validation, authorization, hallucination detection, timeout/rate-limit/retry infrastructure, and implementing actual tools.
- Source-text tests for documentation, dependency placement or comments; these remain review and CI obligations rather than permanent behavioral tests.