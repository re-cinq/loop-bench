### Definition of Done for Ticket #37

Triage strategy: **`direct`**

The acceptance tests are defined in `src/orchestration/tools/registry.acceptance.test.ts` and cited in `specs/hal-engine-tool-input-validation/spec.md`. The Definition of Done is documented in `.lore/dod.md`.

### Test Execution Output

```
> @re-cinq/hal-engine@0.3.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts

  console.log
    {"severity":"INFO","message":"executing","timestamp":"2026-11-09T09:00:00.662Z","category":"tool","data":{"name":"get_weather","inputKeys":[]}}

      at emit (src/shared/logger.ts:32:52)

  console.log
    {"severity":"INFO","message":"execution complete","timestamp":"2026-11-09T09:00:00.674Z","category":"tool","data":{"name":"get_weather","rawType":"string","clientMessageCount":0,"clientMessageTypes":[],"suppressAssistantResponse":false}}

      at emit (src/shared/logger.ts:32:52)

  console.log
    {"severity":"INFO","message":"executing","timestamp":"2026-11-09T09:00:00.678Z","category":"tool","data":{"name":"get_weather","inputKeys":["location"]}}

      at emit (src/shared/logger.ts:32:52)

  console.log
    {"severity":"INFO","message":"execution complete","timestamp":"2026-11-09T09:00:00.679Z","category":"tool","data":{"name":"get_weather","rawType":"string","clientMessageCount":0,"clientMessageTypes":[],"suppressAssistantResponse":false}}

      at emit (src/shared/logger.ts:32:52)

FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation acceptance › returns a rejection ToolResponse describing the missing required property without invoking the executor

    expect(received).toMatchObject(expected)

    - Expected  - 2
    + Received  + 2

      Object {
    -   "calls": 0,
    +   "calls": 1,
        "response": Object {
    -     "result": StringMatching /location.*required|required.*location/i,
    +     "result": "{\"forecast\":\"sunny\"}",
        },
      }

      27 |     const response = await registry.execute('get_weather', {});
      28 |
    > 29 |     expect({response, calls}).toMatchObject({
         |                               ^
      30 |       response: {
      31 |         result: expect.stringMatching(/location.*required|required.*location/i),
      32 |       },

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:29:31)

  ● ToolRegistry input validation acceptance › rejects wrong-typed input with a message naming the field and expected type without leaking the offending value

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "calls": 0,
    -   "leaksOffendingValue": false,
    -   "mentionsExpectedType": true,
    +   "calls": 1,
    +   "leaksOffendingValue": true,
    +   "mentionsExpectedType": false,
        "mentionsField": true,
      }

      65 |       mentionsExpectedType: response.result.toLowerCase().includes('string'),
      66 |       leaksOffendingValue: response.result.includes(String(secretLocationId)),
    > 67 |     }).toEqual({
         |        ^
      68 |       calls: 0,
      69 |       mentionsField: true,
      70 |       mentionsExpectedType: true,

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:67:8)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
Snapshots:   0 total
Time:        0.202 s, estimated 1 s
Ran all test suites matching src/orchestration/tools/registry.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}