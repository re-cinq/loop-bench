# Definition of Done

> A tool that receives unexpected input must fail in one predictable, known way before the rest of this epic's tool work can be built on top of it.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and the orchestrator's existing tool loop expose the complete behavior through public runtime entry points.

## Done when these pass

- [ ] **validates tool input while preserving valid and unknown-tool behavior** — required and typed fields are enforced before execution without returning identifying values; extra properties survive unchanged and unknown tools still throw
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and validates dynamic definitions from each call** — static, invalid, and function-valued schemas obey their required compilation lifecycle
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns validation feedback to the model so it can correct a malformed tool call** — validation failure stays inside the bounded conversation loop as a tool result
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator as a runtime dependency and validate before executor invocation.
- [ ] Compile static schemas during registration and cache dynamic validators by resolved schema object.
- [ ] Return value-redacted validation details naming property paths and failed constraints, including in logs.
- [ ] Document the runtime contract in the registry, README, tool guide, system spec, and changelog.
- [ ] Record the hand-validation migration note and MINOR version bump in the pull request.

## Out of scope

- Tool output validation, authorization, retries, timeouts, rate limiting, and changing the unknown-tool error contract.