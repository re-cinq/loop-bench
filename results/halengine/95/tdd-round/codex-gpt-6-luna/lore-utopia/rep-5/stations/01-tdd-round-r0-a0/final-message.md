Implemented and pushed commit `6b3e788`. The focused test failed before the change and passed after it; the caller still receives the original rejection, and `onError` receives an `Error` with the original value as `cause`.

The implementation facet is checked off. Next: confirm the existing `Error` instance tests remain green. I ran only my test file. The CI lookup returned “branch not found,” so I couldn’t retrieve a CI verdict. Red tests: **1 mine, 0 regressions**. No unrelated smells noted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving the original caller rejection","tdd_next":"Confirm existing Error-instance tests remain green"}}