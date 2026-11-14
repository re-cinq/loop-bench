Red acceptance tests (`src/orchestration/tools/registry.acceptance.test.ts`), spec citations (`specs/hal-engine-tool-input-validation/spec.md`), and `.lore/dod.md` (strategy: `direct`) are committed and pushed to `origin/loop-bench/37`.

Failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation › rejects input violating required or enum without calling the executor, while passing valid extra keys through unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 7

      Object {
    -   "missingNamesLocation": true,
    +   "missingNamesLocation": false,
        "receivedInputs": Array [
    +     Object {},
          Object {
            "location": "Berlin",
    +       "units": "kelvin",
    +     },
    +     Object {
    +       "location": "Berlin",
            "requestTag": "keep-me",
          },
        ],
        "validResult": "weather:Berlin",
    -   "wrongEnumNamesUnits": true,
    +   "wrongEnumNamesUnits": false,
      }

  ● ToolRegistry inputSchema validation › names the failing field and expected type on a type mismatch without exposing input values in the result or logs

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "executorCalls": 0,
    +   "executorCalls": 1,
        "leakedEmail": false,
        "leakedOffendingValue": false,
    -   "namesExpectedType": true,
    -   "namesField": true,
    +   "namesExpectedType": false,
    +   "namesField": false,
      }

  ● ToolRegistry inputSchema validation › throws at registration time naming the tool when a static inputSchema cannot be compiled

    expect(received).toThrow(expected)

    Expected pattern: /broken_weather/

    Received function did not throw

  ● ToolRegistry inputSchema validation › validates a function-valued tool definition against the schema returned for each call rather than a stale one

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "executorCalls": 1,
    +   "executorCalls": 2,
        "firstResult": "located",
    -   "secondNamesPostalCode": true,
    +   "secondNamesPostalCode": false,
      }

  ● ToolRegistry inputSchema validation › returns a validation failure as a tool_result so the next orchestrator round can correct the call and resolve

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "executorCalls": 1,
    -   "rejectionSeenByModel": true,
    +   "executorCalls": 2,
    +   "rejectionSeenByModel": false,
        "reply": "It is Sunny in Berlin.",
      }

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}