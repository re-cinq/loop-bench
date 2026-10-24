Perfect! I've successfully created the acceptance tests for HALEngine#93. Here's what I've delivered:

## Summary

I've written 4 acceptance tests in `src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts` that define the ticket's requirements:

**Tests that currently FAIL (showing the issue):**
1. **accumulates usage from two tool rounds into a single sum** — A turn with round 1 usage {10,5,15} and round 2 usage {3,2,5} should report {13,7,20}, but currently reports only {3,2,5} (the last round)
2. **handles a middle round with no usage report by summing the rounds that reported** — When round 1 reports {10,5,15}, round 2 reports nothing, and round 3 reports {2,1,3}, should sum to {12,6,18}, but currently reports only {2,1,3}

**Tests that PASS (backward compatibility):**
3. **reports the same usage for a turn with no tool calls as it does today** — Single-round turns continue to work correctly
4. **reports undefined when no round reports usage** — Properly handles the case where no round reports usage

## Test Failure Output

```
Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 passed, 4 total

FAIL: accumulates usage from two tool rounds into a single sum
  Expected: {inputTokens: 13, outputTokens: 7, totalTokens: 20}
  Received: {inputTokens: 3, outputTokens: 2, totalTokens: 5}
  (only the last round's usage)

FAIL: handles a middle round with no usage report by summing the rounds that reported
  Expected: {inputTokens: 12, outputTokens: 6, totalTokens: 18}
  Received: {inputTokens: 2, outputTokens: 1, totalTokens: 3}
  (only the final round's usage)
```

The tests fail for the **exact reason the ticket states**: `afterModelResponse` hook currently receives only the last round's usage, not the accumulated total across all tool rounds in a turn.

**Strategy:** Direct — the orchestrator's `afterModelResponse` hook call site (line 148 in chatOrchestrator.ts) already exists as a seam, so tests call the real entry point and fail on the missing behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}