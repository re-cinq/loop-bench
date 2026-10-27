Implemented and pushed commit `bd1edd6`. Non-`Error` rejections now reach `onError` as an `Error` with the original value as `cause`; the caller still receives the original rejection.

The one test I wrote failed before the change and passed after refactoring. No regressions were reported, but Lore could not retrieve CI results for this branch (404). I did not run acceptance tests. The existing `Error`-instance checks and changelog entry remain for the next round. The branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"wrap non-Error rejections for onError while preserving the caller rejection","tdd_next":"confirm existing Error-instance tests remain green"}}