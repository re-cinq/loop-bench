I have completed the TDD round for ticket #94.

### Work Done
1.  **Analyzed CI Failures**: Identified regressions in the previous round's push:
    *   **ESLint**: `Unexpected any` in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`.
    *   **Spec-names**: Anchor mismatch between `specs/hal-engine-config-hooks/spec.md` and the acceptance test.
2.  **Fixed ESLint Regression**: Changed the `any` type to `unknown` in the acceptance test.
3.  **Fixed Spec-names Regression**:
    *   Updated the test name to match the spec exactly (removed the `(specs/...)` suffix).
    *   Synchronized the line number anchor in the spec file to point exactly to the `it` statement in the test file (line 35).
4.  **Verified Implementation**: Confirmed that `beforeSession` is correctly moved inside the `try` block in `chatOrchestrator.ts`, ensuring `onError` and `afterSession` run if it throws.
5.  **Documentation**: Verified the `CHANGELOG.md` entry and the new guarantee in `specs/hal-engine-config-hooks/spec.md`.

The build is now ready for CI to judge.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"runs onError and afterSession when beforeSession throws","tdd_next":"acceptance green"}}