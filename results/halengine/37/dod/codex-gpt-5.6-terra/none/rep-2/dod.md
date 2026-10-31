# Definition of Done

> A tool that receives unexpected input must fail in one predictable, known way before the rest of this epic's tool work can be built on top of it.

**Strategy: `direct`** — `ToolRegistry.execute` is the existing boundary between a resolved definition and its executor, and the chat orchestrator already carries returned tool responses into the next provider round. The acceptance tests call those public paths with real schemas and values.

## Done when these pass

- [ ] **ToolRegistry input-schema validation** — invalid input is rejected without execution or value disclosure; valid input passes through unchanged; static and dynamic schemas retain their defined resolution behavior.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Tool input validation through the chat loop** — a returned rejection reaches the provider and permits its corrected retry.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add a JSON Schema validator as a runtime dependency and compile static definitions at registration.
- [ ] Return value-redacted validation `ToolResponse`s before calling executors, while preserving unknown-tool throws and unknown input keys.
- [ ] Resolve and cache function-valued schemas by resolved schema object, then return validation results through the tool loop.
- [ ] Update the tool documentation, README, system spec, changelog, and release migration note for the validation boundary.

## Out of scope

- Tool output validation, authorization, retries, timeouts, rate limits, and changing the unknown-tool failure class.