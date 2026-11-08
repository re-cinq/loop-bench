I have defined the **Definition of Done** for ticket #37 by creating a new specification file and a suite of acceptance tests that exercise the requested behavior.

I created `specs/hal-engine-tool-input-validation/spec.md` to define the contract for tool input validation, including schema enforcement, value redaction in errors, and recovery in the orchestration loop.

The acceptance tests are implemented in:
- `src/orchestration/tools/registry.acceptance.test.ts`: Verifies `ToolRegistry` correctly validates input, rejects malformed calls, redacts sensitive values, and handles schema compilation/dynamic definitions.
- `src/orchestration/chatOrchestrator.acceptance.test.ts`: Verifies the end-to-end recovery where the orchestrator feeds a validation failure back to the model, which then retries with valid input.

All tests currently fail as expected because the validation logic has not yet been implemented.

### Failure Output

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry Input Validation (Acceptance) › rejects missing required field ([validated by specs/hal-engine-tool-input-validation/spec.md#L14], [validated by specs/hal-engine-tool-input-validation/spec.md#L17])
    expect(received).toContain(expected) // indexOf
    Expected substring: "location"
    Received string:    "success"

  ● ToolRegistry Input Validation (Acceptance) › rejects wrong-typed field and names the field path and expected type ([validated by specs/hal-engine-tool-input-validation/spec.md#L14])
    expect(received).toContain(expected) // indexOf
    Expected substring: "count"
    Received string:    "success"

  ● ToolRegistry Input Validation (Acceptance) › throws at registration time for an uncompilable schema ([validated by specs/hal-engine-tool-input-validation/spec.md#L24])
    expect(received).toThrow(expected)
    Expected pattern: /bad_tool/
    Received function did not throw

  ● ToolRegistry Input Validation (Acceptance) › validates against the current schema for function-valued tool definitions ([validated by specs/hal-engine-tool-input-validation/spec.md#L25])
    expect(received).toContain(expected) // indexOf
    Expected substring: "second"
    Received string:    "success"

  ● ToolRegistry Input Validation (Acceptance) › redacts input values from rejection messages ([validated by specs/hal-engine-tool-input-validation/spec.md#L18])
    expect(received).toContain(expected) // indexOf
    Expected substring: "id"
    Received string:    "success"

FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator Tool Loop Recovery (Acceptance) › drives a provider through a rejected tool call followed by a corrected retry ([validated by specs/hal-engine-tool-input-validation/spec.md#L29])
    expect(jest.fn()).toHaveBeenCalledTimes(expected)
    Expected number of calls: 1
    Received number of calls: 2
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}