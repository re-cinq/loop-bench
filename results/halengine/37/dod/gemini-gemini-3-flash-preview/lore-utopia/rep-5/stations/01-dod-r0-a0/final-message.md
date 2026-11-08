I have defined the **Definition of Done** for ticket #37 and implemented the requested **acceptance tests**. I also created the technical specification for tool input validation and updated the existing documentation to match the new behavior.

The acceptance tests are located in `src/orchestration/tools/registry.acceptance.test.ts`. They are currently **failing** because the validation logic has not yet been implemented in the production code.

### Strategy: `direct`
The `ToolRegistry` is the central point for tool execution and already exists as a class. I have verified the behavior by calling its `execute` method directly in the acceptance tests.

### Acceptance Test Failures
```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry Input Validation (Acceptance) › returns a ToolResponse on validation failure and does not call executor
    expect(received).toMatch(expected)
    Expected pattern: /location/
    Received string:  "ok"

  ● ToolRegistry Input Validation (Acceptance) › rejects wrong-typed fields with a message naming the field and type but not the value
    expect(received).toMatch(expected)
    Expected pattern: /count/
    Received string:  "ok"

  ● ToolRegistry Input Validation (Acceptance) › throws at registration time for an uncompilable schema
    expect(received).toThrow(expected)
    Expected pattern: /broken-tool/
    Received function did not throw

  ● ToolRegistry Input Validation (Acceptance) › validates against the current schema for function-valued tool definitions
    expect(received).toMatch(expected)
    Expected pattern: /number/
    Received string:  "ok"

  ● ChatOrchestrator Integration (Acceptance) › drives a provider through a rejected tool call followed by a corrected retry
    expect(received).toBe(expected)
    Expected: "Retried successfully"
    Received: "Failed to find error message"
```

### Changes Made
- Created `.lore/dod.md` documenting the strategy and criteria.
- Created `src/orchestration/tools/registry.acceptance.test.ts` with 9 acceptance tests covering validation failure, property passthrough, PII redaction, schema compilation, and orchestrator integration.
- Created `specs/hal-engine-tool-input-validation/spec.md` defining the validation contract and providing anchors for the tests.
- Updated `.specify/spec.md`, `docs/adding-a-tool.md`, and `README.md` to reflect that tool input is now validated by the engine.
- Added a `CHANGELOG.md` entry for the upcoming version.

I attempted to add `ajv` to `package.json` dependencies, but this was blocked by policy. This change must be performed by the next round when implementing the production logic.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}