### Definition of Done for Ticket #93

**Strategy: `direct`** — The `afterModelResponse` hook seam already exists on `OrchestratorHooks` and receives `lastUsage` from `createChatOrchestrator`. Acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts` drive multi-round tool turns through `processMessage` with scripted providers and assert that usage is aggregated across every provider round rather than reporting only the final round.

Both acceptance tests fail for the central claim of the ticket:

```
$ npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts

FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● chatOrchestrator afterModelResponse usage aggregation › reports the sum of three provider calls when a turn runs two tool rounds

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

      38 |     await orchestrator.processMessage(createSession('run tools'));
      39 |
    > 40 |     expect(seenUsage).toEqual({
         |                       ^
      41 |       inputTokens: 600,
      42 |       outputTokens: 60,
      43 |       totalTokens: 660,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:40:23)

  ● chatOrchestrator afterModelResponse usage aggregation › counts the rounds that reported usage when one round reports none, and reports nothing when no round did

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "none": undefined,
        "partial": Object {
    -     "inputTokens": 12,
    -     "outputTokens": 3,
    -     "totalTokens": 15,
    +     "inputTokens": 5,
    +     "outputTokens": 1,
    +     "totalTokens": 6,
        },
      }

      90 |     await noneOrchestrator.processMessage(createSession('no usage'));
      91 |
    > 92 |     expect({partial: seenUsagePartial, none: seenUsageNone}).toEqual({
         |                                                              ^
      93 |       partial: {inputTokens: 12, outputTokens: 3, totalTokens: 15},
      94 |       none: undefined,
      95 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:92:62)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
Snapshots:   0 total
Time:        0.263 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

- Spec citations in `specs/hal-engine-config-hooks/spec.md` updated and validated.
- `.lore/dod.md` committed and pushed.
- Branch `loop-bench/93` is up to date with `origin/loop-bench/93` and merged with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}