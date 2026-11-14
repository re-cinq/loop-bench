Defined Done for re-cinq/HALEngine#93 under strategy `direct` (`c00bdf7` pushed to `origin/loop-bench/93`):

- Added two red acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts`.
- Replaced the out-of-scope `lastUsage` under-counting bullet in `specs/hal-engine-config-hooks/spec.md` with the cited `afterModelResponse` turn-usage statements.
- Recorded the Definition of Done, facets, and out-of-scope boundaries in `.lore/dod.md`.

Failure output from `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › sums usage across every provider call in a multi-round tool turn

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 75,
    -   "outputTokens": 22,
    -   "totalTokens": 97,
    +   "inputTokens": 40,
    +   "outputTokens": 12,
    +   "totalTokens": 52,
      }

      19 |     ]);
      20 |
    > 21 |     expect(reported).toEqual({inputTokens: 75, outputTokens: 22, totalTokens: 97});
         |                      ^
      22 |   });
      23 |
      24 |   it('sums the rounds that reported usage and keeps undefined when no round reported any', async () => {

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:21:22)

  ● afterModelResponse usage across tool rounds › sums the rounds that reported usage and keeps undefined when no round reported any

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "partial": Object {
    -     "inputTokens": 42,
    -     "outputTokens": 13,
    -     "totalTokens": 55,
    +     "inputTokens": 30,
    +     "outputTokens": 8,
    +     "totalTokens": 38,
        },
        "unreported": undefined,
      }

      31 |     const unreported = await recordedTurnUsage([{kind: 'tool'}, {kind: 'answer'}]);
      32 |
    > 33 |     expect({partial, unreported}).toEqual({
         |                                   ^
      34 |       partial: {inputTokens: 42, outputTokens: 13, totalTokens: 55},
      35 |       unreported: undefined,
      36 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:33:35)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}