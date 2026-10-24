Perfect! I've successfully created and committed the acceptance tests for ticket #93. Here's a summary:

## Acceptance Tests Created

I've written 4 acceptance tests in `/src/orchestration/chatOrchestrator.acceptance.test.ts` that define DONE for the ticket:

1. **"accumulates usage from every tool round and passes the sum to afterModelResponse"** — Tests that when a turn runs two tool rounds with different usage values (round 1: 100/50/150, round 2: 80/30/110), the hook receives the sum (180/80/260). **This test FAILS** as expected because the current implementation only passes the last round's usage.

2. **"preserves single-round usage when no tool round occurs"** — Tests that a turn with no tool calls receives the same usage as before (no regression). **This test PASSES** because single-round behavior is already correct.

3. **"accumulates usage when only some rounds report it"** — Tests that when the first round reports usage but the second doesn't, the accumulated usage from the first round is still passed. **This test PASSES**.

4. **"reports undefined when no round reports usage"** — Tests that when no provider call reports usage, the hook receives `undefined` rather than `NaN` or zeros. **This test PASSES**.

## Test Failure Output

The first acceptance test fails with:

```
expect(received).toEqual(expected)

- Expected  - 3
+ Received  + 3

  Object {
-   "inputTokens": 180,
-   "outputTokens": 80,
-   "totalTokens": 260,
+   "inputTokens": 80,
+   "outputTokens": 30,
+   "totalTokens": 110,
  }
```

This confirms the ticket's claim: the hook receives only the last round's usage (80/30/110) instead of the aggregated total (180/80/260).

## Definition of Done

I've created `.lore/dod.md` documenting the `direct` triage strategy: the seam already exists at the `afterModelResponse` hook, and the fix changes how `lastUsage` is accumulated in the orchestrator's main loop to sum token counts across rounds rather than replace them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}