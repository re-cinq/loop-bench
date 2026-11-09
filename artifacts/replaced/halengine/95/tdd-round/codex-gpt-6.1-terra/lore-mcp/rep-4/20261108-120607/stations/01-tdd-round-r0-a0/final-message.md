Implemented and pushed the non-Error rejection handling. `onError` receives an `Error` with the original value as its `cause`, while the caller receives the original rejection. The changelog and spec now describe the behavior.

The focused test passed after failing as expected. One red test was mine; no regressions were reported, though Lore could not find a CI record for this branch. Existing Error-instance tests and acceptance tests remain for CI.

No unrelated smells were identified. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"wrap non-Error rejections for onError and document the change","tdd_next":"confirm existing Error-instance tests remain green in CI"}}