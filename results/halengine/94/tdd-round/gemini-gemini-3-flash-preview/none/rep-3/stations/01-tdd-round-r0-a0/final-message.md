I have completed the TDD round for ticket #94.

### Work completed:
- **Research**: Confirmed that `beforeSession` was called outside the `try` block in `src/orchestration/chatOrchestrator.ts`, causing it to bypass `onError` and `afterSession` hooks when it threw an error.
- **Red Phase**: Created a new unit test `src/orchestration/chatOrchestrator.beforeSession.test.ts` that specifically verifies the execution order of `beforeSession`, `onError`, and `afterSession` when `beforeSession` throws. The test failed as expected.
- **Green Phase**: Moved the `beforeSession` hook call inside the `try` block in `src/orchestration/chatOrchestrator.ts`. Verified the fix with the new unit test and ensured no regressions by running the existing `src/orchestration/chatOrchestrator.test.ts` suite.
- **Refactor Phase**:
    - Updated `specs/hal-engine-config-hooks/spec.md` to move the `beforeSession` error handling from "out-of-scope" to a formal guarantee, linked to the new unit test.
    - Added a change entry to `CHANGELOG.md` under the `[Unreleased]` section.
    - Updated `.lore/dod.md` to mark all facets and the acceptance test as complete.
    - Formatted the changed TypeScript files using Prettier and repointed spec anchors using the project's script.

The changes have been committed and pushed to the `loop-bench/94` branch, which is up to date with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"runs onError and afterSession when beforeSession throws","tdd_next":"acceptance green"}}