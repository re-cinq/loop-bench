I have completed the single `red-green-refactor` round by:
1. Writing a unit test in `src/orchestration/chatOrchestrator.test.ts` that asserts `onError` and `afterSession` run when `beforeSession` throws.
2. Making the smallest code change by moving `if (hooks?.beforeSession) await hooks.beforeSession(session);` into the `try` block in `src/orchestration/chatOrchestrator.ts`, which successfully passed both the unit test and the acceptance test `chatOrchestrator.beforeSession.acceptance.test.ts`.
3. Updating `.lore/dod.md` to check off the first facet.
4. Committing and pushing the branch cleanly.

No regressions were caused, and no unrelated smells were addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts.","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession."}}