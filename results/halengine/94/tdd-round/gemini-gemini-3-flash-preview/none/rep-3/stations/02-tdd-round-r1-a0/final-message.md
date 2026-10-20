Fixed type and lint errors in the `beforeSession` tests and updated the spec validation links.

Changes:
- **`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`**: Corrected `PromptBuilder` configuration, added a spec link, and consolidated multiple `expect` calls into a single object assertion to satisfy the `max-expects` lint rule.
- **`src/orchestration/chatOrchestrator.beforeSession.test.ts`**: Consolidated expectations into a single `expect` call.
- **`specs/hal-engine-config-hooks/spec.md`**: Added a validation link for the acceptance test and updated the unit test link to the correct line number.
- **Verification**: Ran `src/orchestration/chatOrchestrator.beforeSession.test.ts` with `jest`, which passed. The acceptance test was not run locally as per instructions but was fixed based on CI findings.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"runs onError and afterSession when beforeSession throws","tdd_next":"acceptance green"}}