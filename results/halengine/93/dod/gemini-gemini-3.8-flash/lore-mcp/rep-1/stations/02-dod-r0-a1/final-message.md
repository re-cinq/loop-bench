The acceptance tests for ticket #93 ("Report usage across every tool round, not just the last") have been created in `src/orchestration/chatOrchestrator.acceptance.test.ts`, linked to the updated statements in `specs/hal-engine-config-hooks/spec.md`, and tracked in `.lore/dod.md`.

### Acceptance Tests
- `reports usage covering every provider call in a turn driven through two tool rounds`
- `accumulates usage when some rounds omit usage, and reports undefined when no round reported usage`

Both tests execute against the orchestrator's real entry point with a scripted provider emitting known token counts across multiple tool rounds, observing the usage passed to `OrchestratorHooks.afterModelResponse`. Both fail because `chatOrchestrator.ts` currently replaces `lastUsage` on each round with the latest provider call rather than accumulating across rounds.

### Failure Output
```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator usage across tool rounds acceptance › reports usage covering every provider call in a turn driven through two tool rounds

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

      77 |     await orchestrator.processMessage(createSession('run tools'));
      78 |
    > 79 |     expect(receivedUsage).toEqual({
         |                           ^
      80 |       inputTokens: 60,
      81 |       outputTokens: 12,
      82 |       totalTokens: 72,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:79:27)

  ● ChatOrchestrator usage across tool rounds acceptance › accumulates usage when some rounds omit usage, and reports undefined when no round reported usage

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "noUsageRunUsage": undefined,
        "partialRunUsage": Object {
    -     "inputTokens": 40,
    -     "outputTokens": 15,
    -     "totalTokens": 55,
    +     "inputTokens": 25,
    +     "outputTokens": 10,
    +     "totalTokens": 35,
        },
      }

      145 |     await orchestratorNoUsage.processMessage(createSession('run no usage'));
      146 |
    > 147 |     expect({partialRunUsage, noUsageRunUsage}).toEqual({
          |                                                ^
      148 |       partialRunUsage: {
      149 |         inputTokens: 40,
      150 |         outputTokens: 15,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:147:48)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
Snapshots:   0 total
Time:        0.253 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}