I have fixed the red build by addressing the failures in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`.

### Changes made:
- **Fixed Type Errors:** Updated the `PromptBuilder` instantiation to use the correct `identity` property, as `baseSystemPrompt` and other previously used properties were not part of the `PromptBuilderConfig` type.
- **Fixed ESLint Error:** Consolidated three `expect` calls into a single assertion using a `try/catch` block and `toEqual`. This satisfies the `re-lint/max-expects` rule which limits tests to one expect call.
- **Verification:**
    - The `beforeSession.acceptance.test.ts` now passes locally.
    - Existing orchestrator tests (`chatOrchestrator.test.ts`) continue to pass.
    - All changed TypeScript files were verified to be correctly formatted.
- **Deployment:** Committed the changes and pushed them to the branch. Merged `origin/main` to ensure the branch is up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed PromptBuilder config and consolidated expects in chatOrchestrator.beforeSession.acceptance.test.ts"}}