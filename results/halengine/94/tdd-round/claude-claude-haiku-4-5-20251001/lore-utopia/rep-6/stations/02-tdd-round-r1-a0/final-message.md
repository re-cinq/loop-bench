## Summary

I've completed this round by fixing the CI failures that were blocking the build:

### What I Fixed

1. **TypeScript error**: Fixed incorrect PromptBuilder config in `chatOrchestrator.beforeSession.acceptance.test.ts` (changed `baseSystemPrompt` to `identity`)

2. **ESLint errors**: Refactored tests to comply with the `max-expects` rule (1 expect per test):
   - Refactored the acceptance test to combine three assertions into one object comparison
   - Refactored an existing test in `chatOrchestrator.test.ts` that had 2 expect calls

3. **Spec anchor drift**: Updated line number references in spec files (`hal-engine-config-hooks`, `hal-engine-architecture`, `hal-engine-tool-input-validation`) due to test line shifts

### Current State

- The acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` now validates that when `beforeSession` throws:
  - The error reaches the caller as a rejection
  - The `onError` hook is invoked with the error
  - The `afterSession` hook runs

- The implementation (moving `beforeSession` inside the try block in `chatOrchestrator.ts`) was already completed in the previous round

- All changes have been committed and pushed; the branch is up to date with main

The next round should update the specs and CHANGELOG to document the new guarantee for `beforeSession`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI errors blocking acceptance test","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}