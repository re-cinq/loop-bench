I have completed the task of defining the acceptance tests for ticket #37.

### Summary of Changes

1.  **Created Specification**: Added `specs/hal-engine-tool-input-validation/spec.md` to define the new contract for tool input validation, including requirements for `ajv` integration, schema compilation at registration, and log redaction of sensitive values.
2.  **Added Acceptance Tests**: Created `src/orchestration/tools/registry.acceptance.test.ts` with 6 tests that exercise the `ToolRegistry` directly. These tests cover:
    *   Validation of missing required properties.
    *   Preservation of extra properties.
    *   Redaction of values in error messages.
    *   Registration-time schema validation.
    *   Dynamic schema validation for function-valued tools.
    *   Maintenance of existing `Unknown tool` errors.
3.  **Documented DoD**: Created `.lore/dod.md` specifying the `direct` strategy and linking to the new acceptance tests.

### Test Results

The tests were run using `npm test src/orchestration/tools/registry.acceptance.test.ts` and failed as expected because validation logic is not yet implemented:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry Input Validation (Acceptance) › validates input against schema and returns ToolResponse on failure ([validated by 1](specs/hal-engine-tool-input-validation/spec.md#L30))
    expect(received).toContain(expected)
    Expected substring: "location"
    Received string:    "ok"

  ● ToolRegistry Input Validation (Acceptance) › rejects wrong-typed fields without leaking the value ([validated by 2](specs/hal-engine-tool-input-validation/spec.md#L40))
    expect(received).toContain(expected)
    Expected substring: "count"
    Received string:    "ok"

  ● ToolRegistry Input Validation (Acceptance) › throws at registration time for invalid schemas ([validated by 2](specs/hal-engine-tool-input-validation/spec.md#L45))
    expect(received).toThrow(expected)
    Received function did not throw

  ● ToolRegistry Input Validation (Acceptance) › validates function-valued tools against current schema ([validated by 3](specs/hal-engine-tool-input-validation/spec.md#L46))
    expect(received).not.toBe(expected)
    Expected: not "ok"
```

The changes have been formatted, committed, and pushed to the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}