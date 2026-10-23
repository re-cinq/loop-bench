Perfect! I've completed the fourth and final facet. Here's what I did in this round:

1. **Added JSDoc to the `afterModelResponse` hook** to make it unambiguous that the `usage` parameter contains the summed provider-call usage across all rounds in the turn, not just the final call.

2. **Updated the CHANGELOG** with a new "Changed" section explaining the behavior change: `afterModelResponse` now receives the total cost of all tool rounds instead of just the final provider call. This documents the impact on existing consumers who use this hook for billing or audit, with a migration note.

3. **Marked the fourth facet as complete** in `.lore/dod.md`.

The implementation of usage aggregation was already in place from previous rounds—the orchestrator accumulates usage across all provider calls using the `sumUsage` function and passes the total to the `afterModelResponse` hook. The acceptance tests defined in `chatOrchestratorUsage.acceptance.test.ts` validate this behavior (a two-tool-round turn reports summed usage: 11+23+37=71 inputTokens, etc.).

The changes have been committed and pushed. All four facets are now complete:
- ✓ Aggregate usage contract  
- ✓ Sum with undefined handling  
- ✓ No-tool regression guard  
- ✓ Spec and CHANGELOG updates with clear typing

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers","tdd_next":"acceptance green"}}