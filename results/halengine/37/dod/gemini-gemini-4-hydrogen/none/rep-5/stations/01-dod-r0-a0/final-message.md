Added 5 failing acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts`, linked them from `specs/hal-engine-tool-input-validation/spec.md`, and recorded the triage (`direct`) in `.lore/dod.md`. Committed (`8f55155`) and pushed to `origin/loop-bench/37` (up to date with `origin/main`, working tree clean).

### Acceptance test run output (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`)

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation › returns a rejection ToolResponse naming missing required fields before running the executor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "executorCalls": 0,
    -   "mentionsRequired": true,
    -   "namesLocation": true,
    +   "executorCalls": 1,
    +   "mentionsRequired": false,
    +   "namesLocation": false,
      }

  ● ToolRegistry input validation › rejects type and enum violations without leaking offending or identifying values in results or logs

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 4

      Object {
    -   "enumNamesUnits": true,
    -   "executorCalls": 0,
    +   "enumNamesUnits": false,
    +   "executorCalls": 2,
        "leakedEnumInLogs": false,
        "leakedEnumInResult": false,
        "leakedNumberInLogs": false,
        "leakedNumberInResult": false,
        "leakedSsnInLogs": false,
        "leakedSsnInResult": false,
    -   "typeNamesExpectedString": true,
    -   "typeNamesLocation": true,
    +   "typeNamesExpectedString": false,
    +   "typeNamesLocation": false,
      }

  ● ToolRegistry input validation › throws at register time naming the tool when its inputSchema cannot compile

    expect(received).toThrow(expected)

    Expected pattern: /broken_weather/

    Received function did not throw

  ● ToolRegistry input validation › re-validates a function-valued tool definition against the current schema on each call

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "executorCalls": 1,
    +   "executorCalls": 2,
        "firstResult": "ok",
    -   "secondMentionsRequired": true,
    -   "secondNamesCountry": true,
    +   "secondMentionsRequired": false,
    +   "secondNamesCountry": false,
      }

  ● ToolRegistry input validation › feeds validation rejections back to the model for retry and passes valid input with extra fields unmodified

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 6

      Object {
        "receivedInputs": Array [
          Object {
    +       "days": "3",
    +       "location": "Berlin",
    +     },
    +     Object {
            "days": 3,
            "extraNote": "keep-me",
            "location": "Berlin",
          },
        ],
        "reply": "Forecast ready",
    -   "roundTwoSawDays": true,
    -   "roundTwoSawNumber": true,
    +   "roundTwoSawDays": false,
    +   "roundTwoSawNumber": false,
      }

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}