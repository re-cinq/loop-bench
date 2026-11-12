Red acceptance tests for Ticket #37 (`Validate tool input against the registered inputSchema`) are in `src/orchestration/tools/registry.acceptance.test.ts`, linked from `specs/hal-engine-tool-input-validation/spec.md`, and recorded in `.lore/dod.md` under strategy `direct`.

### Failure Output (`NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/tools/registry.acceptance.test.ts`)

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation acceptance › rejects malformed input without calling the executor or leaking field values

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 8

      Object {
        "logsLeakNumber": false,
        "logsLeakSecret": false,
    -   "missingNamesLocation": true,
    +   "missingNamesLocation": false,
        "receivedInputs": Array [
    +     Object {},
          Object {
    +       "location": 987654321,
    +       "unit": "secret-kelvin-token",
    +     },
    +     Object {
            "extraField": "preserved",
            "location": "Amsterdam",
            "unit": "celsius",
          },
        ],
        "resultLeaksNumber": false,
        "resultLeaksSecret": false,
        "validResult": "72F and sunny",
    -   "wrongTypeNamesLocation": true,
    -   "wrongTypeNamesString": true,
    +   "wrongTypeNamesLocation": false,
    +   "wrongTypeNamesString": false,
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:64:8)

  ● ToolRegistry inputSchema validation acceptance › throws at register time when a static inputSchema is uncompilable, naming the tool

    expect(received).toThrow(expected)

    Expected pattern: /broken_weather/

    Received function did not throw

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:86:7)

  ● ToolRegistry inputSchema validation acceptance › validates a function-valued tool definition against the schema returned for that call

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 4

    @@ -2,8 +2,11 @@
        "firstResult": "resolved",
        "receivedInputs": Array [
          Object {
            "city": "Amsterdam",
          },
    +     Object {
    +       "city": "Amsterdam",
    +     },
        ],
    -   "secondNamesPostalCode": true,
    +   "secondNamesPostalCode": false,
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:121:8)

  ● ToolRegistry inputSchema validation acceptance › delivers a validation rejection as a tool_result so a corrected retry succeeds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "receivedInputs": Array [
    +     Object {},
          Object {
            "location": "Amsterdam",
          },
        ],
    -   "rejectionNamesLocation": true,
    +   "rejectionNamesLocation": false,
        "reply": "It is sunny in Amsterdam.",
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:198:8)

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}