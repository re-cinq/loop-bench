Defined Done for `re-cinq/HALEngine#93` using strategy `direct` in `.lore/dod.md`, linked the behavioural statements in `specs/hal-engine-config-hooks/spec.md`, and verified the red bar in `src/orchestration/usageAcrossRounds.acceptance.test.ts`:

```text
FAIL src/orchestration/usageAcrossRounds.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › sums usage across two tool rounds and the final answer

    expect(received).toMatchObject(expected)

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 750,
    -   "outputTokens": 105,
    -   "totalTokens": 855,
    +   "inputTokens": 400,
    +   "outputTokens": 50,
    +   "totalTokens": 450,
      }

      66 |     ]);
      67 |
    > 68 |     expect(reported).toMatchObject({inputTokens: 750, outputTokens: 105, totalTokens: 855});
         |                      ^
      69 |   });
      70 |
      71 |   it('counts only rounds that reported usage and reports undefined when none did', async () => {

      at Object.<anonymous> (src/orchestration/usageAcrossRounds.acceptance.test.ts:68:22)

  ● afterModelResponse usage across tool rounds › counts only rounds that reported usage and reports undefined when none did

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 4

      Object {
    -   "partial": ObjectContaining {
    -     "inputTokens": 340,
    -     "outputTokens": 40,
    -     "totalTokens": 380,
    +   "partial": Object {
    +     "inputTokens": 230,
    +     "outputTokens": 25,
    +     "totalTokens": 255,
        },
        "silent": undefined,
      }

      78 |     const silent = await runTurn([toolRound(), finalRound('Done.')]);
      79 |
    > 80 |     expect({partial, silent}).toEqual({
         |                               ^
      81 |       partial: expect.objectContaining({inputTokens: 340, outputTokens: 40, totalTokens: 380}),
      82 |       silent: undefined,
      83 |     });

      at Object.<anonymous> (src/orchestration/usageAcrossRounds.acceptance.test.ts:80:31)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}