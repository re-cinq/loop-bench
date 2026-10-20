I fixed the red build by addressing the typecheck and ESLint errors in the acceptance test for the `beforeSession` hook.

1.  **Typecheck Error**: Updated `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` to use the correct `identity` property in the `PromptBuilder` constructor, as `baseSystemPrompt` and other properties were not present in the `PromptBuilderConfig` interface.
2.  **ESLint Error**: Combined three `expect` calls into a single assertion using `toEqual` in the same test file to satisfy the `re-lint/max-expects` rule (which limits tests to one expectation).
3.  **Spec Update**: Updated the line number reference in `specs/hal-engine-config-hooks/spec.md` to point to the correct line in the modified test file.

I verified the fix by running the specific test file locally using the project's test command, and it passed successfully. I also ensured the changed files are formatted and pushed all changes to the repository, including a merge with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Resolved typecheck (unknown properties in PromptBuilder) and ESLint (max-expects) errors in src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts"}}