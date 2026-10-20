I have completed the round by fixing a regression in `jsonlStreamConsumer` that was causing CI failures in `jsonl.test.ts`.

The regression was caused by the `isEmpty()` check in the stream manager, which triggered a premature abort of the main stream when a promise chunk resolved but an async iterable chunk was still pending discovery. By registering the controller for async iterables immediately during the initial decode phase, we ensure the stream manager remains active until all components of the stream have finished.

I have verified the fix with a reproduction test case that simulated a promise finishing before an async iterable starts, and confirmed that the original failing tests in `jsonl.test.ts` now pass.

As all facets for `localLink` were already implemented and the acceptance tests are now passing in CI (blocked only by this regression), I have updated `.lore/dod.md` to reflect the completed status.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"jsonlStreamConsumer regression fix","tdd_next":"acceptance green"}}