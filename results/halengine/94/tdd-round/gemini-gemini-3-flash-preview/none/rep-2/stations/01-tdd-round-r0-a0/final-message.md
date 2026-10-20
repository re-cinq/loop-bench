I have completed the task to move the `beforeSession` hook call inside the `try` block in `chatOrchestrator.ts`, ensuring that `onError` and `afterSession` hooks fire when `beforeSession` throws an error.

### Changes:
- **Code:** Moved the `beforeSession` hook invocation inside the `try` block in `src/orchestration/chatOrchestrator.ts`.
- **Tests:** Verified the fix with the existing acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, which now passes.
- **Documentation:**
    - Updated `specs/hal-engine-config-hooks/spec.md` to move the `beforeSession` guarantee from "Measured semantics — out of scope" to the main hooks section, reflecting it as a new guarantee.
    - Updated line number anchors in `spec.md` for `chatOrchestrator.ts` to account for the code shift.
    - Added a `Changed` entry to `CHANGELOG.md` documenting the behavior change for `beforeSession`.
- **DOD:** Updated `.lore/dod.md` to reflect all facets and the acceptance test as completed.

### Verification:
- Ran `npx vitest` (via `jest` as configured in `package.json`) on the acceptance test, which passed successfully.
- Ran the repository's formatter (`prettier`) on the modified files.
- Attempted to run the re-anchor script, although it skipped the modified spec due to the anchor set change; I manually verified and corrected the anchors.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block and update documentation","tdd_next":"acceptance green"}}