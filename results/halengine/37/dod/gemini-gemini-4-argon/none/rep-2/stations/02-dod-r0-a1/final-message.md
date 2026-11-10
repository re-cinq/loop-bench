Acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts`, spec links in `specs/hal-engine-tool-input-validation/spec.md`, and `.lore/dod.md` are committed and pushed to `origin/loop-bench/37`.

### Red Bar Output

Running `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation acceptance › rejects input missing a required property with a ToolResponse naming the property and without invoking the executor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "clientMessages": undefined,
    -   "executorCalls": 0,
    -   "namesProperty": true,
    -   "namesRequired": true,
    +   "executorCalls": 1,
    +   "namesProperty": false,
    +   "namesRequired": false,
        "suppressAssistantResponse": undefined,
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:63:8)

  ● ToolRegistry inputSchema validation acceptance › rejects a wrong-typed property naming the field path and expected type without leaking any input value in the result or logs

    expect(received).toEqual(expected) // deep equality

    - Expected  - 10
    + Received  +  4

      Object {
    -   "executorCalls": 0,
    +   "executorCalls": 1,
        "leaksTokenInLogs": false,
        "leaksTokenInResult": false,
        "leaksWrongValueInLogs": false,
        "leaksWrongValueInResult": false,
    -   "namesField": true,
    -   "namesType": true,
    -   "warnLogged": Array [
    -     Object {
    -       "category": "tool",
    -       "hasErrorCount": true,
    -       "tool": "weather",
    -     },
    -   ],
    +   "namesField": false,
    +   "namesType": false,
    +   "warnLogged": Array [],
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:104:8)

  ● ToolRegistry inputSchema validation acceptance › throws at register time when a static tool schema cannot be compiled, naming the tool

    expect(received).toMatch(expected)

    Expected pattern: /broken_weather/
    Received string:  "did not throw"

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:128:20)

  ● ToolRegistry inputSchema validation acceptance › validates a function-valued tool definition against the schema resolved for each call

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
    -   "executorCalls": 1,
    +   "executorCalls": 2,
        "firstResult": "ok:Paris",
    -   "secondNamesCountry": true,
    +   "secondNamesCountry": false,
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:165:8)

  ● ToolRegistry inputSchema validation acceptance › returns a schema rejection to the model in the orchestrator tool loop and forwards valid input unchanged on retry

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "receivedInputs": Array [
    +     Object {},
          Object {
            "extraNote": "keep-me",
            "location": "Paris",
          },
        ],
        "reply": "Forecast: Sunny in Paris",
    -   "roundOneRejectionNamesLocation": true,
    +   "roundOneRejectionNamesLocation": false,
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:225:8)

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}