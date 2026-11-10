Acceptance tests for `#93` are recorded in `src/orchestration/chatOrchestrator.acceptance.test.ts`, linked in `specs/hal-engine-config-hooks/spec.md`, and triaged under strategy `direct` in `.lore/dod.md`.

### Red bar failure output

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator usage reporting across tool rounds › reports the sum of three provider calls when a turn runs two tool rounds

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

      85 |     ]);
      86 |
    > 87 |     expect(usage).toEqual({inputTokens: 600, outputTokens: 60, totalTokens: 660});
         |                   ^
      88 |   });
      89 |
      90 |   it('counts the rounds that reported usage when one round reports none, and reports nothing when no round did', async () => {

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:87:19)

  ● ChatOrchestrator usage reporting across tool rounds › counts the rounds that reported usage when one round reports none, and reports nothing when no round did

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

      116 |     ]);
      117 |
    > 118 |     expect({partial, none}).toEqual({
          |                             ^
      119 |       partial: {inputTokens: 12, outputTokens: 3, totalTokens: 15},
      120 |       none: undefined,
      121 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:118:29)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}