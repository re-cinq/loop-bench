Defined the Definition of Done for ticket #37 (`direct` strategy) with four failing acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts`, the specification in `specs/hal-engine-tool-input-validation/spec.md`, and `.lore/dod.md`, committed (`b46ae5a`) and pushed to `origin/loop-bench/37`.

Acceptance test run (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`):

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation acceptance › rejects malformed tool input with a ToolResponse naming the failing path and constraint without invoking the executor or leaking values

    expect(received).toEqual(expected) // deep equality

    - Expected  - 5
    + Received  + 5

      Object {
    -   "coercionNamesCountAndNumber": true,
    -   "enumNamesUnitsAndConstraint": true,
    -   "executorCalls": 0,
    +   "coercionNamesCountAndNumber": false,
    +   "enumNamesUnitsAndConstraint": false,
    +   "executorCalls": 4,
        "leakedValues": Array [],
    -   "missingNamesLocationAndRequired": true,
    -   "typeNamesLocationAndString": true,
    +   "missingNamesLocationAndRequired": false,
    +   "typeNamesLocationAndString": false,
      }

  ● ToolRegistry inputSchema validation acceptance › throws synchronously at register time when a static inputSchema is uncompilable and names the tool

    expect(received).toThrow(expected)

    Expected pattern: /broken_schema_tool/

    Received function did not throw

  ● ToolRegistry inputSchema validation acceptance › validates a function-valued ToolDefinitionSource against the schema current at each execute call

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "executorCalls": 2,
    +   "executorCalls": 3,
        "firstResult": "ok",
        "freshResult": "ok",
    -   "staleNamesBetaAndRequired": true,
    +   "staleNamesBetaAndRequired": false,
      }

  ● ToolRegistry inputSchema validation acceptance › drives a rejected tool call through chatOrchestrator to a corrected retry without stripping extra properties or applying defaults

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "receivedInputs": Array [
    +     Object {},
          Object {
            "extraTag": "keep-me",
            "location": "Berlin",
          },
        ],
    -   "rejectionNamesLocationAndRequired": true,
    +   "rejectionNamesLocationAndRequired": false,
        "reply": "Sunny in Berlin",
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}