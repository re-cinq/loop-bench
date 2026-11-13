Defined Done for `re-cinq/HALEngine#93` under strategy `direct` (`commit 2c7c9f1`, pushed to `origin/loop-bench/93`):

- Added two acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts`, leaving the existing single-round test (`src/orchestration/chatOrchestrator.test.ts#L236`) unedited.
- Replaced the out-of-scope under-counting bullet in `specs/hal-engine-config-hooks/spec.md` with `## Usage reported to afterModelResponse` citing both new acceptance tests and `#L236`.
- Recorded the verbatim claim, `direct` strategy, acceptance tests, implementation facets (including `docs:fix` for `OrchestratorHooks` doc-blocks in `CLAUDE.md` and `specs/hal-engine-architecture/spec.md`), and out-of-scope items in `.lore/dod.md`.

Failure output from `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › reports the sum of every provider call across two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 650,
    -   "outputTokens": 85,
    -   "totalTokens": 735,
    +   "inputTokens": 340,
    +   "outputTokens": 45,
    +   "totalTokens": 385,
      }

      68 |     ]);
      69 |
    > 70 |     expect(reportedUsage).toEqual({inputTokens: 650, outputTokens: 85, totalTokens: 735});
         |                           ^
      71 |   });
      72 |
      73 |   it('sums the rounds that reported usage and reports undefined when none did', async () => {

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:70:27)

  ● afterModelResponse usage across tool rounds › sums the rounds that reported usage and reports undefined when none did

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "partialTurn": Object {
    -     "inputTokens": 120,
    -     "outputTokens": 30,
    -     "totalTokens": 150,
    +     "inputTokens": 80,
    +     "outputTokens": 20,
    +     "totalTokens": 100,
        },
        "silentTurn": undefined,
      }

      79 |     const silentTurn = await runTurnWithRoundUsages([undefined, undefined]);
      80 |
    > 81 |     expect({partialTurn, silentTurn}).toEqual({
         |                                       ^
      82 |       partialTurn: {inputTokens: 120, outputTokens: 30, totalTokens: 150},
      83 |       silentTurn: undefined,
      84 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:81:39)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}