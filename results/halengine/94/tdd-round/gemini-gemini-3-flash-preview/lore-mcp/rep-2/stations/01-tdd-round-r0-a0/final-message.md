I have moved the `beforeSession` hook call inside the `try` block in `src/orchestration/chatOrchestrator.ts`. This ensures that if the hook throws an error, the `catch` block (calling `onError`) and the `finally` block (calling `afterSession` and saving the session) are correctly executed.

I added a regression test in `src/orchestration/chatOrchestrator.test.ts` to verify this behavior. I also updated `specs/hal-engine-config-hooks/spec.md` to move the `beforeSession` behavior from the "Measured semantics — out of scope" section to the "Installing hooks through config" section, clarifying that a deployer can assume no other hooks or provider interaction occurred if `beforeSession` throws. The `CHANGELOG.md` was updated to reflect this change for existing consumers.

All changes were formatted with Prettier, and `repoint-spec-anchors.mjs` was run to ensure spec links are correct. All unit tests in `src/orchestration/chatOrchestrator.test.ts` passed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"acceptance green"}}