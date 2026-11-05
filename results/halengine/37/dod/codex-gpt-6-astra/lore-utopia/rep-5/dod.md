# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` expose the required behavior directly. Three acceptance tests use actual executors, schema objects and a writable logging stream; schema getters observe compilation reads without replacing a validator.

## Done when these pass

- [ ] **rejects malformed calls privately and accepts corrected input unchanged** — Required, type and enum failures return private diagnostic results before execution; corrected input reaches the executor exactly once, unchanged, with unknown keys and without defaults; unknown names retain their exception.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten calls** — Invalid schemas fail at startup with the tool name; valid static schemas are read during registration and not reread during ten executions.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic schema and reuses previously resolved schema objects** — Switching schema objects changes the accepted enum immediately; returning to the first object reuses its compiled constraints.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator and reject uncompilable static schemas at registration with the tool name.
- [ ] Return required/type/enum diagnostics before execution; disclose property paths and constraints but no input values in results or logs.
- [ ] Preserve accepted inputs without coercion, defaults or implicit extra-property restrictions, and preserve unknown-name throws.
- [ ] Cache static compilation and resolve function-valued definitions per call with caching by resolved schema identity.
- [ ] Verify rejected tool results reach the next orchestrator round and a corrected retry resolves within the existing round bound; the ticket requests a stub provider test, which this acceptance-test task forbids, so these acceptance tests exercise rejection and correction at the real registry seam.
- [ ] Add the one-line execute comment linking the contract and update README.md, docs/adding-a-tool.md and .specify/spec.md with rejection and extra-key semantics.
- [ ] Add the consumer-facing changelog, MINOR version bump and PR migration note; CI verifies runtime package import, build, types and quality checks.

## Out of scope

- Unknown-tool recovery, tool output validation, authorization, new tools, retry policies, timeouts and rate limits.
- Production edits in this acceptance-test commit; documentation migration and release changes belong to implementation.
- Source-text assertions and validator mocks; compilation reuse is observed through schema reads, not an implementation-specific compiler spy.