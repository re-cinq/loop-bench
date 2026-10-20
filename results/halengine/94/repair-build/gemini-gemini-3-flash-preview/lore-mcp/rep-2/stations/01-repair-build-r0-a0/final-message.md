I have resolved the build failures by fixing the type and lint errors in the acceptance test and updating the corresponding documentation.

1.  **Fixed Type Error**: The `PromptBuilder` instantiation in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` was using incorrect property names (`baseSystemPrompt`, `systemPromptSuffix`, `contextConfig`). I updated it to use `identity` and `responseGuidelines`, which match the `PromptBuilderConfig` interface.
2.  **Fixed ESLint Error**: The test was failing the `re-lint/max-expects` rule due to having three `expect` calls. I refactored the test to capture the rejection as a value using an `outcomeOf` helper and combined all assertions into a single `toEqual` call on a results object, following the project's established testing patterns.
3.  **Updated Specification**: I updated the validation link in `specs/hal-engine-config-hooks/spec.md` to point to the new line number of the assertion in the acceptance test.
4.  **Verification**: I ran both the new acceptance test and the existing orchestrator tests locally, and all 25 tests passed successfully.
5.  **Deployment**: I have committed the changes and pushed them to the branch. The branch was also merged with `origin/main` to ensure it is up-to-date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed type error in PromptBuilder config and combined multiple expect calls to satisfy ESLint max-expects in the beforeSession acceptance test."}}