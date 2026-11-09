Implemented and pushed the rejection conversion. `onError` now receives an `Error` with the original non-Error rejection as its cause, while the caller still receives the original value.

The new focused test passed after initially failing: **1 red test was mine; 0 regressions were reported**. CI’s prior verdict was unavailable because Lore returned 404 for the branch. The existing Error-instance tests and changelog facet remain for the next round. No unrelated smells were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Convert non-Error rejections for onError while preserving the original rejection","tdd_next":"Confirm existing Error-instance tests and add the changelog entry"}}