I have completed the round for ticket #93, "Report usage across every tool round, not just the last". I've implemented a new `TurnUsage` contract that aggregates token counts across every provider call in a turn, providing both a summed `total` and a per-round `rounds` breakdown.

### Changes Made
- **Types:** Added `TurnUsage` interface to `src/types/ai.ts` to represent aggregated usage.
- **Orchestrator Logic:** 
    - Updated `src/orchestration/chatOrchestrator.ts` to collect usage from every round in a turn.
    - Implemented `summarizeUsage` in `src/orchestration/orchestratorHelpers.ts` to sum token fields while correctly handling rounds that report no usage.
    - Changed the `afterModelResponse` hook signature to accept `TurnUsage` instead of `UsageMetadata`.
- **Tests:**
    - Created `src/orchestration/chatOrchestratorUsage.facet.test.ts` to verify that the hook receives correctly aggregated usage and per-round data, including handling of unreported turns.
    - Updated `src/orchestration/chatOrchestrator.test.ts` to maintain compatibility with the new `TurnUsage` contract, ensuring the existing regression guard `receives collected response text and usage` remains green.
- **Documentation:**
    - Updated `specs/hal-engine-config-hooks/spec.md` to reflect the new `TurnUsage` behavior and added validation links to the new facet test.
    - Added an entry to `CHANGELOG.md` under `[Unreleased]` documenting the behavior change for existing hook consumers.
- **Checklist:** Updated `.lore/dod.md` by ticking off all completed facets.

### Verification
I verified the changes by running the new facet test file with `vitest` (2 passed) and the existing orchestrator tests with `jest` (24 passed). I also ran the repository's formatter and spec re-anchoring script to ensure structural integrity.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"acceptance green"}}