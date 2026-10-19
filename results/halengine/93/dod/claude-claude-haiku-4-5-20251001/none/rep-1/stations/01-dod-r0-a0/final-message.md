Perfect! I have successfully defined the acceptance tests for ticket #93. Here's what I've completed:

## Summary

I've written **5 acceptance tests** in `src/orchestration/chatOrchestrator.acceptance.test.ts` that define what "done" means for this ticket:

### Test Results

```
Test Suites: 1 failed, 1 total
Tests:       2 failed, 3 passed, 5 total
```

### Failing Tests (Red Bar)

1. **"sums usage from multiple tool rounds when both report usage"**
   - Expected: `{inputTokens: 25, outputTokens: 15, totalTokens: 40}` (sum of both rounds)
   - Received: `{inputTokens: 15, outputTokens: 10, totalTokens: 25}` (only last round)

2. **"correctly accumulates usage from three tool rounds"**
   - Expected: `{inputTokens: 30, outputTokens: 15, totalTokens: 45}` (sum of all three)
   - Received: `{inputTokens: 12, outputTokens: 7, totalTokens: 19}` (only last round)

### Passing Tests (Regression Check)

The other 3 tests confirm no regression:
- "reports unchanged usage for a turn with no tool calls" ✓
- "handles partial usage reporting across rounds" ✓
- "reports no usage when no rounds report any" ✓

### Definition of Done

I've created `.lore/dod.md` documenting:
- **Strategy**: `direct` — The hook seam already exists; we just need to change how `lastUsage` is accumulated
- **Central claim** (quoted verbatim from ticket): "Report usage across every tool round, not just the last"
- **Facets**: Implementation steps from helper function through spec/changelog updates
- **Out of scope**: Audit/billing implementation, the choice between accumulation vs breakdown

The tests are failing because the current code at line 117 of `chatOrchestrator.ts` simply replaces `lastUsage` with each round's usage (`lastUsage = outcome.usage ?? lastUsage`), so only the final round's usage is ever reported to the `afterModelResponse` hook.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}