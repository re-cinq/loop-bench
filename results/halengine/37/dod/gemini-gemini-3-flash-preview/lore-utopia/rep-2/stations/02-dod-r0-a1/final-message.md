I have defined the **Definition of Done** for ticket #37 by implementing two new acceptance test files that verify tool input validation through the code's real entry points (`ToolRegistry.execute` and `ChatOrchestrator.processMessage`).

I identified that some partial tests existed but were incomplete and failing for the wrong reasons. I replaced them with a comprehensive set of tests covering all acceptance criteria, including schema validation, extra property handling, redacted error messages, compilation caching, and model recovery in the tool loop.

I also updated the system documentation (`README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`) and the technical spec (`specs/hal-engine-tool-input-validation/spec.md`) to reflect the new validation contract and linked the test cases to their corresponding requirements.

### Acceptance Test Failures

The following red bar confirms that the behavior is currently absent:

```text
FAIL src/orchestration/tools/toolValidation.acceptance.test.ts
  ● ToolRegistry Input Validation (acceptance) › validates input against schema and returns ToolResponse on failure
    expect(received).toMatch(expected)
    Expected pattern: /location/
    Received string:  "ok"

  ● ToolRegistry Input Validation (acceptance) › rejects wrong-typed fields with descriptive, redacted messages
    expect(received).toMatch(expected)
    Expected pattern: /age/
    Received string:  "ok"

  ● ToolRegistry Input Validation (acceptance) › throws at registration time for uncompilable schemas
    expect(received).toThrow(expected)
    Expected pattern: /bad_tool/
    Received function did not throw

FAIL src/orchestration/chatValidation.acceptance.test.ts
  ● ChatOrchestrator tool loop validation recovery (acceptance) › tool loop handles rejected call and corrected retry
    expect(received).toEqual(expected) // deep equality
    - Expected  - 3
    + Received  + 1
    - Object {
    -   "location": "Berlin",
    - }
    + Object {}
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}