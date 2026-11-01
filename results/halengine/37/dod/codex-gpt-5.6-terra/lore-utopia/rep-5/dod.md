# Definition of Done

> A tool that receives unexpected input must fail in one predictable, known way before the rest of this epic's tool work can be built on top of it.

**Strategy: `direct`** — `ToolRegistry.execute` is a direct public seam, and the orchestrator already feeds its returned `ToolResponse` back to the provider. The acceptance suite exercises registration, execution, and the real tool-loop boundary without changing production code.

## Done when these pass

- [ ] **ToolRegistry input-schema validation** — rejects malformed calls before executors run, preserves schema-valid extra keys, compiles schemas at the required time, and returns the rejection through a retryable tool loop.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add JSON Schema validation at the registry boundary and return validation failures as `ToolResponse` values.
- [ ] Compile static schemas at registration and resolve function-valued schemas per call without stale validation.
- [ ] Preserve valid input unchanged and let the provider retry after receiving a rejection.
- [ ] Update the public documentation, package dependency, changelog, and release migration note.

## Out of scope

- Unknown-tool handling, output validation, authorization, retry policy, timeouts, rate limiting, and tool implementations.