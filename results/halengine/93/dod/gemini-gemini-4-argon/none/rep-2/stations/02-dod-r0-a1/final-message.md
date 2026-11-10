The Definition of Done (`.lore/dod.md`), spec traceability (`specs/hal-engine-config-hooks/spec.md`), and acceptance tests (`src/orchestration/usageAcrossRounds.acceptance.test.ts`) are committed and pushed on `loop-bench/93`.

### Red Bar Output

Command run:
```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/usageAcrossRounds.acceptance.test.ts
```

Failure output:
```text
FAIL src/orchestration/usageAcrossRounds.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › sums inputTokens, outputTokens and totalTokens across two tool rounds and the answering round

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 75,
    -   "outputTokens": 22,
    -   "totalTokens": 97,
    +   "inputTokens": 40,
    +   "outputTokens": 12,
    +   "totalTokens": 52,
      }

      66 |     ]);
      67 |
    > 68 |     expect(reported).toEqual({inputTokens: 75, outputTokens: 22, totalTokens: 97});
         |                      ^
      69 |   });
      70 |
      71 |   it('counts the rounds that reported when a middle round reports no usage, and reports undefined when no round reported', async () => {

      at Object.<anonymous> (src/orchestration/usageAcrossRounds.acceptance.test.ts:68:22)

  ● afterModelResponse usage across tool rounds › counts the rounds that reported when a middle round reports no usage, and reports undefined when no round reported

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "allSilent": undefined,
        "withSilentRound": Object {
    -     "inputTokens": 30,
    -     "outputTokens": 10,
    -     "totalTokens": 40,
    +     "inputTokens": 19,
    +     "outputTokens": 7,
    +     "totalTokens": 26,
        },
      }

      83 |     ]);
      84 |
    > 85 |     expect({withSilentRound, allSilent}).toEqual({
         |                                          ^
      86 |       withSilentRound: {inputTokens: 30, outputTokens: 10, totalTokens: 40},
      87 |       allSilent: undefined,
      88 |     });

      at Object.<anonymous> (src/orchestration/usageAcrossRounds.acceptance.test.ts:85:42)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}