Committed and pushed `8b6ca88`. Non-`Error` rejections now reach `onError` as an `Error` with the original value as `cause`; the caller still receives the original rejection. The new test failed before the fix and passed after formatting.

This round had **1 red test I wrote and 0 known regressions**. Acceptance tests and the broader CI checks were left for CI. The next facet is confirming the existing `Error` instance behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Call onError for non-Error rejections while preserving the original cause and caller rejection","tdd_next":"Confirm existing Error-instance tests remain green"}}