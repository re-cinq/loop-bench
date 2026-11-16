Created the acceptance test suite, specification, and Definition of Done for `#37`:

- `src/orchestration/tools/registry.acceptance.test.ts` (4 acceptance tests)
- `specs/hal-engine-tool-input-validation/spec.md` (linking all 4 tests via `validated by:`)
- `.lore/dod.md` (`Strategy: direct`)

### Acceptance test run (`NODE_OPTIONS="--experimental-vm-modules" npx jest --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`)

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation › rejects schema-violating input with a ToolResponse without invoking the executor or leaking values

    expect(received).toEqual(expected) // deep equality

    - Expected  - 7
    + Received  + 7

      Object {
    -   "calls": 0,
    -   "emptyMentionsLocation": true,
    -   "emptyMentionsRequired": true,
    -   "enumMentionsUnits": true,
    +   "calls": 3,
    +   "emptyMentionsLocation": false,
    +   "emptyMentionsRequired": false,
    +   "enumMentionsUnits": false,
        "leakedEnumInLogs": false,
        "leakedEnumInResult": false,
        "leakedNumberInLogs": false,
    -   "leakedNumberInResult": false,
    +   "leakedNumberInResult": true,
        "thrownMessage": "Unknown tool: otherTool",
    -   "typeMentionsLocation": true,
    -   "typeMentionsString": true,
    +   "typeMentionsLocation": false,
    +   "typeMentionsString": false,
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:60:8)

  ● ToolRegistry inputSchema validation › forwards valid input with extra properties unchanged without defaults or type coercion

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 6

    @@ -4,9 +4,13 @@
        "receivedInputs": Array [
          Object {
            "extraTag": "keepMe",
            "location": "Berlin",
          },
    +     Object {
    +       "limit": "94281",
    +       "location": "Berlin",
    +     },
        ],
    -   "rejectedMentionsLimit": true,
    -   "rejectedMentionsNumber": true,
    +   "rejectedMentionsLimit": false,
    +   "rejectedMentionsNumber": false,
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:88:8)

  ● ToolRegistry inputSchema validation › compiles static schemas once at registration and resolves dynamic schemas per call

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 4

      Object {
    -   "compiledAtRegister": true,
    +   "compiledAtRegister": false,
        "compiledOnce": true,
        "firstAlpha": "{\"alpha\":\"one\"}",
    -   "firstBetaMentionsAlpha": true,
    -   "registerNamesTool": true,
    -   "secondAlphaMentionsBeta": true,
    +   "firstBetaMentionsAlpha": false,
    +   "registerNamesTool": false,
    +   "secondAlphaMentionsBeta": false,
        "secondBeta": "{\"beta\":\"two\"}",
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:151:8)

  ● ToolRegistry inputSchema validation › feeds schema validation rejections back into the orchestrator tool loop for retry

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 2

      Object {
        "receivedInputs": Array [
    +     Object {},
          Object {
            "location": "Berlin",
          },
        ],
    -   "rejectionVisibleToProvider": true,
    +   "rejectionVisibleToProvider": false,
        "reply": "Weather in Berlin: Sunny",
      }

      at Object.<anonymous> (src/orchestration/tools/registry.acceptance.test.ts:202:8)

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

Committed as `2119238` and pushed to `origin/loop-bench/37` (up to date with `origin/main`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}