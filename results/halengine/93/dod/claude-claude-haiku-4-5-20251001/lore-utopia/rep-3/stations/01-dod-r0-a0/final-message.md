Perfect! I've successfully written and committed the acceptance tests for ticket #93. Here's a summary of what I've delivered:

## Acceptance Tests Created

I created `src/orchestration/chatOrchestrator.acceptance.test.ts` with 4 test cases that define when the ticket is done:

### Test Results (Red as expected):

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● accumulates usage across all rounds and passes the total to afterModelResponse

    Expected: {inputTokens: 300, outputTokens: 55, totalTokens: 355}
    Received: {inputTokens: 50, outputTokens: 10, totalTokens: 60}

  ● counts rounds that reported and skips those that did not

    Expected: {inputTokens: 150, outputTokens: 30, totalTokens: 180}
    Received: {inputTokens: 50, outputTokens: 10, totalTokens: 60}

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 passed, 4 total
```

### The Tests Verify

1. **Accumulation across tool rounds** — When a turn runs two tool rounds with usage {100, 20, 120} and {150, 25, 175}, then a third final round with {50, 10, 60}, the hook receives the sum of all three: {300, 55, 355}. Currently, it only gets the last round {50, 10, 60}.

2. **Backward compatibility** — A turn with no tool calls still receives exactly one usage object unchanged (✅ passes).

3. **Handling missing usage** — When round 2 doesn't report usage but rounds 1 and 3 do, the hook should get {150, 30, 180} (sum of reported only), not NaN or undefined.

4. **All missing usage** — When no rounds report usage, the hook receives undefined (✅ passes).

### Definition of Done

Created `.lore/dod.md` that quotes the ticket's central claim and documents the `direct` strategy: the `afterModelResponse` hook call site is a direct seam that currently assigns `lastUsage = outcome.usage ?? lastUsage` on each round (line 117), keeping only the final value.

The tests directly invoke the orchestrator's real entry point and assert what the hook receives, failing exactly because the current implementation doesn't accumulate usage.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}