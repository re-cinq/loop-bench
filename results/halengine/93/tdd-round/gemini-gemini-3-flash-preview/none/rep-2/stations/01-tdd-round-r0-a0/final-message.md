I have completed the red-green-refactor round for ticket #93. I replaced the final-round usage retention with an explicitly named `TurnUsage` contract that aggregates token counts across every provider round in a turn.

**Summary of changes:**
- **Types:** Added `TurnUsage` in `src/types/ai.ts` to represent aggregated turn usage.
- **Orchestration:** Updated `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` to accumulate `UsageMetadata` across all rounds of the tool loop.
- **Hooks:** Updated the `afterModelResponse` hook signature and call site to pass the accumulated `TurnUsage`.
- **Validation:** Added a new unit test suite `src/orchestration/chatOrchestratorSumming.test.ts` verifying that:
    - Usage is summed correctly across multiple tool rounds.
    - Missing usage in some rounds does not poison the total.
    - A turn with no reported usage remains `undefined`.
- **Documentation:** Updated `CHANGELOG.md` and `specs/hal-engine-architecture/spec.md` to reflect the aggregate usage behavior and its impact on consumers.
- **Regressions:** Verified that the existing no-tool usage test in `src/orchestration/chatOrchestrator.test.ts` remains green.

I have formatted the changed files and updated the `.lore/dod.md` checklist. All facets are now complete and verified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregate-usage behavior and documentation","tdd_next":"acceptance green"}}