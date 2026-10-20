I have implemented multi-round usage aggregation for the `afterModelResponse` hook. The orchestrator now sums token counts from every provider call in a turn, rather than only reporting the final round's usage.

Key changes:
- **Aggregate Usage Contract**: Introduced the `TotalUsage` interface in `src/types/ai.ts` and renamed the hook parameter to `totalUsage` in `OrchestratorHooks` to make the aggregation explicit.
- **Summing Logic**: Added a `sumUsage` helper in `src/orchestration/orchestratorHelpers.ts` that safely aggregates `inputTokens`, `outputTokens`, and `totalTokens`, preserving `undefined` if no rounds report usage.
- **Orchestrator Update**: Modified `chatOrchestrator.ts` to accumulate usage across all tool rounds and pass the total to the hook.
- **Documentation**: Updated `CHANGELOG.md` to document this behavior change and the migration requirement for consumers to use the renamed `totalUsage` parameter.
- **Test Alignment**: Updated existing orchestrator and tool budget tests to use the new hook signature and verified that no-tool turns remain unaffected.

I verified the implementation with a new facet test suite (reproducing the summing requirement and gap handling) before integrating and formatting the code. All orchestrator-layer tests passed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reports the summed usage from every provider call in a turn with two tool rounds","tdd_next":"acceptance green"}}