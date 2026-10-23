## Summary

I've defined the acceptance tests for ticket #93: "Report usage across every tool round, not just the last."

**The central claim** (from the ticket): The `afterModelResponse` hook currently receives only the last round's usage when a turn involves multiple tool calls, under-counting expensive tool-heavy turns in billing and audit logs.

**Strategy: `direct`** — The hook call already exists as a seam in `chatOrchestrator.ts#L148`. The acceptance tests install a hook and assert on what it receives. The implementation will modify how `lastUsage` is accumulated across rounds.

**Acceptance tests written:**

1. **reports accumulated usage across multiple tool rounds, not just the last** — A turn with two tool rounds (round 1: inputTokens=100, outputTokens=50; round 2: inputTokens=200, outputTokens=75) should pass the summed total (inputTokens=300, outputTokens=125, totalTokens=425) to the hook. This test **FAILS** because the current code only keeps the last round's usage.

2. **reports exact same usage for a turn with no tool calls** — A single-round turn reports usage exactly as received. This test **PASSES** (regression protection).

3. **handles missing usage in some rounds without producing NaN or undefined** — When round 1 reports usage but round 2 doesn't, the hook receives round 1's usage without NaN. This test **PASSES** (edge case handled).

4. **handles both rounds reporting no usage without producing NaN or undefined** — When neither round reports usage, the hook receives undefined, not NaN. This test **PASSES** (edge case handled).

**Failure output for the core test:**
```
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
```

The tests confirm the ticket's claim: the hook receives only the last round's usage (200, 75, 275) instead of the accumulated sum (300, 125, 425).

Tests committed and pushed to the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}