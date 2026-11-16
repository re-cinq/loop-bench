Defined the Definition of Done for `#37` under the **`direct`** strategy using `ToolRegistry` (`src/orchestration/tools/registry.ts`) and `createChatOrchestrator` (`src/orchestration/chatOrchestrator.ts`):

- Added 5 acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts`
- Added `specs/hal-engine-tool-input-validation/spec.md` (`Status: In Progress`) citing each acceptance test
- Recorded the DoD in `.lore/dod.md` and pushed commit `78d1373` to `origin/loop-bench/37` (already up to date with `origin/main`)

Actual failure output from `NODE_OPTIONS="--experimental-vm-modules" npx jest --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`:

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation acceptance › throws at registration when a static inputSchema fails to compile, naming the tool

    expect(received).toThrow(expected)

    Expected substring: "broken_tool"

    Received function did not throw

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:23:73)

  ● ToolRegistry inputSchema validation acceptance › rejects schema-invalid input without calling the executor and without leaking input values

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "executorCalls": 0,
    +   "executorCalls": 1,
        "leakedInLogs": false,
        "leakedInResult": false,
    -   "namesExpectedType": true,
    -   "namesFailingPath": true,
    +   "namesExpectedType": false,
    +   "namesFailingPath": false,
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:52:8)

  ● ToolRegistry inputSchema validation acceptance › validates dynamic tool definitions against the current schema and passes unlisted properties through unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 6

    @@ -3,9 +3,14 @@
          Object {
            "extraTag": "keep-me",
            "location": "Berlin",
            "units": "celsius",
          },
    +     Object {
    +       "extraTag": "keep-me",
    +       "location": "Berlin",
    +       "units": "celsius",
    +     },
        ],
        "secondLeakedValue": false,
    -   "secondNamesUnits": true,
    +   "secondNamesUnits": false,
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:89:8)

  ● ToolRegistry inputSchema validation acceptance › compiles a static tool schema once across repeated executions

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "allRejectedLocation": true,
    -   "compiledAtRegister": true,
    -   "executorCalls": 0,
    +   "allRejectedLocation": false,
    +   "compiledAtRegister": false,
    +   "executorCalls": 10,
        "recompiledOnExecute": false,
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:125:8)

  ● ToolRegistry inputSchema validation acceptance › returns a validation rejection to the model so the orchestrator tool loop can retry and resolve

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "executorInputs": Array [
    +     Object {},
          Object {
            "location": "Berlin",
          },
        ],
    -   "firstRejectionNamesLocation": true,
    +   "firstRejectionNamesLocation": false,
        "reply": "Forecast: 18C in Berlin",
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:156:8)

Test Suites: 1 failed, 1 total
Tests:       5 failed, 5 total
Snapshots:   0 total
Time:        0.389 s
Ran all test suites within paths "src/orchestration/tools/registry.acceptance.test.ts".
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}