Defined Done for re-cinq/HALEngine#93 (`direct` strategy) in commit `61927f4`, pushed to `origin/loop-bench/93`:

- Added `src/orchestration/chatOrchestrator.acceptance.test.ts` with two red acceptance tests exercising `createChatOrchestrator` through multiple tool rounds.
- Linked both tests in `specs/hal-engine-config-hooks/spec.md` and removed the superseded out-of-scope flaw bullet.
- Recorded the Definition of Done, facets, and out-of-scope boundaries in `.lore/dod.md`.

### Red bar failure output (`npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`)

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › sums usage across every provider call in a turn driven through two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 75,
    -   "outputTokens": 19,
    -   "totalTokens": 94,
    +   "inputTokens": 40,
    +   "outputTokens": 9,
    +   "totalTokens": 49,
      }

      17 |     ]);
      18 |
    > 19 |     expect(reported).toEqual({inputTokens: 75, outputTokens: 19, totalTokens: 94});
         |                      ^
      20 |   });
      21 |
      22 |   it('counts the rounds that reported usage when another round reports none, and reports undefined when no round reports usage', async () => {

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:19:22)

  ● afterModelResponse usage across tool rounds › counts the rounds that reported usage when another round reports none, and reports undefined when no round reports usage

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "silent": undefined,
        "sparse": Object {
    -     "inputTokens": 42,
    -     "outputTokens": 13,
    -     "totalTokens": 55,
    +     "inputTokens": 30,
    +     "outputTokens": 8,
    +     "totalTokens": 38,
        },
      }

      28 |     const silent = await usageReportedFor([undefined, undefined]);
      29 |
    > 30 |     expect({sparse, silent}).toEqual({
         |                              ^
      31 |       sparse: {inputTokens: 42, outputTokens: 13, totalTokens: 55},
      32 |       silent: undefined,
      33 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:30:30)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}