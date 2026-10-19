I have fixed the lint errors that were causing the CI build to fail for ticket #93.

### Changes Made:
- **Deduplicated Test Helpers:** Created `src/orchestration/chatOrchestratorTestSupport.ts` to house `scriptedProvider` and `TOOL_CALL`, which were duplicated between `chatOrchestrator.test.ts` and `turnUsage.acceptance.test.ts`.
- **Fixed `usageAccumulation.test.ts`:**
  - Added missing spec links to all test cases, linking them to the "Usage reported to afterModelResponse" section in `specs/hal-engine-config-hooks/spec.md`.
  - Restructured the mock `sendMessage` provider to use the shared `scriptedProvider`, resolving a linter error regarding `if/else` structures without `else` branches.
- **Updated Spec Links:** 
  - Added new citations for the `accumulateUsage` unit tests to `specs/hal-engine-config-hooks/spec.md`.
  - Updated all line number anchors in `specs/hal-engine-config-hooks/spec.md`, `specs/hal-engine-architecture/spec.md`, and `specs/hal-engine-tool-input-validation/spec.md` to match the current file states.
- **Verified Fixes:** Ran `usageAccumulation.test.ts` locally to ensure behavioral correctness and used `repoint-spec-anchors.mjs` to verify the integrity of the spec links.

All changed files have been formatted with Prettier and pushed to the repository. The branch has been merged with `origin/main` and is ready for the next CI cycle.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI lint errors and deduplicated test helpers","tdd_next":"acceptance green"}}