Defined the Definition of Done for `#37` (`direct` strategy) in `.lore/dod.md`, linked the normative contract in `specs/hal-engine-tool-input-validation/spec.md`, and committed four failing acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts` (`7e122e4`, pushed to `origin/loop-bench/37`).

### Red-bar failure output (`NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`)

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation › throws at registration time naming the tool when a static inputSchema cannot be compiled

    expect(received).toThrow(expected)

    Expected substring: "broken_weather"

    Received function did not throw

      23 |         async () => 'unreachable'
      24 |       )
    > 25 |     ).toThrow('broken_weather');
         |       ^

  ● ToolRegistry inputSchema validation › rejects a wrong-typed field naming the path and expected type without calling the executor or leaking input values

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "calls": 0,
    +   "calls": 1,
        "leaksIdentifyingValue": false,
        "leaksOffendingValue": false,
    -   "namesExpectedType": true,
    -   "namesField": true,
    +   "namesExpectedType": false,
    +   "namesField": false,
      }

  ● ToolRegistry inputSchema validation › validates a function-valued tool definition against the schema returned on each call

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "calls": 1,
    +   "calls": 2,
        "firstResult": "applied:celsius",
    -   "secondNamesField": true,
    +   "secondNamesField": false,
      }

  ● ToolRegistry inputSchema validation › returns a missing-required-field rejection to the model so a retry with extra properties succeeds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "receivedInputs": Array [
    +     Object {},
          Object {
            "location": "Berlin",
            "traceId": "req-42",
          },
        ],
    -   "rejectionNamesRequiredField": true,
    +   "rejectionNamesRequiredField": false,
        "reply": "Sunny in Berlin",
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}