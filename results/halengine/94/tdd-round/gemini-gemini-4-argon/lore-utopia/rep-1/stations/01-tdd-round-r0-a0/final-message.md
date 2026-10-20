Completed the TDD round for Ticket #94:
- **Red**: Added `runs onError then afterSession when it throws, and still rejects to the caller` in `src/orchestration/chatOrchestrator.test.ts` (1 red test — mine; 0 regressions).
- **Green**: Moved `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts`.
- **Refactor & Traceability**: Documented the guarantee in `specs/hal-engine-config-hooks/spec.md`, repointed spec anchors, added the `CHANGELOG.md` entry, updated `.lore/dod.md`, and pushed to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts, update spec and CHANGELOG","tdd_next":"acceptance green"}}