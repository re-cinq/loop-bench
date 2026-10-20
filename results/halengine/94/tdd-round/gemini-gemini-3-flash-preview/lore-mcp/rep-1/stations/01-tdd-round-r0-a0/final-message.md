I have completed the red-green-refactor round for ticket #94.

### Research and Reproduction
I identified that the `beforeSession` hook was being called outside the `try-catch-finally` block in `ChatOrchestrator`, which prevented `onError` and `afterSession` from firing when `beforeSession` threw an error. I reproduced this behavior using the existing acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, which failed as expected.

### Implementation
I moved the `beforeSession` call inside the `try` block in `src/orchestration/chatOrchestrator.ts`. This ensures that any error thrown during session initialization is caught by the orchestrator's error handling logic, triggering `onError` and the `afterSession` cleanup hook.

### Verification
I verified the fix by running the acceptance test again, and it passed successfully. I also verified that the specification links in `specs/hal-engine-config-hooks/spec.md` correctly point to the test.

### Documentation
- Updated `specs/hal-engine-config-hooks/spec.md` to move the `beforeSession` error handling guarantee from the "out of scope" section to the "Installing hooks through config" section.
- Added an entry to `CHANGELOG.md` under `[Unreleased]` -> `Changed` describing the fix and its implications for resource management.
- Marked all facets as complete in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block","tdd_next":"acceptance green"}}