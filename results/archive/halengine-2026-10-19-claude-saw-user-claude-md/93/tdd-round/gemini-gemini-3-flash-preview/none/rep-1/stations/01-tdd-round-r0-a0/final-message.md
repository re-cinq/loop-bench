I have implemented usage accumulation across all tool rounds in the orchestrator, ensuring that `afterModelResponse` receives the total turn usage rather than just the last round's.

1.  **Implemented `accumulateUsage`** in `src/orchestration/orchestratorHelpers.ts` as a pure function to sum field-wise token counts while handling `undefined` values correctly.
2.  **Updated `ChatOrchestrator.processMessageStream`** in `src/orchestration/chatOrchestrator.ts` to use `accumulateUsage` within the tool loop, maintaining a running total.
3.  **Updated `afterModelResponse` signature** and documentation in `src/orchestration/chatOrchestrator.ts` and regenerated the corresponding doc block in `CLAUDE.md`.
4.  **Refactored `specs/hal-engine-config-hooks/spec.md`** by removing the "under-counting" bullet from the out-of-scope section and re-anchoring links to the orchestrator.
5.  **Added a CHANGELOG entry** under the "Unreleased" section, noting the behavior change and migration impact.
6.  **Verified the fix** with a new unit and integration test suite in `src/orchestration/usageAccumulation.test.ts`, which covers accumulation logic and multi-round orchestrator behavior.

I ran the new tests locally and they passed. I did not run the acceptance tests as per the instructions, but the implementation directly addresses the criteria they verify.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate per-round usage into a running turn total","tdd_next":"acceptance green"}}