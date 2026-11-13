Defined DONE for #93 (`direct` strategy) with `.lore/dod.md`, `specs/hal-engine-config-hooks/spec.md`, and red acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts` (commit `798317c` pushed to `origin/loop-bench/93`, up to date with `origin/main`).

Actual failure output from `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse turn usage › sums usage across every provider call in a multi-round tool turn

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 75,
    -   "outputTokens": 20,
    -   "totalTokens": 95,
    +   "inputTokens": 40,
    +   "outputTokens": 9,
    +   "totalTokens": 49,
      }

      14 |     ]);
      15 |
    > 16 |     expect(reportedUsage).toEqual({inputTokens: 75, outputTokens: 20, totalTokens: 95});
         |                           ^
      17 |   });
      18 |
      19 |   it('sums the rounds that report usage when some omit it, or undefined when none do', async () => {

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:16:27)

  ● afterModelResponse turn usage › sums the rounds that report usage when some omit it, or undefined when none do

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "partialRoundsUsage": Object {
    -     "inputTokens": 42,
    -     "outputTokens": 13,
    -     "totalTokens": 55,
    +     "inputTokens": 30,
    +     "outputTokens": 8,
    +     "totalTokens": 38,
        },
        "silentTurnUsage": undefined,
      }

      26 |     const silentTurnUsage = await runTurnWithRounds([toolRound('call-1'), finalRound('done')]);
      27 |
    > 28 |     expect({partialRoundsUsage, silentTurnUsage}).toEqual({
         |                                                   ^
      29 |       partialRoundsUsage: {inputTokens: 42, outputTokens: 13, totalTokens: 55},
      30 |       silentTurnUsage: undefined,
      31 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:28:51)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}