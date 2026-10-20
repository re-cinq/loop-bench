I have moved the `beforeSession` hook call inside the orchestrator's `try` block. This ensures that any error thrown by `beforeSession` is correctly caught, triggering the `onError` hook, and that the `afterSession` cleanup hook (and session save) are always executed in the `finally` block.

I verified this change with a new test file `src/orchestration/chatOrchestrator.beforeSession.test.ts`, which confirmed that `onError` and `afterSession` were bypassed before the fix and are now correctly invoked. I also updated `CHANGELOG.md` to document this behavior change and ticked the corresponding facets in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block","tdd_next":"acceptance green"}}