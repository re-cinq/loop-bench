Perfect! I've completed the final facet of ticket #93. Here's what was accomplished:

## Summary

The code implementation for aggregating usage across all tool rounds was already complete. This round focused on **documenting the behavior change** — the final facet required by the definition of done.

**What I did:**

1. **Added a CHANGELOG entry** documenting the breaking change for existing `afterModelResponse` hook consumers:
   - Explained that the hook now receives summed usage across all provider calls, not just the final one
   - Noted the impact: billing/auditing consumers will now record correct totals for tool-heavy turns
   - Clarified this is a MINOR version bump with a clear migration note

2. **Verified the spec** was already updated with the correct statement about aggregated usage

3. **Updated `.lore/dod.md`** to check off the final facet as complete

The implementation in the code was already in place:
- `chatOrchestrator.ts` collects `roundUsages` from each provider call
- `usageAggregation.ts` sums them (filtering undefined, returning undefined if none reported)
- The hook receives the aggregated total via `aggregateUsage(roundUsages)`
- The no-tool regression test remains green (unchanged behavior for single-round turns)

All files formatted and committed successfully.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers","tdd_next":"acceptance green"}}