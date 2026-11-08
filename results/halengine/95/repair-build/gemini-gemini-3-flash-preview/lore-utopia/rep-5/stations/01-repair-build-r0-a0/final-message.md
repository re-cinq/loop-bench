I have fixed the red build for ticket #95.

The CI failure was caused by an ESLint error in the newly added acceptance test file `src/orchestration/onErrorNonError.acceptance.test.ts`, which used `new Date()` in a test helper, violating the `re-lint/no-nondeterministic-tests` rule. I replaced it with a fixed ISO timestamp.

I verified the fix by running the test locally, and it passed. I also confirmed that the core implementation in `src/orchestration/chatOrchestrator.ts` correctly wraps non-`Error` rejections in an `Error` instance with the original value as the `cause`, and that both `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md` have been updated to reflect this behavior as required by the ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed non-deterministic timestamp in onErrorNonError.acceptance.test.ts to satisfy ESLint"}}