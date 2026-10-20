I have fixed the lint error in `src/orchestration/onErrorNonError.acceptance.test.ts` where `new Date()` was being used in a test, causing a non-deterministic test failure in CI (`re-lint/no-nondeterministic-tests`). I replaced it with a fixed ISO timestamp.

I verified that:
- The unit tests in `src/orchestration/chatOrchestrator.test.ts` pass (26 tests).
- The spec links in `specs/hal-engine-config-hooks/spec.md` correctly point to the current line numbers in `src/orchestration/onErrorNonError.acceptance.test.ts`.
- The CHANGELOG already contains the necessary entry for this ticket.
- The implementation in `chatOrchestrator.ts` correctly wraps non-`Error` rejections.

I did not run the acceptance tests locally as they are reserved for CI, but the unit tests that cover similar logic passed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed lint error in acceptance test","tdd_next":"acceptance green"}}