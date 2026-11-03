Perfect! I've completed the acceptance test definitions for ticket #37. Here's a summary:

## Acceptance Tests Created

I've written **10 acceptance tests** in two files:

### `src/orchestration/tools/registry.acceptance.test.ts` (9 tests)
1. **rejects input missing a required field and does not call the executor** — Validates that missing required fields prevent executor invocation
2. **passes through valid input with unlisted extra properties unchanged** — Validates that validation doesn't coerce or add defaults
3. **rejects input with wrong type and does not include the value in the error message** — Validates type checking and error message redaction
4. **throws at register time for an uncompilable schema** — Validates fail-fast for broken schemas
5. **compiles a static tool schema once across multiple execute calls** — Validates schema compilation efficiency
6. **validates function-valued schemas against the current call version** — Validates per-call re-evaluation of dynamic schemas
7. **still throws Unknown tool for unregistered tool names** — Validates existing behavior is unchanged
8. **does not include property values in error messages** — Validates rejection message redaction
9. **rejects input with a value not in the enum and does not include the value in the message** — Validates enum constraint enforcement

### `src/orchestration/chatOrchestrator.test.ts` (1 test)
10. **passes a tool validation rejection to the model as a tool result on the next round** — Validates end-to-end that rejected tool calls return a ToolResponse the model can see and correct

## Test Failure Output

The tests deliberately fail because input validation is not yet implemented:

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation › basic validation › rejects input missing a required field and does not call the executor

    expect(received).toBe(expected) // Object.is equality
    Expected: false
    Received: true

  ● ToolRegistry input validation › basic validation › rejects input with wrong type and does not include the value in the error message

    expect(received).toBe(expected) // Object.is equality
    Expected: false
    Received: true

  ● ToolRegistry input validation › schema compilation › throws at register time for an uncompilable schema

    expect(received).toThrow()
    Received function did not throw

  ● ToolRegistry input validation › schema compilation › validates function-valued schemas against the current call version

    expect(received).toContain(expected) // indexOf
    Expected substring: "field_v2"
    Received string: "ok"

  ● ToolRegistry input validation › error cases › does not include property values in error messages

    expect(received).toContain(expected) // indexOf
    Expected substring: "api_key"
    Received string: "ok"

  ● ToolRegistry input validation › enum validation › rejects input with a value not in the enum and does not include the value in the message

    expect(received).toBe(expected) // Object.is equality
    Expected: false
    Received: true

Tests: 6 failed, 3 passed, 9 total
```

And for the orchestrator test:
```
FAIL src/orchestration/chatOrchestrator.test.ts
  ● ChatOrchestrator tool loop › passes a tool validation rejection to the model as a tool result on the next round

    expect(received).toBe(expected) // Object.is equality
    Expected: 1
    Received: 2
```

The tests fail for the RIGHT reasons — the executor is being called even with invalid input, no validation error responses are being returned, and no schema compilation happens at register time.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}