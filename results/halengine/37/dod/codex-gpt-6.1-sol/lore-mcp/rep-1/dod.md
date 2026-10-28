# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — The public `register` and `execute` methods expose the complete validation boundary. Real executors record accepted inputs, a recording logger receives diagnostics, and schema property getters observe compilation without replacing the validator.

## Done when these pass

- [ ] **rejects malformed input safely and preserves accepted input** — Required, type and enum failures return safe diagnostics before execution; valid extra properties survive without defaults or coercion, and unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten calls** — Invalid schemas fail at startup naming the tool; static schemas are inspected at registration and not recompiled during execution.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition and caches by schema object** — Switching between string and numeric schemas changes validation immediately, while returning to the same schema object reuses compilation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator dependency and compile static definitions at registration, including tool names in compilation errors.
- [ ] Reject invalid calls with a ToolResponse before executor invocation; name paths and constraints in diagnostics without exposing input values.
- [ ] Preserve valid input, unknown properties, executor results and the unknown-name throw; disable coercion and default insertion.
- [ ] Resolve dynamic definitions per execution and cache compilation by schema object identity.
- [ ] Confirm the existing orchestrator forwards rejection results into the next model round and allows a corrected call within its five-round bound; do not introduce provider doubles into these acceptance tests.
- [ ] Add the one-line execute spec reference; update README.md, docs/adding-a-tool.md and .specify/spec.md with the validated-input and returned-rejection contract.
- [ ] Add an npm-facing changelog entry, a MINOR version bump and the migration note describing executors no longer seeing malformed input; CI proves runtime dependency packaging and all normal checks.

## Out of scope

- Tool output validation, authorization, retry policies, timeouts, rate limiting, actual tool implementations and changing the unknown-tool exception.
- Source-text assertions about documentation, package metadata or comment style; these remain review and existing CI gates.