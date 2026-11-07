I have completed the round by fixing the CI failures introduced in the previous round.

### Changes made:
- **Test Consolidation**: Merged `src/orchestration/chatOrchestrator.beforeSession.test.ts` into `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. This resolved the `re-lint/no-duplicate-code` ESLint error.
- **Type Safety**: Corrected the `PromptBuilder` configuration in the acceptance test. It was using `baseSystemPrompt` instead of the required `identity` property, causing a typecheck failure.
- **Lint Fixes**:
  - Reduced the number of `expect` calls to one per test by asserting on a single object using `toEqual`. This satisfies the `re-lint/max-expects` rule.
  - Added the required spec link to the acceptance test and ensured it matches the statement in `specs/hal-engine-config-hooks/spec.md`.
- **Traceability**: Updated the line number citation in `specs/hal-engine-config-hooks/spec.md` to point to the correct start of the test (line 35).
- **Verification**: Ran the specific acceptance test locally using Jest, and it passed successfully.

I have committed and pushed the changes, and merged `origin/main` to ensure the branch is up to date for CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"runs onError and afterSession when beforeSession throws","tdd_next":"acceptance green"}}