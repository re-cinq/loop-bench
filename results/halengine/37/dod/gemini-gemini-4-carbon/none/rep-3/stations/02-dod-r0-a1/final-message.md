Defined the Definition of Done (`direct` strategy) in `.lore/dod.md`, added spec traceability links in `specs/hal-engine-tool-input-validation/spec.md`, and committed four red acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts`.

### Failure Output

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation › returns a schema rejection to the model so a corrected retry runs the executor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "finalReply": "Forecast ready",
        "receivedInputs": Array [
    +     Object {},
          Object {
            "location": "Berlin",
            "requestTag": "trace-9",
          },
        ],
    -   "rejectionNamedMissingField": true,
    +   "rejectionNamedMissingField": false,
        "retryToolResult": "18C and sunny",
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:50:8)

  ● ToolRegistry inputSchema validation › names the failing field and expected type while omitting values from result and logs

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 4

      Object {
    -   "executorRan": false,
    +   "executorRan": true,
        "leakedIdentifyingValue": false,
        "leakedOffendingValue": false,
    -   "namedFieldInLogs": true,
    -   "namedFieldInResult": true,
    -   "namedTypeInResult": true,
    +   "namedFieldInLogs": false,
    +   "namedFieldInResult": false,
    +   "namedTypeInResult": false,
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:102:8)

  ● ToolRegistry inputSchema validation › throws at registration time naming the tool when a static inputSchema is invalid

    expect(received).toThrow(expected)

    Expected substring: "broken_forecast"

    Received function did not throw

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:124:7)

  ● ToolRegistry inputSchema validation › validates each call against the schema a function-valued definition returns

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "acceptedModes": Array [
          "alpha",
    +     "alpha",
          "beta",
        ],
        "firstResult": "switched:alpha",
    -   "staleCallNamedField": true,
    +   "staleCallNamedField": false,
        "updatedResult": "switched:beta",
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:164:8)

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}