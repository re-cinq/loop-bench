Perfect! I've completed one red-green-refactor round. Here's what I did:

## Summary

**RED:** Wrote failing unit tests for a new `sumUsage` helper function that aggregates usage across rounds while handling missing/undefined values.

**GREEN:** Implemented `sumUsage` in orchestratorHelpers.ts that:
- Filters out undefined usage entries  
- Returns undefined only if no usage was ever reported
- Sums token counts across all reported rounds

**REFACTOR:** Updated the orchestrator to:
- Replace `lastUsage` with `roundUsages` array (deliberately named to clarify aggregation)
- Collect each round's usage via `roundUsages.push(outcome.usage)`
- Pass `sumUsage(roundUsages)` to afterModelResponse hook instead of lastUsage

This implements aggregation across all provider calls in a turn. All 24 existing unit tests pass, including the regression guard test that verifies no-tool turns still work correctly.

**Facets completed:**
- ✓ Facet 1: Deliberately named total-usage contract with explicit type
- ✓ Facet 2: Sum each token field, preserving undefined when none report
- ✓ Facet 3: Preserve unchanged no-tool regression guard test

**Facet remaining for next round:**
- Facet 4: Update hooks spec and CHANGELOG

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregation logic (sumUsage helper and orchestrator integration)","tdd_next":"spec and CHANGELOG update"}}