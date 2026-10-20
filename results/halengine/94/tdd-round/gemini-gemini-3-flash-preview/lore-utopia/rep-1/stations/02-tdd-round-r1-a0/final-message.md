I have completed the round by resolving the CI failures and ensuring the tests for `beforeSession` failure behavior are green and properly integrated.

### Summary of Work
- **Fixed Acceptance Test**: Corrected `PromptBuilder` configuration type errors and consolidated assertions to satisfy the `max-expects` ESLint rule in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`.
- **Fixed Unit Test**: Converted `src/orchestration/chatOrchestrator.beforeSession.test.ts` from Vitest to Jest, resolved code duplication with the acceptance test, and added the missing spec link.
- **Updated Documentation**: Added the unit test link to `specs/hal-engine-config-hooks/spec.md` and corrected the line number for the acceptance test link to ensure accurate traceability.
- **Verification**: Confirmed that both tests pass locally using the project's Jest runner and verified that all modified files comply with Prettier formatting.
- **Finality**: Committed and pushed the fixes, ensuring the branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"runs onError and afterSession when beforeSession throws","tdd_next":"acceptance green"}}