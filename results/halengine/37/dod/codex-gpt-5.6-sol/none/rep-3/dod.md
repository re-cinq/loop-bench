# Definition of Done

> A tool that receives unexpected input must fail in one predictable, known way before the rest of this epic's tool work can be built on top of it.

**Strategy: `direct`** — `ToolRegistry.register` and `ToolRegistry.execute` are existing public seams that expose schema lifecycle, validation results, and executor invocation directly.

## Done when these pass

- [ ] **returns actionable, value-safe rejections and passes accepted input through unchanged** — rejected required, type, and enum constraints return useful results without invoking the executor or exposing values; valid input, extra keys, and unknown tools retain their contracts
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema at registration and reuses it across executions** — registration eagerly rejects broken schemas and ten executions do not compile a static schema again
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates each function-valued definition against the schema resolved for that call** — changing dynamic definitions cannot leave execution using a stale validator
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add JSON Schema validation at the registry boundary and return safe, actionable rejection results.
- [ ] Compile static schemas during registration and cache dynamic validators by schema identity.
- [ ] Preserve accepted input and the existing unknown-tool exception contract.
- [ ] Carry rejection results through the bounded orchestrator tool loop and update consumer-facing documentation.
- [ ] Add the runtime validator dependency, migration/release notes, and the required minor version bump.

## Out of scope

- Tool output validation, tool authorization, retries, timeouts, rate limiting, and changing unknown-tool handling.