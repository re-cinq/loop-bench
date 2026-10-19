Acceptance tests for #93 have been written in `src/orchestration/chatOrchestrator.acceptance.test.ts`, linked in `specs/hal-engine-config-hooks/spec.md`, and recorded in `.lore/dod.md` under the `direct` strategy.

### Failure output

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › sums the usage of every round across two tool rounds, not only the last

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

      48 |     ]);
      49 |
    > 50 |     expect(reported).toEqual({inputTokens: 75, outputTokens: 22, totalTokens: 97});
         |                      ^
      51 |   });
      52 |
      53 |   it('counts every reporting round when a round between them reports none, and reports undefined when no round reports usage', async () => {

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:50:22)

  ● afterModelResponse usage across tool rounds › counts every reporting round when a round between them reports none, and reports undefined when no round reports usage

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "withNoReportedUsage": undefined,
        "withUnreportedMiddleRound": Object {
    -     "inputTokens": 50,
    -     "outputTokens": 16,
    -     "totalTokens": 66,
    +     "inputTokens": 40,
    +     "outputTokens": 12,
    +     "totalTokens": 52,
        },
      }

      59 |     const withNoReportedUsage = await turnUsage([undefined, undefined]);
      60 |
    > 61 |     expect({withUnreportedMiddleRound, withNoReportedUsage}).toEqual({
         |                                                              ^
      62 |       withUnreportedMiddleRound: {inputTokens: 50, outputTokens: 16, totalTokens: 66},
      63 |       withNoReportedUsage: undefined,
      64 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:61:62)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}