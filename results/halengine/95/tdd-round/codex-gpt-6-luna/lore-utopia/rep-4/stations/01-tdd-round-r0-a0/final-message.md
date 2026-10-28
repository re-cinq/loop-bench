Implemented and pushed commit `f894190` for the facet that wraps non-`Error` rejections for `onError`, preserving the original rejection for the caller. The focused test failed before the change and passed afterward; formatting is complete. The branch is up to date with its upstream.

I did not run the acceptance tests. The next round should confirm the existing `Error`-instance tests and add the consumer-facing changelog entry. **Red tests: 1 written by me, 0 regressions reported.**

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving the original rejection","tdd_next":"Confirm existing Error-instance tests and add the changelog entry"}}