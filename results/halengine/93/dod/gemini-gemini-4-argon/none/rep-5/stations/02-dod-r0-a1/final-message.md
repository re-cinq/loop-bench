Failing acceptance tests for Ticket #93 are committed and pushed in `src/orchestration/chatOrchestrator.acceptance.test.ts`, linked from `specs/hal-engine-config-hooks/spec.md`, and recorded in `.lore/dod.md`.

### Failure Output

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator afterModelResponse usage across tool rounds › sums usage across every provider call when a turn runs two tool rounds

    expect(received).toEqual(expected) // deep equality

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

      66 |     await orchestrator.processMessage(createSession('ask'));
      67 |
    > 68 |     expect(reported).toEqual({
         |                      ^
      69 |       inputTokens: 750,
      70 |       outputTokens: 105,
      71 |       totalTokens: 855,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:68:22)

  ● ChatOrchestrator afterModelResponse usage across tool rounds › sums the rounds that reported usage when another round in the turn reports none, and reports undefined when no round reports usage

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Array [
        Object {
    -     "inputTokens": 200,
    -     "outputTokens": 40,
    -     "totalTokens": 240,
    +     "inputTokens": 120,
    +     "outputTokens": 25,
    +     "totalTokens": 145,
        },
        undefined,
      ]

      111 |     await silentOrchestrator.processMessage(createSession('ask silent'));
      112 |
    > 113 |     expect(reported).toEqual([
          |                      ^
      114 |       {
      115 |         inputTokens: 200,
      116 |         outputTokens: 40,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:113:22)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}