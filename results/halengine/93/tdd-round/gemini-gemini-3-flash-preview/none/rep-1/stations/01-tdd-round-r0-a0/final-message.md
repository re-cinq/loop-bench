I've completed the implementation of aggregated usage reporting for the `afterModelResponse` hook. 

Key changes include:
- **Defined `TurnUsage` type**: Introduced a dedicated interface in `src/types/ai.ts` that extends `UsageMetadata` to explicitly represent turn-level aggregation while maintaining backward compatibility.
- **Implemented `aggregateUsage`**: Added a helper in `src/orchestration/orchestratorHelpers.ts` to sum token counts across multiple provider calls, correctly handling rounds with no reported usage.
- **Refactored Orchestrator**: Updated `src/orchestration/chatOrchestrator.ts` to accumulate usage in each tool round and pass the total to the `afterModelResponse` hook.
- **Updated Documentation**: Added an entry to `CHANGELOG.md` explaining the behavior change and the minor version bump impact.
- **Verified Behavior**: Confirmed the fix with a new multi-round test case and ensured no regressions in the existing single-round regression suite.

All facets in `.lore/dod.md` are checked off, and the implementation now satisfies the requirement to report the full cost of tool-heavy turns.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.","tdd_next":"acceptance green"}}