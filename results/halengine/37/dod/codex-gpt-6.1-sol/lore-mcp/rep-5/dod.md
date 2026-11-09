# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are callable today with real schemas and executors. Three acceptance cases group validation and privacy, static compilation, and dynamic schema lifetime without replacing production code.

## Done when these pass

- [ ] **rejects malformed tool input privately and passes accepted input through unchanged** — required, type and enum rejections return diagnostic tool results without dispatch; logs and results exclude values; accepted input retains extras without defaults or coercion and dispatches once; unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them for ten executions** — invalid schemas fail at startup with the tool name; a schema getter observes compilation at registration and no repeated schema traversal during execution.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each dynamic definition against its current schema and reuses schema objects** — changing the resolved schema changes validation immediately in both directions and the same schema object is not recompiled.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator dependency and compile static schemas at registration, naming the tool in compilation errors.
- [ ] Reject required, type and enum violations as value-free diagnostic `ToolResponse` results before executor dispatch; include property paths and constraints in logs.
- [ ] Preserve accepted inputs, extra properties, executor response normalization and the existing unknown-name exception.
- [ ] Resolve dynamic definitions per call and cache compiled validators by schema object.
- [ ] Verify the orchestrator carries rejection text into the next model round and permits a corrected retry within its existing round limit; a stub-provider test requested by the issue is excluded here by the no-stubs contract.
- [ ] Update README, docs/adding-a-tool.md and .specify/spec.md, add the one-line execute comment pointing to the validation spec, publish the migration changelog and MINOR version bump, and include the migration note in the implementation PR.
- [ ] Let CI verify build/import, types, lint, formatting and the complete suite after implementation.

## Out of scope

- Tool output validation, authorization, execution retry/timeout/rate limiting, provider implementation and changes to unknown-tool errors.
- Production implementation in this acceptance-test commit; documentation and release changes above remain implementation work, not source-text assertions.

Run only these acceptance tests with `npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts --runInBand`.
The initial run reports `Tests: 3 failed, 3 total`: malformed calls return `forecast` and invoke the executor, invalid schema registration returns no error, and changing a dynamic schema still returns `forecast` for invalid input.