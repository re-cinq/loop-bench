I have defined DONE for ticket #93 by writing executable acceptance tests that fail because the `afterModelResponse` hook currently under-reports usage in tool-heavy turns.

I have:
1. Created `.lore/dod.md` with the strategy and the new acceptance tests.
2. Created `src/orchestration/usage-accumulation.acceptance.test.ts` containing three acceptance tests:
   - `accumulates usage across every tool round, not just the last` (Expected to FAIL)
   - `reports correct usage for a single round turn` (Passing today)
   - `ignores rounds with missing usage in the total` (Passing today)
3. Updated `specs/hal-engine-config-hooks/spec.md` to rephrase the under-counting behavior as a requirement for accumulated usage, linked to the new test at line 42.
4. Verified that the primary acceptance test fails for the correct reason: it receives the usage of the last round only, rather than the sum of all rounds.

The failing test output is:
```
FAIL src/orchestration/usage-accumulation.acceptance.test.ts
  ● Usage accumulation (acceptance) › accumulates usage across every tool round, not just the last

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 30,
    -   "outputTokens": 15,
    -   "totalTokens": 45,
    +   "inputTokens": 20,
    +   "outputTokens": 10,
    +   "totalTokens": 30,
      }
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}