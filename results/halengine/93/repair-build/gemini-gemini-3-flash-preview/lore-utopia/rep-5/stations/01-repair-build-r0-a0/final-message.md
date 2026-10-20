I fixed the ESLint failures in `src/orchestration/orchestratorHelpers.test.ts` by adding the required spec links to the `it` blocks and combining multiple `expect` calls into a single assertion to satisfy the `re-lint/max-expects` rule. 

To fulfill the acceptance criteria for ticket #93 regarding an unambiguous API, I introduced `TotalUsageMetadata` as a type alias for `UsageMetadata` in `src/types/ai.ts` and updated the `afterModelResponse` hook signature in `src/orchestration/chatOrchestrator.ts` to use this type and rename its third parameter to `totalUsage`. I also updated the orchestrator's internal `lastUsage` variable to `totalUsage`, and propagated these name and type changes to the spec, examples, and tests for consistency.

I verified the fix by running the affected tests, which passed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed ESLint failures in orchestratorHelpers.test.ts and made afterModelResponse signature unambiguous by using TotalUsageMetadata."}}