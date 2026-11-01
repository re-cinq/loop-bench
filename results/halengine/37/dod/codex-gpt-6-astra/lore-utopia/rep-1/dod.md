# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` expose the real validation boundary. Tests register real JSON-serializing executors and observe their inputs, returned results, schema reads and a recording logger; no production code or test doubles are added.

## Done when these pass

- [ ] **rejects malformed input privately and passes accepted input through unchanged** — required, type and enum failures return corrective results without invoking the executor or exposing values; valid input retains unknown keys, receives no defaults and executes exactly once; unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten executions** — schema processing occurs during registration, execution does not reread the schema, and broken schemas fail at registration with the tool name.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates dynamic definitions against the current schema and caches each schema object** — switching schema objects changes accepted types immediately and returning to an already compiled object reuses it.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator to runtime dependencies and compile static schemas at registration; report invalid schemas with the tool name.
- [ ] Validate before execution; return property paths and failed constraints without values in results or logs, preserving valid inputs and the unknown-name exception.
- [ ] Resolve function-valued definitions per execution and cache validators by schema identity.
- [ ] Verify the orchestrator retry path forwards rejection text to the next provider round and resolves after a corrected call; the ticket requests a stub provider but this acceptance-authoring task forbids stubs, and the shipped mock provider cannot emit tool calls.
- [ ] Update README.md, docs/adding-a-tool.md and .specify/spec.md, and point the one-line execute comment at the new spec.
- [ ] Publish the MINOR migration note in CHANGELOG.md and the PR body; CI verifies packaging, build, types, lint and the full suite.

## Out of scope

- Unknown-tool behavior changes, output validation, authorization, timeout/rate-limit policy and new tool implementations.
- Source-text assertions for documentation, dependency placement or comments; these remain review and CI obligations.
- Exact validator compile invocation counts require observing validator internals; these tests observe schema consumption at registration and its absence on repeated execution instead.
- The current Lore list adapter emits only id/name/file, not a spec field; tests carry spec-anchor comments and the spec carries declaration links without changing that adapter.