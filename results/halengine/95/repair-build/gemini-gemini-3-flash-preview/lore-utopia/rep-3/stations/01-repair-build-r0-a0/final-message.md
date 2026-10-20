I fixed a lint error in `src/orchestration/onErrorNonError.acceptance.test.ts` that was causing the build to fail. The error `re-lint/no-nondeterministic-tests` was triggered by the use of `new Date()` in a test helper, which I replaced with a fixed ISO timestamp string.

I verified that `src/orchestration/chatOrchestrator.ts` correctly implements the core requirement: caught non-`Error` rejections are now wrapped in an `Error` instance with the original value preserved as the `cause`, ensuring `hooks.onError` is called while the original rejection is still re-thrown to the caller. I also confirmed that `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md` correctly reflect this change.

I ran both `src/orchestration/onErrorNonError.acceptance.test.ts` and `src/orchestration/chatOrchestrator.test.ts` locally, and they passed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced non-deterministic new Date() with a fixed timestamp in acceptance tests to satisfy linting rules."}}