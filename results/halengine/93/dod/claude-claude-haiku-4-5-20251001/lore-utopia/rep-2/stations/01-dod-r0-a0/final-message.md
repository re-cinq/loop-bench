Perfect! I've defined the acceptance tests for ticket #93. Here's what was delivered:

## Summary

**Files created:**
1. **`src/orchestration/chatOrchestrator.acceptance.test.ts`** — 8 comprehensive acceptance tests
2. **`.lore/dod.md`** — Definition of Done document

### Test Results (RED BAR - Tests Failing as Expected)

```
Test Suites: 1 failed, 1 total
Tests:       3 failed, 5 passed, 8 total
```

**Failing tests (feature not yet implemented):**
1. ✗ `accumulates usage across two tool rounds and reports the sum to afterModelResponse`
   - Expected: `{inputTokens: 25, outputTokens: 13, totalTokens: 38}` (sum of both rounds)
   - Received: `{inputTokens: 15, outputTokens: 8, totalTokens: 23}` (only last round)

2. ✗ `handles three tool rounds accumulating usage across all of them`
   - Expected: `{inputTokens: 30, outputTokens: 12, totalTokens: 42}` (sum of all three)
   - Received: `{inputTokens: 8, outputTokens: 3, totalTokens: 11}` (only last round)

3. ✗ `accumulates usage with partial zero rounds in the middle`
   - Expected: `{inputTokens: 13, outputTokens: 5, totalTokens: 18}` (sum of reported rounds)
   - Received: `{inputTokens: 8, outputTokens: 3, totalTokens: 11}` (only last round)

**Passing tests (backward compatibility verified):**
- ✓ Reports single-round usage unchanged (non-tool turns)
- ✓ Handles round with no usage followed by round with usage
- ✓ Handles round with usage followed by round with no usage
- ✓ Handles zero usage across all rounds
- ✓ Handles usage with missing values gracefully (no NaN/undefined)

### Acceptance Criteria Coverage

The tests define what "done" means per the ticket's requirements:
- ✓ Turn with two tool rounds reports usage covering every provider call
- ✓ Turn with no tool calls reports exactly what it reports today (backward compatible)
- ✓ Provider reporting no usage on some rounds doesn't produce undefined/NaN
- ✓ Scale validation: tests verify 2-round and 3-round scenarios
- ✓ Type safety: fixture setup ensures UsageMetadata structure is preserved

The tests are committed and pushed to the branch. CI will verify they fail for the stated reason (usage not accumulated) and will pass once the implementation is complete.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}