# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The existing `register` and `execute` entry points accept real JSON Schemas and executors. Observable schema reads distinguish compilation from repeated validation without mocking a validator.

## Done when these pass

- [ ] **rejects malformed input safely and passes accepted input through unchanged** — Required, type and enum rejection prevents execution and exposes safe diagnostics; accepted input preserves extra properties and omits defaults, and unknown tools still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten executions** — Invalid schemas fail at startup naming the tool, and valid schemas compile once.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates dynamic definitions against the current schema and caches by schema identity** — Schema changes take effect immediately and repeated use of a resolved object reuses compilation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Compile static schemas during registration, reporting the tool name on schema errors; install the validator as a runtime dependency.
- [ ] Validate required, type and enum constraints before execution, returning safe error results and logging paths and constraints without values.
- [ ] Preserve accepted input, unknown keys, omitted defaults and existing unknown-name errors.
- [ ] Resolve function definitions each execution and cache by schema object identity.
- [ ] Verify corrected model retries through the existing bounded orchestrator loop; no provider stub is introduced in these acceptance tests.
- [ ] Point the one-line execute comment at the spec and align README.md, docs/adding-a-tool.md and .specify/spec.md.
- [ ] Include the MINOR bump, consumer changelog and PR migration note; CI verifies build, published import, types, lint and formatting.

## Out of scope

- Output validation, authorization, tool implementation, transport error redesign and changing the unknown-tool throw.
- Retry policies, timeout and rate limiting, hallucination detection and an evaluation harness.