Perfect! I've completed one red-green-refactor round. Here's what I delivered:

## Summary

**RED**: Wrote a test for `sumAggregateUsage` function with 4 cases covering aggregation and undefined handling.

**GREEN**: Implemented `sumAggregateUsage` to sum token counts across multiple provider calls, filtering out undefined values.

**REFACTOR**: Updated the orchestrator to:
- Collect usage from each round in an array instead of overwriting `lastUsage`
- Sum all rounds' usage before passing to `afterModelResponse`
- Verified the regression guard test still passes (single-round turns unchanged)

All tests pass:
- 8 tests in orchestratorHelpers.test.ts (new aggregation tests + existing helper tests)
- 24 tests in chatOrchestrator.test.ts (regression guard verified)

I've closed 3 facets: the deliberately-named aggregation contract, the summing logic with undefined preservation, and the regression guard. The specs/CHANGELOG update remains for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum usage across rounds with undefined handling","tdd_next":"Update specs and CHANGELOG"}}