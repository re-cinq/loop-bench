Defined DONE for `re-cinq/HALEngine#93` under strategy `direct` (commit `b1acf6a` pushed to `origin/loop-bench/93`, up to date with `origin/main`):

- Added `src/orchestration/chatOrchestrator.acceptance.test.ts` with two acceptance tests exercising `createChatOrchestrator` across multiple tool rounds.
- Replaced the out-of-scope under-counting bullet in `specs/hal-engine-config-hooks/spec.md` with normative statements citing the two new acceptance tests and the existing unedited no-tool test (`src/orchestration/chatOrchestrator.test.ts#L236`).
- Recorded the Definition of Done, facets, and out-of-scope items in `.lore/dod.md`.

Red bar output from `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › sums usage across every provider call when a turn runs two tool rounds

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

      70 |     ]);
      71 |
    > 72 |     expect(reported).toEqual({inputTokens: 600, outputTokens: 60, totalTokens: 660});
         |                      ^
      73 |   });
      74 |
      75 |   it('counts the rounds that reported usage when some omit it, and reports undefined when none did', async () => {

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:72:22)

  ● afterModelResponse usage across tool rounds › counts the rounds that reported usage when some omit it, and reports undefined when none did

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "partial": Object {
    -     "inputTokens": 100,
    -     "outputTokens": 20,
    -     "totalTokens": 120,
    +     "inputTokens": 60,
    +     "outputTokens": 12,
    +     "totalTokens": 72,
        },
        "unreported": undefined,
      }

      81 |     const unreported = await reportedUsageFor([undefined, undefined]);
      82 |
    > 83 |     expect({partial, unreported}).toEqual({
         |                                   ^
      84 |       partial: {inputTokens: 100, outputTokens: 20, totalTokens: 120},
      85 |       unreported: undefined,
      86 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:83:35)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}