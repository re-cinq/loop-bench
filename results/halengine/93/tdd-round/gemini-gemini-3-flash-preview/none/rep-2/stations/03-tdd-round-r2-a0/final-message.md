I have completed the round by addressing the ESLint failures reported by CI and ensuring the repository's engineering standards for traceability and code duplication are met.

**Work Completed:**
1.  **Resolved Code Duplication:** Created `src/orchestration/orchestratorTestSupport.ts` and moved the `scriptedProvider` helper there. This utility was previously duplicated across `chatOrchestrator.test.ts`, `chatOrchestratorSumming.test.ts`, and `chatOrchestratorUsage.acceptance.test.ts`. I also introduced an `EXPECTED_SUM` constant in the summing tests to eliminate duplicate assertion blocks.
2.  **Fixed Traceability Errors:** Added the missing `[validated by: <title>]` statements to `specs/hal-engine-config-hooks/spec.md` for the no-tool regression guard and the new usage summing behaviors.
3.  **Aligned Test Titles:** Updated test titles in `src/orchestration/chatOrchestratorSumming.test.ts` and `src/orchestration/chatOrchestratorUsage.acceptance.test.ts` to ensure a 1:1 match with the "validated by" text in the specifications, satisfying the `re-lint/require-spec-link` rule.
4.  **Re-anchored Spec Links:** Manually updated all `#Lnn` links in `specs/hal-engine-architecture/spec.md`, `specs/hal-engine-config-hooks/spec.md`, and `specs/hal-engine-tool-input-validation/spec.md` to point to the correct line numbers in the modified test files. Verified the fixes by running `scripts/repoint-spec-anchors.mjs`, which now reports that all anchors are up to date.
5.  **Verified Behavior:** Ran the relevant unit and acceptance tests to confirm that the implementation remains correct and that the new shared test utilities work as expected.

All facets in `.lore/dod.md` are closed, and the lint-related build blockers have been resolved.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix ESLint errors and re-anchor spec links","tdd_next":"acceptance green"}}