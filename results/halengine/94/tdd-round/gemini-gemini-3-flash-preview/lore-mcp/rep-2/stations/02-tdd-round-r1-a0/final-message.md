I have fixed the CI failures introduced in the previous round, ensuring the implementation of ticket #94 is fully validated and compliant with the project's standards.

### Changes Made:
- **Fixed Type Errors**: Corrected the `PromptBuilder` initialization in the acceptance test to match the `PromptBuilderConfig` interface (`identity` field).
- **Consolidated Expectations**: Updated both the acceptance test (`chatOrchestrator.beforeSession.acceptance.test.ts`) and the unit test (`chatOrchestrator.test.ts`) to use a single `expect` call with object comparison, satisfying the `re-lint/max-expects` ESLint rule.
- **Established Traceability**: Added a validation link for the new unit test to `specs/hal-engine-config-hooks/spec.md` and manually updated the line numbers for both tests to ensure they are correctly anchored, satisfying the `re-lint/require-spec-link` rule.
- **Formatting**: Applied Prettier formatting to all modified files.
- **DoD Updated**: Ticked the acceptance test facet in `.lore/dod.md`.

### Verification:
- Ran `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` locally: **Passed**.
- Ran the specific test case in `src/orchestration/chatOrchestrator.test.ts`: **Passed**.
- The `beforeSession` hook is correctly invoked inside the `try` block in `chatOrchestrator.ts`, ensuring `onError` and `afterSession` run even if it throws.

The branch is pushed and merged with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"runs onError and afterSession when beforeSession throws","tdd_next":"acceptance green"}}