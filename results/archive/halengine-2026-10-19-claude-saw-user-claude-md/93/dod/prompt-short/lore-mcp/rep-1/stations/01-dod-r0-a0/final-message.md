I have read the ticket and identified that the `afterModelResponse` hook currently receives only the usage of the last provider call, rather than the accumulated usage across all tool rounds in a turn.

I used the `direct` strategy since the orchestrator seam already exists. I added a new acceptance test file `src/orchestration/after-model-response-usage.acceptance.test.ts` containing tests that define the "Done" criteria for this ticket. The tests assert that the usage is accumulated correctly, missing round usages are correctly treated as 0 instead of propagating undefined, and an empty usage remains empty.

I formatted the newly created files, committed the tests along with `.lore/dod.md`, and pushed the branch to origin. The tests currently fail for the correct reason: `chatOrchestrator.ts` continues to report only the last tool's round.

Here is the test failure output:

```text
FAIL src/orchestration/after-model-response-usage.acceptance.test.ts
  ● Report usage across every tool round › A turn driven through two tool rounds reports usage covering every provider call in that turn. ([validated by name](src/orchestration/after-model-response-usage.acceptance.test.ts#L0))

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 42,
    -   "outputTokens": 21,
    -   "totalTokens": 63,
    +   "inputTokens": 20,
    +   "outputTokens": 10,
    +   "totalTokens": 30,
      }

      72 |     await orchestrator.processMessage(createSession('ask'));
      73 |
    > 74 |     expect(reportedUsage).toEqual({
         |                           ^
      75 |       inputTokens: 42,
      76 |       outputTokens: 21,
      77 |       totalTokens: 63,

      at Object.<anonymous> (src/orchestration/after-model-response-usage.acceptance.test.ts:74:27)

  ● Report usage across every tool round › A provider that reports no usage on some rounds does not make the total undefined or NaN. ([validated by name](src/orchestration/after-model-response-usage.acceptance.test.ts#L0))

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 30,
    -   "outputTokens": 15,
    -   "totalTokens": 45,
    +   "inputTokens": 20,
    +   "outputTokens": 10,
    +   "totalTokens": 30,
      }

      119 |     await orchestrator.processMessage(createSession('ask'));
      120 |
    > 121 |     expect(reportedUsage).toEqual({
          |                           ^
      122 |       inputTokens: 30,
      123 |       outputTokens: 15,
      124 |       totalTokens: 45,

      at Object.<anonymous> (src/orchestration/after-model-response-usage.acceptance.test.ts:121:27)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 1 passed, 3 total
Snapshots:   0 total
Time:        0.349 s
Ran all test suites matching src/orchestration/after-model-response-usage.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}