Defined the Definition of Done (`.lore/dod.md`), linked normative spec statements (`specs/hal-engine-tool-input-validation/spec.md`), and committed 4 failing acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts` using the `direct` strategy.

Failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation › rejects invalid input without invoking the executor or leaking values

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 4

      Object {
    -   "executorCalls": 0,
    -   "kelvinUnitsResult": StringMatching /^(?=.*units)(?=.*(?:enum|allowed))/is,
    +   "executorCalls": 3,
    +   "kelvinUnitsResult": "forecast",
        "leakedInputs": Array [],
    -   "numericLocationResult": StringMatching /^(?=.*location)(?=.*string)/is,
    -   "omittedLocationResult": StringMatching /^(?=.*location)(?=.*required)/is,
    +   "numericLocationResult": "forecast",
    +   "omittedLocationResult": "forecast",
      }

  ● ToolRegistry inputSchema validation › throws at registration time naming the tool when a static schema is invalid

    expect(received).toThrow(expected)

    Expected pattern: /broken_forecast/

    Received function did not throw

  ● ToolRegistry inputSchema validation › validates a function-valued tool definition against each call current schema

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "executorCalls": 1,
    +   "executorCalls": 2,
        "firstText": "looked up Amsterdam",
    -   "secondText": StringMatching /^(?=.*postalCode)(?=.*required)/is,
    +   "secondText": "looked up Amsterdam",
      }

  ● ToolRegistry inputSchema validation › feeds a schema rejection back to the model so a retry succeeds with extra keys intact

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "receivedInputs": Array [
    +     Object {},
          Object {
            "city": "Berlin",
            "requestTag": "trace-7",
          },
        ],
    -   "rejectionSeenByModel": StringMatching /^(?=.*city)(?=.*required)/is,
    +   "rejectionSeenByModel": "Station in undefined",
        "reply": "Berlin Tempelhof station",
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}