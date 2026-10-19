Defined Done for #93 under the `direct` strategy in `.lore/dod.md`, linked the spec statements in `specs/hal-engine-config-hooks/spec.md`, and added two failing acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts`.

Failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › sums usage across every provider call when a turn runs two tool rounds

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

      72 |     await orchestrator.processMessage(createSession('ask'));
      73 |
    > 74 |     expect(reportedUsage).toEqual({inputTokens: 750, outputTokens: 105, totalTokens: 855});
         |                           ^
      75 |   });
      76 |
      77 |   it('sums the rounds that reported usage when another round in the turn omits it, and reports undefined when no round reported', async () => {

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:74:27)

  ● afterModelResponse usage across tool rounds › sums the rounds that reported usage when another round in the turn omits it, and reports undefined when no round reported

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "emptyTurnUsage": undefined,
        "partialTurnUsage": Object {
    -     "inputTokens": 200,
    -     "outputTokens": 40,
    -     "totalTokens": 240,
    +     "inputTokens": 120,
    +     "outputTokens": 25,
    +     "totalTokens": 145,
        },
      }

      117 |     ).processMessage(createSession('ask'));
      118 |
    > 119 |     expect({partialTurnUsage, emptyTurnUsage}).toEqual({
          |                                                ^
      120 |       partialTurnUsage: {inputTokens: 200, outputTokens: 40, totalTokens: 240},
      121 |       emptyTurnUsage: undefined,
      122 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:119:48)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}