Committed and pushed the Definition of Done (`.lore/dod.md`), spec traceability updates (`specs/hal-engine-config-hooks/spec.md`), and two red acceptance tests (`src/orchestration/chatOrchestrator.acceptance.test.ts`) to `origin/loop-bench/93` (`bdc234a`, up to date with `origin/main`).

### Red acceptance test output (`npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`)

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator afterModelResponse usage across tool rounds › reports the sum of three provider calls when a turn runs two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 600,
    -   "outputTokens": 60,
    -   "totalTokens": 660,
    +   "inputTokens": 300,
    +   "outputTokens": 30,
    +   "totalTokens": 330,
      }

      67 |     ]);
      68 |
    > 69 |     expect(reportedUsage).toEqual({
         |                           ^
      70 |       inputTokens: 600,
      71 |       outputTokens: 60,
      72 |       totalTokens: 660,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:69:27)

  ● ChatOrchestrator afterModelResponse usage across tool rounds › counts the rounds that reported usage when one round reports none, and reports undefined when none did

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "silent": undefined,
        "sparse": Object {
    -     "inputTokens": 100,
    -     "outputTokens": 20,
    -     "totalTokens": 120,
    +     "inputTokens": 60,
    +     "outputTokens": 12,
    +     "totalTokens": 72,
        },
      }

      82 |     const silent = await usageReportedFor([undefined, undefined]);
      83 |
    > 84 |     expect({sparse, silent}).toEqual({
         |                              ^
      85 |       sparse: {inputTokens: 100, outputTokens: 20, totalTokens: 120},
      86 |       silent: undefined,
      87 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:84:30)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}