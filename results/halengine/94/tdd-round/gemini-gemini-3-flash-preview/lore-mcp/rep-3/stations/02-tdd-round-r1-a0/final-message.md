I have fixed the CI failures reported in the previous round for ticket #94.

### Changes Made
- **Acceptance Test Fixes**:
  - Corrected the `PromptBuilder` instantiation in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` to use the `identity` property, fixing a type error.
  - Refactored the test to use a single `expect` call with `toMatchObject`, satisfying the `re-lint/max-expects` ESLint rule.
- **Spec Citation Updates**:
  - Ran the `spec:names` fix script to update stale line number citations in `specs/hal-engine-architecture/spec.md`, `specs/hal-engine-config-hooks/spec.md`, and `specs/hal-engine-tool-input-validation/spec.md`. This resolves the `re-lint/require-spec-link` and `spec-names` CI failures.
- **Verification**:
  - Confirmed that `beforeSession` is correctly placed inside the `try` block in `src/orchestration/chatOrchestrator.ts`, ensuring that `onError` and `afterSession` hooks fire upon failure.
  - Verified that all spec citations now correctly name and point to their respective tests.

I did not run the acceptance tests locally as they are CI's to run according to the project mandates, and I have addressed all findings listed in the round brief.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"runs onError and afterSession when beforeSession throws","tdd_next":"acceptance green"}}