# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — `ToolRegistry.register` and `execute` are public seams, and the orchestrator accepts a provider and registry. Five tests exercise the observable validation contract at those entry points.

## Done when these pass

- [ ] **rejects missing required input before execution while preserving valid input and unknown names** — required fields reject before the executor; valid input remains unchanged and unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects wrong types and enum values with paths and constraints but without input values in results or logs** — diagnostics identify the property and rule without exposing values.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and reuses them across ten calls** — invalid schemas fail early with the tool name and compilation is reused.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each function valued definition against its current schema** — each call uses the schema returned for that call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejected tool call to the provider so a corrected retry completes** — malformed input becomes model visible feedback and a corrected call completes the conversation.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator as a runtime dependency and validate before calling an executor.
- [ ] Compile static schemas during registration; resolve dynamic schemas per call and cache by schema object.
- [ ] Return path and constraint diagnostics without values; keep unknown names as thrown errors and ensure rejection logs contain no values.
- [ ] Keep the rejection as a tool result through the bounded orchestrator loop.
- [ ] Update README, docs/adding-a-tool.md and .specify/spec.md; add a one-line execute comment pointing to the spec.
- [ ] Add a consumer-facing changelog entry, a MINOR version bump and the migration note in the PR body.
- [ ] Run the named acceptance file and CI checks after implementation.

## Out of scope

- Tool output validation, unknown-name handling changes, authorization, timeouts, rate limiting and implementing any specific tool.