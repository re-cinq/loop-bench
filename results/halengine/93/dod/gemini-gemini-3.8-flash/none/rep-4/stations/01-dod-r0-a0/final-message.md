### Definition of Done & Acceptance Tests

Defined DONE for ticket #93 (`Report usage across every tool round, not just the last`) using strategy `direct`.

The new acceptance tests live in `src/orchestration/usageReporting.acceptance.test.ts` and validate that the `afterModelResponse` hook receives accumulated token usage across all provider rounds in a turn, rather than only the final provider call's usage:

1. `accumulates usage across every provider call in a multi-round tool turn` — validates that a turn driven through two tool rounds (three provider calls with known, distinct token counts) sums input, output, and total tokens across all rounds.
2. `sums usage across rounds when some rounds report no usage` — validates that an intermediate provider round reporting no usage does not result in `undefined` or `NaN`, counting all reported rounds.

`specs/hal-engine-config-hooks/spec.md` was updated to specify the accumulated usage behavior and cite the new acceptance tests, replacing the previously documented out-of-scope under-counting note.

### Test Execution Output

Ran `npm test -- src/orchestration/usageReporting.acceptance.test.ts`:

```
FAIL src/orchestration/usageReporting.acceptance.test.ts
  ● afterModelResponse usage reporting across tool rounds › accumulates usage across every provider call in a multi-round tool turn

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 45,
    -   "outputTokens": 10,
    -   "totalTokens": 55,
    +   "inputTokens": 20,
    +   "outputTokens": 5,
    +   "totalTokens": 25,
      }

      60 |     );
      61 |
    > 62 |     expect(receivedUsage).toEqual({inputTokens: 45, outputTokens: 10, totalTokens: 55});
         |                           ^
      63 |   });
      64 |
      65 |   it('sums usage across rounds when some rounds report no usage', async () => {

      at Object.<anonymous> (src/orchestration/usageReporting.acceptance.test.ts:62:27)

  ● afterModelResponse usage reporting across tool rounds › sums usage across rounds when some rounds report no usage

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 30,
    -   "outputTokens": 7,
    -   "totalTokens": 37,
    +   "inputTokens": 20,
    +   "outputTokens": 5,
    +   "totalTokens": 25,
      }

      89 |     );
      90 |
    > 91 |     expect(receivedUsage).toEqual({inputTokens: 30, outputTokens: 7, totalTokens: 37});
         |                           ^
      92 |   });
      93 | });
      94 |

      at Object.<anonymous> (src/orchestration/usageReporting.acceptance.test.ts:91:27)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
Snapshots:   0 total
Time:        0.245 s, estimated 1 s
Ran all test suites matching src/orchestration/usageReporting.acceptance.test.ts.
```

Both tests fail because `chatOrchestrator.ts` reports only the final provider round's usage (`{inputTokens: 20, outputTokens: 5, totalTokens: 25}`) instead of accumulating token counts across rounds.

All files were formatted with Prettier, committed to `loop-bench/93`, and pushed to upstream `origin/loop-bench/93`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}