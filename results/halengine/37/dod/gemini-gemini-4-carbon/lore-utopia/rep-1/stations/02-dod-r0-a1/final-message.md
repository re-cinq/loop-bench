Defined the Definition of Done (`.lore/dod.md`), specification statements and inline traceability links (`specs/hal-engine-tool-input-validation/spec.md`), and failing acceptance tests (`src/orchestration/tools/registry.acceptance.test.ts`) for **re-cinq/HALEngine#37** using the `direct` strategy.

### Red-bar test failure output

Command run: `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation acceptance › rejects wrong-typed input without running executor or leaking values

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "executorCalls": 0,
    +   "executorCalls": 1,
        "leaksCustomerEmail": false,
        "leaksOffendingValue": false,
    -   "mentionsExpectedType": true,
    -   "mentionsField": true,
    +   "mentionsExpectedType": false,
    +   "mentionsField": false,
      }

      51 |       leaksOffendingValue: observedText.includes('987654'),
      52 |       leaksCustomerEmail: observedText.includes('alice-private@example.org'),
    > 53 |     }).toEqual({
         |        ^
      54 |       executorCalls: 0,
      55 |       mentionsField: true,
      56 |       mentionsExpectedType: true,

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:53:8)

  ● ToolRegistry inputSchema validation acceptance › throws naming the tool when registering an uncompilable static schema

    expect(received).toThrow(expected)

    Expected pattern: /brokenForecast/

    Received function did not throw

      75 |         async () => 'unreachable'
      76 |       )
    > 77 |     ).toThrow(/brokenForecast/);
         |       ^
      78 |   });
      79 |
      80 |   it('validates against dynamic schemas while preserving extra input keys', async () => {

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:77:7)

  ● ToolRegistry inputSchema validation acceptance › validates against dynamic schemas while preserving extra input keys

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 5

    @@ -3,8 +3,12 @@
        "receivedInputs": Array [
          Object {
            "traceId": "req-7",
            "units": "fahrenheit",
          },
    +     Object {
    +       "traceId": "req-8",
    +       "units": "fahrenheit",
    +     },
        ],
    -   "rejectedMentionsUnits": true,
    +   "rejectedMentionsUnits": false,
      }

      109 |       acceptedResult,
      110 |       rejectedMentionsUnits: rejectedResult.includes('units'),
    > 111 |     }).toEqual({
          |        ^
      112 |       receivedInputs: [{units: 'fahrenheit', traceId: 'req-7'}],
      113 |       acceptedResult: '20 degrees',
      114 |       rejectedMentionsUnits: true,

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:111:8)

  ● ToolRegistry inputSchema validation acceptance › returns missing-required rejections in the tool loop so retries resolve

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "executedInputs": Array [
    +     Object {},
          Object {
            "location": "Amsterdam",
          },
        ],
    -   "firstMentionsLocation": true,
    +   "firstMentionsLocation": false,
        "reply": "Forecast: Sunny in Amsterdam",
        "secondToolResult": "Sunny in Amsterdam",
      }

      177 |       firstMentionsLocation: firstToolResult.includes('location'),
      178 |       secondToolResult,
    > 179 |     }).toEqual({
          |        ^
      180 |       reply: 'Forecast: Sunny in Amsterdam',
      181 |       executedInputs: [{location: 'Amsterdam'}],
      182 |       firstMentionsLocation: true,

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:179:8)

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}