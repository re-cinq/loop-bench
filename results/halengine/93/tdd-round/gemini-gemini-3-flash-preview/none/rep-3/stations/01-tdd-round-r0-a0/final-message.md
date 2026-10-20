I have completed the TDD round for implementing aggregate usage reporting across tool rounds.

### Changes Summary

1.  **New Type Definition**: Added `TurnUsage` in `src/types/ai.ts`, extending `UsageMetadata`. This provides a deliberately named contract for aggregated usage, as required by the ticket.
2.  **Orchestrator Refactoring**:
    *   Updated `OrchestratorHooks` in `src/orchestration/chatOrchestrator.ts` to use `TurnUsage` for the `afterModelResponse` hook.
    *   Replaced `lastUsage` with `turnUsage` in `processMessageStream`.
    *   Implemented logic to sum `inputTokens`, `outputTokens`, and `totalTokens` from every provider round that reports usage.
    *   Ensured that a turn with no reported usage remains `undefined`.
3.  **Documentation**:
    *   Updated `CHANGELOG.md` to document the behavior change and the new `TurnUsage` type.
    *   Updated `specs/hal-engine-config-hooks/spec.md` to fix a shifted line number link for the `onError` boundary.
4.  **Verification**:
    *   Created `src/orchestration/chatOrchestratorUsage.test.ts` with test cases for multi-round aggregation, turns with missing usage data, and turns with no usage.
    *   Verified that existing unit tests in `src/orchestration/chatOrchestrator.test.ts` pass, including the no-tool regression guard.
    *   Ran Prettier to ensure consistent formatting.
    *   Ran `repoint-spec-anchors.mjs` to maintain spec link integrity.

All facets in `.lore/dod.md` are now ticked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregate usage reporting with TurnUsage contract","tdd_next":"acceptance green"}}