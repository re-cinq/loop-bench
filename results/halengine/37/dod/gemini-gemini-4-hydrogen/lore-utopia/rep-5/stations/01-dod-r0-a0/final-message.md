Added the `direct` Definition of Done (`.lore/dod.md`), normative spec with inline citations (`specs/hal-engine-tool-input-validation/spec.md`), and five failing acceptance tests across `src/orchestration/tools/registry.acceptance.test.ts` and `src/orchestration/chatOrchestrator.acceptance.test.ts`, committed (`9a8bf70`) and pushed to `origin/loop-bench/37`.

### Red Acceptance Run Output

Command:
`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts`

```text
  ● ChatOrchestrator schema rejection retry acceptance › resolves after a rejected tool call by returning the validation error to the model and passing the retry unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 3

      Object {
        "executorInputs": Array [
    +     Object {},
          Object {
            "extraTag": "keep",
            "location": "Berlin",
          },
        ],
    -   "mentionsLocation": true,
    -   "mentionsRequired": true,
    +   "mentionsLocation": false,
    +   "mentionsRequired": false,
        "reply": "Forecast ready.",
      }

  ● ToolRegistry inputSchema validation acceptance › returns a ToolResponse naming the missing required property and does not invoke the executor

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "callCount": 0,
    -   "mentionsLocation": true,
    -   "mentionsRequired": true,
    +   "callCount": 1,
    +   "mentionsLocation": false,
    +   "mentionsRequired": false,
      }

  ● ToolRegistry inputSchema validation acceptance › rejects wrong-typed or disallowed-enum fields naming path and constraint without leaking values

    expect(received).toEqual(expected) // deep equality

    - Expected  - 5
    + Received  + 5

      Object {
    -   "callCount": 0,
    -   "enumNamesConstraint": true,
    -   "enumNamesField": true,
    +   "callCount": 2,
    +   "enumNamesConstraint": false,
    +   "enumNamesField": false,
        "leakedInEnumResult": false,
        "leakedInLogs": false,
        "leakedInTypeResult": false,
    -   "typeNamesExpected": true,
    -   "typeNamesField": true,
    +   "typeNamesExpected": false,
    +   "typeNamesField": false,
      }

  ● ToolRegistry inputSchema validation acceptance › throws synchronously at register time when inputSchema is uncompilable and names the tool

    expect(received).toThrow(expected)

    Expected pattern: /broken_tool/

    Received function did not throw

  ● ToolRegistry inputSchema validation acceptance › validates a function-valued ToolDefinitionSource against the schema current at each execute call

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 4

    @@ -3,11 +3,14 @@
        "receivedInputs": Array [
          Object {
            "city": "Paris",
          },
          Object {
    +       "city": "Paris",
    +     },
    +     Object {
            "postalCode": "75001",
          },
        ],
    -   "secondNamesPostalCode": true,
    +   "secondNamesPostalCode": false,
        "thirdSucceeded": true,
      }

Test Suites: 2 failed, 2 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}