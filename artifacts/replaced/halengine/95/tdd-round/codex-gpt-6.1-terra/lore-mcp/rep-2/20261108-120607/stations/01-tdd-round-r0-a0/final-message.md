Implemented and pushed commit `6013357`. Non-Error rejections now reach `onError` as an `Error` with the original value as `cause`; the caller still receives the original rejection. The changelog and spec were updated.

The one new test failed before the change and passed afterward. That was **1 red test from this round and 0 identified regressions**. The CI lookup could not find the branch, so CI still needs to verify the acceptance and existing Error-instance tests. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"wrap non-Error rejections for onError and document the consumer change","tdd_next":"confirm existing Error-instance tests remain green in CI"}}