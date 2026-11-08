### Acceptance Tests for Ticket #93: Report usage across every tool round, not just the last

I have created the executable acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts`, documented the triage in `.lore/dod.md` using the `direct` strategy, and updated the statement in `specs/hal-engine-config-hooks/spec.md`.

Running `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts` fails for the exact reason reported in Ticket #93:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › reports usage covering every provider call in a turn driven through two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 60,
    -   "outputTokens": 12,
    -   "totalTokens": 72,
    +   "inputTokens": 30,
    +   "outputTokens": 6,
    +   "totalTokens": 36,
      }

      72 |     await orchestrator.processMessage(createSession('question'));
      73 |
    > 74 |     expect(reportedUsage).toEqual({
         |                           ^
      75 |       inputTokens: 60,
      76 |       outputTokens: 12,
      77 |       totalTokens: 72,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:74:27)

  ● afterModelResponse usage across tool rounds › accumulates usage across rounds when some rounds report no usage

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 30,
    -   "outputTokens": 6,
    -   "totalTokens": 36,
    +   "inputTokens": 20,
    +   "outputTokens": 4,
    +   "totalTokens": 24,
      }

      105 |     await orchestrator.processMessage(createSession('question'));
      106 |
    > 107 |     expect(reportedUsage).toEqual({
          |                           ^
      108 |       inputTokens: 30,
      109 |       outputTokens: 6,
      110 |       totalTokens: 36,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:107:27)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
Snapshots:   0 total
Time:        0.28 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

The files have been formatted with Prettier, committed, and pushed to `origin/loop-bench/93`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}