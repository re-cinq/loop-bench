Fixed a type error and an ESLint violation in the acceptance test file that were causing the CI build to fail.

The type error in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` was caused by outdated property names in the `PromptBuilder` configuration (`baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig` did not exist in the current `PromptBuilderConfig` type). I updated the instantiation to use the correct `identity` and `domainContext` properties.

The ESLint error (`re-lint/max-expects`) was triggered because the test had three `expect` calls, exceeding the allowed limit of one. I refactored the test to capture the rejection and hook results into a single object, then asserted on that object using a single `toEqual` call.

I verified the fix by running the acceptance test and the core orchestrator tests locally, all of which passed. I also confirmed that the branch is up to date with `origin/main` and that the changes have been pushed to the remote repository.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed type error and ESLint max-expects violation in acceptance test."}}