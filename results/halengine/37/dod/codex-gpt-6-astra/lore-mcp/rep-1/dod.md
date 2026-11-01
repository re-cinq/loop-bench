# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are existing callable seams. Real executors, JSON Schema objects and an in-memory logger exercise validation without mocks; schema property access observes startup compilation and reuse without depending on a validator's private API.

## Done when these pass

- [ ] **rejects malformed arguments privately and passes accepted arguments unchanged** — required, type and enum rejection before execution, private diagnostic results and logs, unchanged valid arguments with unknown keys, no defaults or coercion, and the existing unknown-name exception.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them across ten calls** — invalid schema errors name the tool at registration, and static schemas are read at registration rather than on execution.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates dynamic definitions against the current schema object** — changing schemas take effect per call, with compiled validators reused for the same schema object.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator to runtime dependencies and compile static schemas at registration with tool-named errors.
- [ ] Resolve dynamic definitions per call and cache validators by schema object.
- [ ] Reject invalid inputs as ToolResponse results before execution, logging property paths and constraints without values; preserve accepted input and unknown-name throws.
- [ ] Verify the orchestrator's rejected-call/corrected-retry flow in the implementation round; this pod's no-stubs rule excludes the ticket's requested stub-provider test.
- [ ] Update README.md, docs/adding-a-tool.md and .specify/spec.md, and add the one-line execute comment pointing to the validation spec.
- [ ] Add the consumer-facing changelog, MINOR version bump and migration note; let CI verify runtime packaging, build, types, lint and the full suite.

## Out of scope

- Changing unknown-tool behavior, output validation, authorization, new tool implementations, and retries/timeouts/rate limits around executor failures.
- Production changes in this acceptance-test commit; documentation and release requirements above remain implementation obligations, not source-text assertions.