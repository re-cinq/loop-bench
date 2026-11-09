# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are existing public seams accepting real JSON Schema objects and executors. Tests exercise these directly; schema getters observe compilation-time access without replacing the validator.

## Done when these pass

- [ ] **rejects invalid tool input privately and passes valid input unchanged** — required, type, nested path and enum rejection; zero executor calls on rejection; private, useful diagnostics and logs; unchanged valid input with extras and absent defaults; unknown-name throw retained.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them across ten calls** — schema access occurs at registration and never again during execution; an invalid schema fails registration with the tool name.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition using its current cached schema object** — changing definitions changes validation, while a repeated schema object reuses compilation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator to runtime dependencies and compile static schemas at registration, wrapping schema errors with the tool name.
- [ ] Return value-free path/constraint diagnostics before execution on required, type and enum failures; retain valid payloads and unknown-name behavior.
- [ ] Resolve dynamic definitions per call and cache compilation by resolved schema object identity.
- [ ] Verify the rejected-call/corrected-retry orchestrator integration within the existing five-round budget. The ticket requests a stub-provider test, which this acceptance pod's no-stubs rule forbids; existing orchestrator tests cover successive tool rounds but not a validation rejection.
- [ ] Update README.md, docs/adding-a-tool.md and .specify/spec.md, and point the one-line execute doc comment to the new contract spec.
- [ ] Publish the MINOR migration note in CHANGELOG.md and the PR body; let CI verify runtime package import, build, types, lint and the full suite.

## Out of scope

- Changing the unknown-tool-name throw, output validation, authorization, timeouts, rate limiting, and actual consumer tool implementations.
- Source-text assertions for documentation, dependency placement or release metadata; these are review and CI obligations.
- Lore's existing list adapter emits only id/name/file and does not expose a spec field; anchors are stamped beside tests and linked from the spec without changing production tooling in this tests-only task.