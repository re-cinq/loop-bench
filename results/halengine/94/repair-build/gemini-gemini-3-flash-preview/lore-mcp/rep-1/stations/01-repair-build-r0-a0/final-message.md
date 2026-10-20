I have fixed the CI failures by addressing both the `typecheck` and `eslint` errors in the acceptance test file.

### Summary of Changes
1.  **Fixed Typecheck Failure**: Updated the `PromptBuilder` constructor in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` to use the correct `PromptBuilderConfig` fields (`identity` and `domainContext`) instead of the non-existent `baseSystemPrompt` and `systemPromptSuffix`.
2.  **Fixed ESLint Failure**: Consolidated the three `expect` calls in the test into a single `toEqual` assertion on a result object, satisfying the `re-lint/max-expects` rule which limits tests to one expectation.
3.  **Updated Spec Anchors**: Ran the project's spec-naming utility to repoint the validation anchor in `specs/hal-engine-config-hooks/spec.md`, which had drifted due to the changes in the test file.
4.  **Verified Fix**: Manually ran the failing test using the project's test scripts to confirm it passes.

I have pushed these changes to the branch and verified it is up to date with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed typecheck and eslint errors in acceptance test and updated spec anchors"}}