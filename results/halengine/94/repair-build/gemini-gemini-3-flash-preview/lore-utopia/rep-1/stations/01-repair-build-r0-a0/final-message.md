I have fixed the build failures reported by CI for ticket #94.

### Research & Diagnosis
The CI reported two failures in the acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
1.  **Type Error**: The `PromptBuilder` constructor was being called with `baseSystemPrompt` and `systemPromptSuffix`, which are no longer part of the `PromptBuilderConfig` interface. The correct field is `identity`.
2.  **ESLint Error**: The test contained three `expect` calls, violating the `re-lint/max-expects` rule which limits tests to a single expectation (or requires combining them into a single object comparison).

### Implementation
- I updated the `PromptBuilder` instantiation in the test to use the `identity` property.
- I refactored the test assertions to use a single `expect` call. I manually caught the rejection from the orchestrator and then performed a single `toEqual` comparison on an object containing the rejected error, the error caught by the `onError` hook, and the execution status of the `afterSession` hook.
- I verified that the core logic in `src/orchestration/chatOrchestrator.ts` already correctly places the `beforeSession` hook inside the `try` block, ensuring that both `onError` and `afterSession` are executed if `beforeSession` throws.

### Verification Results
- **Local Test Run**: `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` passed successfully.
- **Full Suite**: All 517 tests in the repository passed.
- **Formatting**: The modified test file was verified to be correctly formatted using Prettier.
- **Branch State**: The branch was successfully pushed and is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Updated acceptance test to use correct PromptBuilder API and consolidated assertions to satisfy max-expects lint rule."}}