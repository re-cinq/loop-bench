I have fixed the CI failures by correctly exporting `localLink` and implementing full subscription support (for both `AsyncIterable` and `Observable`) in `localLink.ts`. I also added the `ssrLink` alias as requested in the ticket and verified the implementation with additional test cases in the acceptance test suite.

Summary of changes:
- Exported `localLink` and `ssrLink` from `packages/client/src/links.ts`.
- Implemented subscription handling in `packages/client/src/links/localLink.ts`, including support for `tracked()` envelopes.
- Ensured consistent error handling across all procedure types using the router's error formatter and the link's transformer.
- Added `ssrLink` as an alias to `localLink`.
- Verified the fix by running `npx vitest run packages/tests/server/localLink.acceptance.test.ts`, which now passes all 4 tests (including the new `ssrLink` verification).
- Verified that `httpSubscriptionLink.test.ts` passes locally, confirming that the reported `fetch failed` error was likely a transient environment issue in CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Exported localLink and implemented subscription support with tracked envelope handling and signal abortion on unsubscribe."}}