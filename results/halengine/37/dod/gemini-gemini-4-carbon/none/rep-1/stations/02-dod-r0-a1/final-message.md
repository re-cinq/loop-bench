Acceptance tests (`src/orchestration/tools/registry.acceptance.test.ts`), spec traceability citations (`specs/hal-engine-tool-input-validation/spec.md`), and the Definition of Done (`.lore/dod.md`) are committed and pushed under strategy `direct`.

Actual failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation acceptance › throws at registration time naming the tool for an invalid schema

    expect(received).toThrow(expected)

    Expected substring: "broken_lookup"

    Received function did not throw

      23 |     };
      24 |
    > 25 |     expect(() => registry.register(brokenDefinition, async () => 'unused')).toThrow('broken_lookup');
         |                                                                             ^
      26 |   });

  ● ToolRegistry input validation acceptance › rejects invalid input with path and constraint without leaking values

    expect(received).toEqual(expected) // deep equality

    - Expected  - 7
    + Received  + 7

      Object {
    -   "badEnumNamesConstraint": true,
    -   "badEnumNamesField": true,
    -   "executorCalls": 0,
    +   "badEnumNamesConstraint": false,
    +   "badEnumNamesField": false,
    +   "executorCalls": 3,
        "leakedSensitiveValue": false,
    -   "missingNamesConstraint": true,
    -   "missingNamesField": true,
    -   "wrongTypeNamesExpectedType": true,
    -   "wrongTypeNamesPath": true,
    +   "missingNamesConstraint": false,
    +   "missingNamesField": false,
    +   "wrongTypeNamesExpectedType": false,
    +   "wrongTypeNamesPath": false,
      }

  ● ToolRegistry input validation acceptance › validates each call against a function-valued definition current schema

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 4

      Object {
        "acceptedEnvironments": Array [
          "production",
    +     "staging",
    +     "production",
        ],
        "currentAcceptedResult": "deployed",
    -   "firstRejectedNamesField": true,
    -   "staleRejectedNamesField": true,
    +   "firstRejectedNamesField": false,
    +   "staleRejectedNamesField": false,
      }

  ● ToolRegistry input validation acceptance › returns schema rejections to the model and passes valid retries unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "executedInputs": Array [
    +     Object {},
          Object {
            "location": "Berlin",
            "traceId": "req-7",
          },
        ],
        "reply": "Forecast: 22C in Berlin",
    -   "roundTwoSawLocationRejection": true,
    +   "roundTwoSawLocationRejection": false,
      }

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}