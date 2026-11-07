I have defined the **Definition of Done** for ticket #37 by creating executable acceptance tests that confirm the absence of tool input validation. These tests fail on the current branch as expected, providing a clear red bar for the next round of implementation.

### Strategy: `direct`
The `ToolRegistry` is a standalone component that can be tested directly. I have added comprehensive tests covering schema validation, performance (caching/compilation), and safety (redaction of sensitive values in errors and logs). I also included an orchestrator-level test to verify that the model can recover from validation failures returned as tool results.

### Acceptance Tests Failure Output
```text
FAIL src/orchestration/tools/ToolInputValidation.acceptance.test.ts
  ● ToolRegistry Input Validation (Acceptance) › rejects missing required fields and does not call the executor
    expect(received).toContain(expected) // indexOf
    Expected substring: "location"
    Received string:    "ok"
  ● ToolRegistry Input Validation (Acceptance) › rejects wrong-typed fields and redacts values in result and logs
    expect(received).toContain(expected) // indexOf
    Expected substring: "count"
    Received string:    "ok"
  ● ToolRegistry Input Validation (Acceptance) › throws during registration for broken schemas
    expect(received).toThrow(expected)
    Expected pattern: /broken-tool/
    Received function did not throw
  ● ToolRegistry Input Validation (Acceptance) › compiles static tool schema once
    expect(received).toBeGreaterThan(expected)
    Expected: > 0
    Received:   0
  ● ToolRegistry Input Validation (Acceptance) › validates against the current schema for function-valued definitions
    expect(received).not.toBe(expected) // Object.is equality
    Expected: not "ok"

FAIL src/orchestration/chatOrchestrator-validation.acceptance.test.ts
  ● ChatOrchestrator Tool Input Validation (Acceptance) › allows model to recover from a rejected tool call
    expect(received).toBe(expected) // Object.is equality
    Expected: 1
    Received: 2
```

### Changes Made
- Created `.lore/dod.md` to track the ticket's progress and strategy.
- Created `src/orchestration/tools/ToolInputValidation.acceptance.test.ts` to pin `ToolRegistry` validation behavior.
- Created `src/orchestration/chatOrchestrator-validation.acceptance.test.ts` to pin orchestrator recovery behavior.
- Updated `specs/hal-engine-tool-input-validation/spec.md` with links to the new acceptance tests and corrected line numbers.
- Removed redundant placeholder test files to ensure the next round focuses exclusively on the new DoD suite.
- Formatted all modified files and verified spec link integrity.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}