I have completed the TDD round for ticket #3768.

In this round, I addressed the CI regression `TypeError: Response body object should not be disturbed or locked` in `packages/server/src/unstable-core-do-not-import/stream/jsonl.test.ts`. I identified that this was caused by the server handler being called multiple times for the same `ReadableStream` instance, which is not allowed. I modified `serverResourceForStream` to be robust against multiple requests, ensuring it only attempts to use the stream once.

Additionally, I finalized the `localLink` implementation by:
1. Running the `codegen-entrypoints` script, which correctly added `localLink` to the `@trpc/client` package exports in `package.json` (a facet that was checked in the DOD but not fully completed).
2. Adding a unit test case for `onError` in `packages/client/src/links/localLink.test.ts` and verifying that it passes along with the existing tests.

I have staged, committed, and pushed these changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed regression in jsonl.test.ts and finalized localLink exports","tdd_next":"acceptance green"}}