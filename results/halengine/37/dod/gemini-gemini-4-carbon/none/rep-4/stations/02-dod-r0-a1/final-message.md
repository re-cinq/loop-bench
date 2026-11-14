Defined the executable Definition of Done (`direct` strategy) for `re-cinq/HALEngine#37` in `.lore/dod.md`, linked the specification statements in `specs/hal-engine-tool-input-validation/spec.md`, and verified all five acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts` fail against the current `ToolRegistry`:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation › enforces required and enum on execute while passing extra keys through unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 7

    @@ -1,9 +1,14 @@
      Object {
    -   "emptyMentionsLocationRequired": true,
    -   "enumMentionsUnits": true,
    +   "emptyMentionsLocationRequired": false,
    +   "enumMentionsUnits": false,
        "receivedInputs": Array [
    +     Object {},
    +     Object {
    +       "location": "Berlin",
    +       "units": "kelvin",
    +     },
          Object {
            "extraKey": "preserved",
            "location": "Berlin",
          },
        ],

      35 |       enumMentionsUnits: enumCall.result.includes('units'),
      36 |       validResult: validCall.result,
    > 37 |     }).toEqual({
         |        ^

  ● ToolRegistry inputSchema validation › names failing paths and expected types while redacting values from results and logs

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "executorCalls": 0,
    -   "identifyingNamesPathAndExpectedType": true,
    +   "executorCalls": 2,
    +   "identifyingNamesPathAndExpectedType": false,
        "leakedIdentifyingValue": false,
        "leakedNumericValue": false,
    -   "wrongTypeNamesPathAndExpectedType": true,
    +   "wrongTypeNamesPathAndExpectedType": false,
      }

      72 |       leakedNumericValue: combinedOutput.includes('987654321'),
      73 |       leakedIdentifyingValue: combinedOutput.includes('ssn-999-88-7777') || combinedOutput.includes('Amsterdam'),
    > 74 |     }).toEqual({
         |        ^

  ● ToolRegistry inputSchema validation › throws at registration time naming the tool when a static schema cannot be compiled

    expect(received).toThrow(expected)

    Expected substring: "broken_lookup"

    Received function did not throw

      93 |         async () => 'never'
      94 |       )
    > 95 |     ).toThrow('broken_lookup');
         |       ^

  ● ToolRegistry inputSchema validation › validates a function-valued tool definition against the schema current at each call

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 4

    @@ -2,12 +2,15 @@
        "executedInputs": Array [
          Object {
            "city": "Utrecht",
          },
          Object {
    +       "city": "Utrecht",
    +     },
    +     Object {
            "postalCode": "3511",
          },
        ],
        "firstResult": "matched",
    -   "staleMentionsPostalCode": true,
    +   "staleMentionsPostalCode": false,
        "updatedResult": "matched",
      }

      127 |       updatedResult: updatedCall.result,
      128 |       executedInputs,
    > 129 |     }).toEqual({
          |        ^

  ● ToolRegistry inputSchema validation › feeds a schema rejection back through the orchestrator loop so retry resolves

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "executedInputs": Array [
    +     Object {},
          Object {
            "location": "Berlin",
          },
        ],
    -   "providerSawRejectionForLocation": true,
    +   "providerSawRejectionForLocation": false,
        "reply": "It is 18C in Berlin.",
      }

      186 |       executedInputs,
      187 |       providerSawRejectionForLocation: secondRoundPayload.includes('location') && /required/i.test(secondRoundPayload),
    > 188 |     }).toEqual({
          |        ^

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}