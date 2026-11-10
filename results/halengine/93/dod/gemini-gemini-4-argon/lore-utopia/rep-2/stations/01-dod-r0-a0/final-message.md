Red acceptance tests, the updated `specs/hal-engine-config-hooks/spec.md`, and `.lore/dod.md` have been committed and pushed on `loop-bench/93` (`c20f048`).

### Failure output (`src/orchestration/chatOrchestrator.acceptance.test.ts`)

```text
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

      62 |     ]);
      63 |
    > 64 |     expect(reported).toEqual({inputTokens: 600, outputTokens: 60, totalTokens: 660});
         |                      ^
      65 |   });

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

      76 |     ]);
      77 |
    > 78 |     expect({partial, none}).toEqual({
         |                             ^
      79 |       partial: {inputTokens: 12, outputTokens: 3, totalTokens: 15},
      80 |       none: undefined,
      81 |     });

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}