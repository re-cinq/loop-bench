I have defined the **Definition of Done** for ticket #37 and implemented the requested acceptance tests.

### Strategy: `direct`
The `ToolRegistry` and `ChatOrchestrator` are public entry points that allow observing the new validation behavior directly. I have added two new acceptance test files:
1. `src/orchestration/tools/registry.acceptance.test.ts`: Validates that `ToolRegistry.execute` correctly uses JSON Schema to reject malformed input, redacts values in error messages, allows extra properties, and handles both static and dynamic tool definitions.
2. `src/orchestration/chatOrchestrator.acceptance.test.ts`: Validates that `ChatOrchestrator` correctly drives a retry loop when a tool call is rejected by the registry, allowing the AI model to correct its input.

### Acceptance Test Failures
The tests currently fail because the validation logic is absent in `ToolRegistry.execute`. Below is the failure output from the `ToolRegistry` tests (representative of the missing behavior):

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry validation acceptance › validates input against schema and returns ToolResponse on failure

    expect(received).toContain(expected) // indexOf

    Expected substring: "location"
    Received string:    "success"

  ● ToolRegistry validation acceptance › never calls the executor if validation fails

    expect(jest.fn()).not.toHaveBeenCalled()

    Expected number of calls: 0
    Received number of calls: 1

  ● ToolRegistry validation acceptance › throws at registration time for an uncompilable schema

    expect(received).toThrow(expected)

    Expected pattern: /bad-tool/

    Received function did not throw
```

And the `ChatOrchestrator` failure showing the executor being called twice (once for the invalid call that should have been rejected, and once for the valid retry) instead of only once:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator validation recovery acceptance › drives a retry loop through a rejected tool call

    expect(jest.fn()).toHaveBeenCalledTimes(expected)

    Expected number of calls: 1
    Received number of calls: 2
```

I have also updated `specs/hal-engine-tool-input-validation/spec.md` with the corresponding `([validated by ...])` links.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}