Defined Done for `re-cinq/HALEngine#93` under strategy `direct`:

- Added red acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts` driving `createChatOrchestrator(...).processMessage(...)` across tool rounds.
- Linked both acceptance tests in `specs/hal-engine-config-hooks/spec.md`, replacing the recorded under-counting bullet under `Measured semantics — out of scope`.
- Recorded the triage, acceptance tests, implementation facets, and out-of-scope boundaries in `.lore/dod.md`.

Failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator multi-round usage reporting › sums usage across every provider call when a turn runs two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "providerCalls": 3,
        "reportedUsage": Object {
    -     "inputTokens": 760,
    -     "outputTokens": 115,
    -     "totalTokens": 875,
    +     "inputTokens": 410,
    +     "outputTokens": 60,
    +     "totalTokens": 470,
        },
        "toolRoundsExecuted": 2,
      }

      17 |     ]);
      18 |
    > 19 |     expect(turn).toEqual({
         |                  ^
      20 |       toolRoundsExecuted: 2,
      21 |       providerCalls: 3,
      22 |       reportedUsage: {inputTokens: 760, outputTokens: 115, totalTokens: 875},

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:19:18)

  ● ChatOrchestrator multi-round usage reporting › counts only the rounds that reported usage, and reports undefined when none did

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "partialUsage": Object {
    -     "inputTokens": 130,
    -     "outputTokens": 25,
    -     "totalTokens": 155,
    +     "inputTokens": 90,
    +     "outputTokens": 15,
    +     "totalTokens": 105,
        },
        "silentUsage": undefined,
      }

      37 |       partialUsage: partial.reportedUsage,
      38 |       silentUsage: silent.reportedUsage,
    > 39 |     }).toEqual({
         |        ^
      40 |       partialUsage: {inputTokens: 130, outputTokens: 25, totalTokens: 155},
      41 |       silentUsage: undefined,
      42 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:39:8)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}