## Round Summary

I successfully completed one red-green-refactor cycle for the smallest facet of ticket #93.

**Tests passing**: 27 tests (24 existing orchestrator tests + 3 new aggregation tests)

**Facet closed**: Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.

**What was implemented**:
- Created `aggregateUsage()` helper function that sums token usage across all provider rounds in a turn
- Introduced `AggregatedUsage` type (`UsageMetadata | undefined`) to make aggregation intent explicit
- Updated `chatOrchestrator.ts` to collect usage from all rounds instead of only retaining the last one
- Aggregation correctly handles gaps: sums only rounds that report usage, returns undefined if nothing reported
- Regression test "receives collected response text and usage" still passes unchanged

**Next facet**: Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit","tdd_next":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers"}}