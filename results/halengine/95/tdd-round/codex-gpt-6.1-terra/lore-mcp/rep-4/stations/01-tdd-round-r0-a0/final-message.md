Implemented and pushed the non-Error rejection handling in commit `9baeec3`. The hook receives an `Error` with the original value as its cause, and the caller receives the original rejection.

The new focused test passed after initially failing as expected: **1 red test was mine; 0 regressions were reported**. CI’s prior verdict was unavailable for this branch, and acceptance tests were not run locally. The branch is up to date with `origin/main` and its upstream.

The remaining facets are CI confirmation of the existing Error-instance tests and the changelog entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce non-Error rejections for onError while preserving the original cause and caller rejection","tdd_next":"Confirm existing Error-instance tests and add the changelog entry"}}