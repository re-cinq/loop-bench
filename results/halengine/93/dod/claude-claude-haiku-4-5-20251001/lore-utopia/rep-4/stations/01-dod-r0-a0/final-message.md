Perfect! I've created comprehensive acceptance tests for ticket #93. Here's a summary of what was done:

## Acceptance Tests Created

I created 5 acceptance tests in `src/orchestration/usage-accumulation.acceptance.test.ts` that validate the ticket's requirements:

### Test Results: **3 Failed (RED), 2 Passed (GREEN)**

**Failed tests (defining the new behavior):**

1. **accumulates usage from every tool round, not just the last**
   - Expected: `{inputTokens: 18, outputTokens: 8, totalTokens: 26}` (sum of two rounds)
   - Received: `{inputTokens: 8, outputTokens: 3, totalTokens: 11}` (only last round)
   - ✗ Fails because the orchestrator only keeps the last round's usage

2. **accumulates usage when some rounds report and others do not**
   - Expected: `{inputTokens: 18, outputTokens: 8, totalTokens: 26}` (from all reporting rounds)
   - Received: `{inputTokens: 10, outputTokens: 5, totalTokens: 15}` (only first reported round)
   - ✗ Fails because skipped rounds aren't included in the accumulation

3. **accumulates usage from three consecutive tool rounds**
   - Expected: `{inputTokens: 15, outputTokens: 6, totalTokens: 21}` (sum of all three)
   - Received: `{inputTokens: 6, outputTokens: 3, totalTokens: 9}` (only last round)
   - ✗ Fails as accumulation isn't implemented across 3+ rounds

**Passed tests (ensuring backward compatibility):**

4. **reports the single round usage unchanged when only one round runs** — ✓ Passes (single-round behavior is already correct)
5. **reports undefined when no round reports usage** — ✓ Passes (undefined handling already works)

## Definition of Done

The `.lore/dod.md` file documents the strategy (`direct` — the seam already exists in `chatOrchestrator.ts` at the `afterModelResponse` call site) and the five acceptance criteria the tests validate:
- Multi-round accumulation works correctly
- Single-round behavior unchanged (backward compatible)  
- Partial reporting handled correctly (sum only what's reported)
- Undefined passed when nothing reports
- Multi-round edge cases work

The tests fail for the right reason: line 117 in `chatOrchestrator.ts` currently does `lastUsage = outcome.usage ?? lastUsage`, which only keeps the most recent round's usage. Once that line is changed to accumulate across rounds, these tests will pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}