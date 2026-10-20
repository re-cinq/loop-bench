I moved the `beforeSession` hook call inside the orchestrator's `try` block in `src/orchestration/chatOrchestrator.ts`. This ensures that any error thrown during session initialization is caught by the `onError` hook and followed by the `afterSession` cleanup hook, fulfilling the requirements of ticket #94.

I verified the fix with a new test case in `src/orchestration/chatOrchestrator.beforeSession_repro.test.ts`, which was red before the change and green after. I also updated `specs/hal-engine-config-hooks/spec.md` to document this behavior as a guarantee and added a corresponding entry to the `CHANGELOG.md`.

Summary of changes:
- Modified `src/orchestration/chatOrchestrator.ts` to move `beforeSession` inside the `try` block.
- Updated `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee.
- Added a change record to `CHANGELOG.md`.
- Added a reproduction test case `src/orchestration/chatOrchestrator.beforeSession_repro.test.ts`.
- Updated `.lore/dod.md` to mark all facets as complete.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"runs onError and afterSession when beforeSession throws","tdd_next":"acceptance green"}}