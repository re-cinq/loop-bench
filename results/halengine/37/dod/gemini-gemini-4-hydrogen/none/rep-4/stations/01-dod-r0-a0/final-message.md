Added red acceptance tests, spec traceability, and `.lore/dod.md` for `re-cinq/HALEngine#37` using the `direct` strategy, committed (`7a78ca8`) and pushed to `origin/loop-bench/37`.

Files added:
- `src/orchestration/tools/registry.acceptance.test.ts`
- `src/orchestration/chatOrchestrator.acceptance.test.ts`
- `specs/hal-engine-tool-input-validation/spec.md`
- `.lore/dod.md`

Executed `NODE_OPTIONS='--experimental-vm-modules' npx jest --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry inputSchema validation › returns a ToolResponse naming the failing property and constraint without calling the executor or leaking values

    - Expected  - 6
    + Received  + 6

      Object {
    -   "enumMentionsUnits": true,
    -   "executorCalls": 0,
    +   "enumMentionsUnits": false,
    +   "executorCalls": 3,
        "leakedInLogs": false,
        "leakedInReplies": false,
    -   "missingMentionsLocation": true,
    -   "missingMentionsRequired": true,
    -   "typeMentionsLocation": true,
    -   "typeMentionsString": true,
    +   "missingMentionsLocation": false,
    +   "missingMentionsRequired": false,
    +   "typeMentionsLocation": false,
    +   "typeMentionsString": false,
      }

  ● ToolRegistry inputSchema validation › passes valid input with extra properties through unmodified without coercing types or applying defaults

    - Expected  - 2
    + Received  + 6

      Object {
    -   "countMentionsField": true,
    -   "countMentionsNumber": true,
    +   "countMentionsField": false,
    +   "countMentionsNumber": false,
        "receivedInputs": Array [
          Object {
            "count": 3,
            "extra": "keep",
    +       "location": "Berlin",
    +     },
    +     Object {
    +       "count": "3",
            "location": "Berlin",
          },
        ],
        "validResult": "ok",
      }

  ● ToolRegistry inputSchema validation › throws at registration time naming the tool when its inputSchema cannot be compiled

    Expected pattern: /broken_tool/
    Received function did not throw

  ● ToolRegistry inputSchema validation › validates a function-valued tool definition against the schema returned on each call

    - Expected  - 1
    + Received  + 4

    @@ -2,8 +2,11 @@
        "firstResult": "ok",
        "receivedInputs": Array [
          Object {
            "alpha": "one",
          },
    +     Object {
    +       "alpha": "one",
    +     },
        ],
    -   "secondMentionsBeta": true,
    +   "secondMentionsBeta": false,
      }

FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator tool input validation recovery › resolves when a rejected tool call is retried with valid input and exposes the rejection to the provider

    - Expected  - 1
    + Received  + 2

      Object {
        "executorInputs": Array [
    +     Object {},
          Object {
            "location": "Berlin",
          },
        ],
    -   "rejectionMentionsLocation": true,
    +   "rejectionMentionsLocation": false,
        "reply": "Sunny in Berlin",
      }

Test Suites: 2 failed, 2 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}