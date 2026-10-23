Perfect! The round is complete. Let me summarize what was accomplished:

## This Round

**Strategy**: Direct — verify the usage accumulation through the real tool loop using scripted provider rounds.

**RED phase**: Created a failing test that verifies `afterModelResponse` receives accumulated usage from two tool rounds (expected {inputTokens: 34, outputTokens: 5, totalTokens: 39} but was getting just the last round's {inputTokens: 23, outputTokens: 3, totalTokens: 26}).

**GREEN phase**: Implemented accumulation by:
- Importing `accumulateUsage` from `usageAccumulator.ts`
- Changing `lastUsage = outcome.usage ?? lastUsage;` to `lastUsage = accumulateUsage(lastUsage, outcome.usage);`

**REFACTOR phase**: Verified all tests pass (25 in chatOrchestrator.test.ts, 4 in usageAccumulator.test.ts), including the regression guard for single-round (no-tool) behavior.

**Facets completed**:
- ✅ Replace final-round retention with a deliberately named total-usage contract
- ✅ Sum token fields only for reporting rounds (already done, preserved)
- ✅ Preserve unchanged no-tool regression guard (verified)

**Facet remaining**:
- ⬜ Update the hooks spec and CHANGELOG with the aggregate-usage behavior

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"replace final-round retention with accumulated contract","tdd_next":"update specs and CHANGELOG"}}