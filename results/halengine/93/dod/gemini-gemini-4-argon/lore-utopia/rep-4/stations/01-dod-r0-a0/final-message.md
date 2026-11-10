Red acceptance tests for re-cinq/HALEngine#93 (`src/orchestration/chatOrchestrator.acceptance.test.ts`), spec citations (`specs/hal-engine-config-hooks/spec.md`), and the Definition of Done (`.lore/dod.md`) are committed and pushed.

### Failure Output

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator afterModelResponse usage across tool rounds › reports the sum of three provider calls when a turn runs two tool rounds

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

      73 |     await orchestrator.processMessage(createSession('ask'));
      74 |
    > 75 |     expect(seen).toEqual({inputTokens: 600, outputTokens: 60, totalTokens: 660});
         |                  ^
      76 |   });
      77 |
      78 |   it('counts the rounds that reported usage when one round reports none, and reports nothing when no round did', async () => {

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:75:18)

  ● ChatOrchestrator afterModelResponse usage across tool rounds › counts the rounds that reported usage when one round reports none, and reports nothing when no round did

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

      116 |     await noneOrchestrator.processMessage(createSession('ask'));
      117 |
    > 118 |     expect(seen).toEqual({
          |                  ^
      119 |       partial: {inputTokens: 12, outputTokens: 3, totalTokens: 15},
      120 |       none: undefined,
      121 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:118:18)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}