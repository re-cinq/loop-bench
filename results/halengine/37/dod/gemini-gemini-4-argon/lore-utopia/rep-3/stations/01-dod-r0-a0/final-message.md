Added the Definition of Done (`.lore/dod.md`), normative specification (`specs/hal-engine-tool-input-validation/spec.md`), and red acceptance tests (`src/orchestration/tools/registry.acceptance.test.ts`) for Ticket #37.

### Red Test Output

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation › rejects a call missing a required field with a ToolResponse and never invokes the executor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "calls": 0,
    -   "mentionsLocation": true,
    +   "calls": 1,
    +   "mentionsLocation": false,
      }

      35 |     const response = await registry.execute('get_weather', {});
      36 |
    > 37 |     expect({calls, mentionsLocation: response.result.includes('location')}).toEqual({
         |                                                                             ^
      38 |       calls: 0,
      39 |       mentionsLocation: true,
      40 |     });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:37:77)

  ● ToolRegistry input validation › rejects a wrong-typed field without leaking the offending value in the response or logs, and passes valid input with extra properties unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 6

    @@ -1,13 +1,17 @@
      Object {
        "acceptedResult": "ok",
        "leakedNumberInResult": false,
        "leakedSecretInLogs": false,
        "leakedSecretInResult": false,
    -   "mentionsLocation": true,
    -   "mentionsString": true,
    +   "mentionsLocation": false,
    +   "mentionsString": false,
        "received": Array [
    +     Object {
    +       "location": 12345,
    +       "units": "secret-ssn-999-00-1234",
    +     },
          Object {
            "extraKey": "kept",
            "location": "Berlin",
          },
        ],

      66 |       leakedSecretInResult: rejected.result.includes(secretValue),
      67 |       leakedSecretInLogs: logged.some(line => line.includes(secretValue) || line.includes('12345')),
    > 68 |     }).toEqual({
         |        ^
      69 |       received: [{location: 'Berlin', extraKey: 'kept'}],
      70 |       acceptedResult: 'ok',
      71 |       mentionsLocation: true,

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:68:8)

  ● ToolRegistry input validation › throws at register time naming the tool for an uncompilable static schema and validates function-valued definitions against the current call schema

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
        "firstResult": "dynamic-ok",
    -   "staleMentionsSecond": true,
    -   "threwWithName": true,
    +   "staleMentionsSecond": false,
    +   "threwWithName": false,
        "updatedResult": "dynamic-ok",
      }

      117 |       staleMentionsSecond: staleCall.result.includes('second_key'),
      118 |       updatedResult: updatedCall.result,
    > 119 |     }).toEqual({
          |        ^
      120 |       threwWithName: true,
      121 |       firstResult: 'dynamic-ok',
      122 |       staleMentionsSecond: true,

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:119:8)

  ● ToolRegistry input validation › returns the schema rejection to the model as a tool_result on the next round so the orchestrator loop recovers on retry

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
    -   "rejectionReachedModel": true,
    +   "rejectionReachedModel": false,
        "reply": "It is 18C in Berlin.",
      }

      178 |       reply,
      179 |       rejectionReachedModel: firstRejectionText.includes('location'),
    > 180 |     }).toEqual({
          |        ^
      181 |       reply: 'It is 18C in Berlin.',
      182 |       rejectionReachedModel: true,
      183 |     });

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:180:8)

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}