# Definition of Done

> A tool that receives unexpected input must fail in one predictable, known way before the rest of this epic's tool work can be built on top of it.

**Strategy: `direct`** — `ToolRegistry.register`, `ToolRegistry.execute`, and the orchestrator's `processMessage` expose the complete behavior through existing public seams. Real schemas, executors, logger values, and a scripted provider make validation and retry observable without replacing production modules.

## Done when these pass

- [ ] **rejects malformed input without executing or disclosing values, but passes valid input through unchanged** — Invalid required/type/enum input becomes a value-free response before execution, valid extra keys remain unchanged, and unknown names still throw.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles static schemas at registration and resolves dynamic schemas for each call** — Broken static schemas fail early with the tool name, registered static schemas remain compiled across ten calls, and changing dynamic definitions govern each call.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a rejection to the provider so it can correct the call within the tool loop** — A malformed call is returned to the provider, a corrected retry executes once, and the conversation resolves.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add a runtime JSON Schema validator dependency and compile/cache schemas with the required static and dynamic lifecycles.
- [ ] Return redacted validation failures from `execute` before executor invocation while preserving valid input and unknown-tool behavior.
- [ ] Carry validation rejection through the bounded orchestrator tool loop as a normal tool result.
- [ ] Document the registry contract, executor migration, version change, and npm-facing changelog entry in the ticket's named documents.

## Out of scope

- Tool output validation, authorization, unknown-tool error changes, retries, timeouts, rate limiting, and concrete tool implementations.