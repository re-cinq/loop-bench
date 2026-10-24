Perfect! I've completed the acceptance test definition for ticket #93. Here's what I've delivered:

## Summary

I've created **acceptance tests that FAIL for the right reason**: the orchestrator currently only passes the last round's usage to the `afterModelResponse` hook instead of accumulating usage across all provider calls in a turn.

### Test Results

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator usage accumulation (acceptance) › reports accumulated usage across all tool rounds, not just the last

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 300,
    -   "outputTokens": 125,
    -   "totalTokens": 425,
    +   "inputTokens": 200,
    +   "outputTokens": 75,
    +   "totalTokens": 275,
      }

  ● ChatOrchestrator usage accumulation (acceptance) › handles multiple rounds where some report usage and some do not

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 350,
    -   "outputTokens": 130,
    -   "totalTokens": 480,
    +   "inputTokens": 250,
    +   "outputTokens": 80,
    +   "totalTokens": 330,
      }

Test Suites: 1 failed, 1 total
Tests:       2 failed, 3 passed, 5 total
```

### What the Tests Verify

**File:** `src/orchestration/chatOrchestrator.acceptance.test.ts`

1. **reports accumulated usage across all tool rounds, not just the last** — Two rounds with different usage values should pass their sum (round1 + round2), not round2 alone
2. **preserves the baseline: a turn with no tool calls reports usage as before** — Single-round turns unchanged (backwards compatible)
3. **handles missing usage gracefully** — Rounds without usage don't corrupt the total with NaN or undefined
4. **reports undefined when no rounds report any usage** — Correctly reports undefined when nothing contributed usage
5. **keeps the usage an earlier round reported when a later round reports none** — Existing test remains green, confirming backwards compatibility of the keep-previous logic

### Definition of Done

**File:** `.lore/dod.md`

- **Strategy:** `direct` — The wire (hook parameter) stays the same; only the value passed changes from the last round's usage to the accumulated total
- **Acceptance tests:** 4 tests in the new `.acceptance.test.ts` file, with 5 tests total (2 currently failing for the ticket's stated reason, 3 passing for baseline/edge cases)
- **Scope:** Accumulate usage across rounds while preserving single-round behavior, handle undefined gracefully, update spec and changelog

Commits pushed to `loop-bench/93`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}