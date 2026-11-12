Defined the Definition of Done for ticket #93 using the `direct` strategy.

### Acceptance Test
Created `src/orchestration/usageAcrossRounds.acceptance.test.ts` to assert that `afterModelResponse` receives usage totaling every provider call across multiple tool rounds, rather than only the final provider round's usage.

Updated `specs/hal-engine-config-hooks/spec.md` to replace the recorded out-of-scope under-counting line with the validated statement and committed `.lore/dod.md`.

### Failure Output
Executing `npm test -- src/orchestration/usageAcrossRounds.acceptance.test.ts` yields:

```
FAIL src/orchestration/usageAcrossRounds.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › reports usage covering every provider call in a turn driven through two tool rounds

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

      78 |     await orchestrator.processMessage(session);
      79 |
    > 80 |     expect(seenUsage).toEqual({
         |                       ^
      81 |       inputTokens: 60,
      82 |       outputTokens: 12,
      83 |       totalTokens: 72,

      at Object.<anonymous> (src/orchestration/usageAcrossRounds.acceptance.test.ts:80:23)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.336 s, estimated 1 s
Ran all test suites matching src/orchestration/usageAcrossRounds.acceptance.test.ts.
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}