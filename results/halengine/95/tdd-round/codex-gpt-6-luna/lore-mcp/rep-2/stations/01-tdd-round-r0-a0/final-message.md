Implemented and pushed commit `3e39855` on `loop-bench/95`. The new focused test passed after the catch path was updated; formatting is complete, and `main` merged cleanly. The branch is synchronized with its upstream.

One test written this round failed in the red phase; **regressions: 0**. Existing `Error` instance tests and acceptance tests were not run, as instructed. CI lookup returned branch-not-found before the push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving the original as cause","tdd_next":"Confirm existing Error-instance tests remain green"}}