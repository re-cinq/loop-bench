Perfect! I've completed the first TDD round. Here's what I did:

## Summary

**Red-Green-Refactor Round 1 Complete**

### What I implemented:
1. **Created `accumulateUsage` helper function** in `orchestratorHelpers.ts` that:
   - Sums token fields from multiple provider calls
   - Skips rounds with undefined usage (doesn't poison the total)
   - Returns undefined only when all rounds report no usage

2. **Updated `chatOrchestrator.ts`** to:
   - Use `accumulateUsage` instead of simple override pattern
   - Renamed `lastUsage` to `accumulatedUsage` for clarity about the contract

3. **Added comprehensive tests** in `orchestratorHelpers.test.ts`:
   - Accumulating two defined values ✓
   - Skipping undefined values ✓
   - Handling all-undefined case ✓
   - Initial accumulation ✓

### Test Results:
- ✅ 4 new unit tests for `accumulateUsage` - all passing
- ✅ 24 existing orchestrator tests - all passing (including regression guard "receives collected response text and usage")
- ✅ Total: 32 tests passing, 0 failing

### Facets Completed:
- [x] Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit

### Implementation Notes:
The implementation also satisfies facet 2 (handling undefined rounds) because the helper function was designed with that requirement. The next round should focus on remaining facets: validating behavior through the acceptance tests, and updating the specs/CHANGELOG.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do"}}