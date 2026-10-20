Red acceptance tests for #37 are in `src/orchestration/tools/registry.acceptance.test.ts`, linked from `specs/hal-engine-tool-input-validation/spec.md`, with the triage recorded in `.lore/dod.md`.

Failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation acceptance › rejects input missing a required property with a ToolResponse and never calls the executor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "executorCalls": 0,
    -   "mentionsRequiredField": true,
    +   "executorCalls": 1,
    +   "mentionsRequiredField": false,
      }

  ● ToolRegistry inputSchema validation acceptance › rejects a wrong-typed property naming the field and expected type without leaking the offending value to the result or logs

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "executorCalls": 0,
    +   "executorCalls": 1,
        "leaksValueInLogs": false,
        "leaksValueInResult": false,
    -   "mentionsExpectedType": true,
    -   "mentionsField": true,
    +   "mentionsExpectedType": false,
    +   "mentionsField": false,
      }

  ● ToolRegistry inputSchema validation acceptance › throws at register time naming the tool when a static inputSchema cannot be compiled

    expect(received).toThrow(expected)

    Expected pattern: /broken_weather/

    Received function did not throw

  ● ToolRegistry inputSchema validation acceptance › returns a schema rejection as a tool_result in the orchestrator loop so the model can correct the call on the next round

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "executorInputs": Array [
    +     Object {},
          Object {
            "location": "Paris",
          },
        ],
    -   "firstAttemptRejectedForLocation": true,
    +   "firstAttemptRejectedForLocation": false,
        "reply": "22C in Paris",
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}