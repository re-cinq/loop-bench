Implemented and pushed the non-Error rejection handling. `onError` receives an `Error` with the original rejection as its cause, while the caller still receives the original value. The changelog and spec are updated.

The new test passed after failing as expected: **1 red test was mine; 0 regressions were reported**. CI results for the previous branch were unavailable, and the acceptance tests were left to CI as requested. The branch is up to date with `main` and its upstream.

One remaining facet is handling values whose string conversion itself throws; it is recorded in the checklist.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving the original rejection","tdd_next":"Handle rejection values whose string conversion throws"}}