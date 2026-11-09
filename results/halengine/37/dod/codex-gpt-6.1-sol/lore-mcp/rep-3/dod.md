# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are existing public seams accepting real schemas, definitions and executors. Three tests exercise rejection and pass-through, static compilation, and dynamic schema changes without mocks or production edits.

## Done when these pass

- [ ] **rejects malformed calls privately and passes accepted input through unchanged** — required, type and enum failures return descriptive results without execution or value disclosure; valid extra keys survive without defaults or coercion and execute once; unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them across ten executions** — broken schemas fail at registration naming the tool, and schema property reads stop after registration.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition against its current schema and caches by schema object** — switching between string and number schemas changes acceptance immediately, and repeated use of the same schema does not recompile it.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator dependency and compile static schemas at registration, naming the tool on schema errors.
- [ ] Validate before execution and return path/constraint rejection results; keep payload values out of rejection results and logs, preserve unknown-tool throws and accepted input unchanged.
- [ ] Resolve dynamic definitions per execution and cache compilation by resolved schema object.
- [ ] Keep the existing orchestrator tool-result path and five-round limit so a rejection reaches the model and a corrected retry can complete.
- [ ] Update README.md, docs/adding-a-tool.md and .specify/spec.md to describe returned rejections and unchanged extra keys; point execute's one-line comment at the new spec.
- [ ] Add the consumer-facing changelog, MINOR bump and PR migration note that executors no longer receive schema-invalid calls; CI verifies dependency packaging and the full quality checklist.

## Out of scope

- Unknown-tool error redesign, output validation, authorization, hallucination detection, execution retry/timeout/rate limiting and actual tool implementations.
- Source-text assertions for documentation, dependency declarations or comments; those delivery requirements are reviewed as edits and checked by CI.
- Stub-provider loop tests: this acceptance-test contract forbids stubs; the registry tests exercise returned rejection results at the existing orchestrator boundary.
- Modifying test discovery tooling: `.lore/test-commands.yml` currently emits only id/name/file, with no spec descriptor field; tests carry ordinal spec-anchor comments and statements carry named links.