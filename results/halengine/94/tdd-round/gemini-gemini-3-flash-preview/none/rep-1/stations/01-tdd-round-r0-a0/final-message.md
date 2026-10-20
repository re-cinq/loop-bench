I have completed the TDD round for ticket #94.

### Work Completed

1.  **Research & Strategy**: I identified that `beforeSession` was called outside the `try` block in `src/orchestration/chatOrchestrator.ts`, causing `onError` and `afterSession` hooks to be skipped if it threw.
2.  **Red Phase**: Created a reproduction test case that demonstrated `onError` and `afterSession` were not called when `beforeSession` threw. Verified it failed as expected.
3.  **Green Phase**: Moved the `beforeSession` call inside the `try` block in `chatOrchestrator.ts`.
4.  **Verification**: Verified that the reproduction test passed and that all existing unit tests in `src/orchestration/chatOrchestrator.test.ts` remained green. Integrated the new test case into `src/orchestration/chatOrchestrator.test.ts`.
5.  **Documentation**:
    *   Updated `specs/hal-engine-config-hooks/spec.md` to move the `beforeSession` guarantee from "out-of-scope" to the "guaranteed" section, explicitly stating that `afterSession` runs after a failure and that no tools or provider interactions occur on that path.
    *   Added a `Fixed` entry to `CHANGELOG.md` describing the change and its benefits for resource management.
6.  **Cleanup**: Removed the temporary reproduction test file and updated `.lore/dod.md` to mark all facets and the acceptance test as complete.
7.  **Delivery**: Formatted changed files, committed, and pushed the branch to origin. Merged `origin/main` to ensure it is up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"acceptance green"}}