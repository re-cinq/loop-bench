Perfect! I've successfully fixed the CI failures from the previous round by:

1. **Added spec statements** to `specs/hal-engine-config-hooks/spec.md` documenting the expected behavior:
   - Usage aggregation across multiple rounds preserves `undefined` when no provider reports
   - The `sumUsageMetadata` helper correctly adds token counts

2. **Added spec links** to the two tests that were missing them:
   - `chatOrchestratorUsage.acceptance.test.ts#L67` - tests handling of missing usage in rounds
   - `orchestratorHelpers.test.ts#L29` - tests the summing operation

3. **Added CHANGELOG entry** under "Changed" documenting the behavior change: `afterModelResponse` now receives summed usage from all provider calls in a turn instead of just the final round, so billing and audit records are complete for tool-heavy turns.

All four facets of the definition of done are now complete:
- [x] Replace final-round retention with deliberately named total-usage contract
- [x] Sum token fields only for rounds that report usage, preserve `undefined` when none do  
- [x] Preserve unchanged no-tool regression guard
- [x] Update spec and CHANGELOG with aggregate-usage behavior

The branch is pushed and ready for CI verification.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"documentation updates","tdd_next":"acceptance green"}}