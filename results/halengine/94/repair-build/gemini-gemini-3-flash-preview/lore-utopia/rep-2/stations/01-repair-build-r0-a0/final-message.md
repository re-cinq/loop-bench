I have resolved the red build by fixing the `typecheck` and `eslint` failures in the acceptance test.

### Summary of Changes
- **Fixed Type Error:** Updated the `PromptBuilder` configuration in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` to use the correct `identity` and `domainContext` fields, as `baseSystemPrompt` and `systemPromptSuffix` were not valid properties of `PromptBuilderConfig`.
- **Fixed ESLint Failure:** Refactored the test case in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` to use a single `expect` call by combining the assertion into one object check. This satisfies the `re-lint/max-expects` rule which limits tests to a single expectation.
- **Updated Specification:** Updated the line number reference in `specs/hal-engine-config-hooks/spec.md` to point to the new location of the validated test in the acceptance test file.
- **Verified Implementation:** Confirmed that `beforeSession` is correctly called inside the `try` block in `src/orchestration/chatOrchestrator.ts`, ensuring `onError` and `afterSession` run even if `beforeSession` throws.
- **Local Validation:** Both the unit tests (`src/orchestration/chatOrchestrator.test.ts`) and the acceptance test now pass locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed type error in PromptBuilder config and combined expect calls in acceptance test to satisfy lint rules."}}