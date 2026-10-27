# Definition of Done

> A tool that receives unexpected input must fail in one predictable, known way before the rest of this epic's tool work can be built on top of it.

**Strategy: `direct`** — `ToolRegistry.execute` is an existing real entry point and can be called with registered tool definitions directly. Its missing validation makes the behavior observable without mocks or a new seam.

## Done when these pass

- [ ] **Reject schema violations safely** — Missing required properties, wrong types and enum mismatches return constraint details without input values, and never reach the executor.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Pass valid input through** — An undeclared extra property is preserved unchanged when valid input reaches the executor exactly once.
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **Resolve and compile schemas at the proper boundary** — Invalid static schemas fail at registration with the tool name, and dynamic schemas are current for every call.
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Make the registered schema govern the call before the executor runs.
- [ ] Return constraint failures as tool results and keep their text free of input values.
- [ ] Preserve valid input, including unlisted properties, unchanged.
- [ ] Validate each function-resolved schema and reject invalid static schemas at registration.

## Out of scope

- Unknown tool names continue to throw as before.
- Tool output validation, authorization, and retry limits are not part of this ticket.
- Documentation, changelog, dependency placement, tool-loop recovery, and exact static compilation counts need separate review or behavior-specific coverage beyond this direct registry red bar.