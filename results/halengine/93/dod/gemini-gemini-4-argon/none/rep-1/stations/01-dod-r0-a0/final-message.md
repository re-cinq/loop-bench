Added failing acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts`, updated `specs/hal-engine-config-hooks/spec.md`, and recorded the Definition of Done in `.lore/dod.md`.

### Acceptance Test Failure Output

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator multi-round usage reporting › reports usage summed across every provider call when a turn runs through two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 75,
    -   "outputTokens": 24,
    -   "totalTokens": 99,
    +   "inputTokens": 40,
    +   "outputTokens": 12,
    +   "totalTokens": 52,
      }

      58 |     ]);
      59 |
    > 60 |     expect(usage).toEqual({inputTokens: 75, outputTokens: 24, totalTokens: 99});
         |                   ^
      61 |   });
      62 |
      63 |   it('counts the rounds that reported usage when some omit it, and reports undefined when none did', async () => {

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:60:19)

  ● ChatOrchestrator multi-round usage reporting › counts the rounds that reported usage when some omit it, and reports undefined when none did

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "noneReported": undefined,
        "someReported": Object {
    -     "inputTokens": 32,
    -     "outputTokens": 12,
    -     "totalTokens": 44,
    +     "inputTokens": 20,
    +     "outputTokens": 7,
    +     "totalTokens": 27,
        },
      }

      69 |     const noneReported = await reportedUsageFor([undefined, undefined]);
      70 |
    > 71 |     expect({someReported, noneReported}).toEqual({
         |                                          ^
      72 |       someReported: {inputTokens: 32, outputTokens: 12, totalTokens: 44},
      73 |       noneReported: undefined,
      74 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:71:42)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}