Implemented and pushed commit `494ddb7`. Non-`Error` rejections now reach `onError` as an `Error` with the original value as its `cause`; the caller still receives the original rejection.

The new focused test passed after the change. It was the one red test in this round; no regression failures were reported, though Lore could not retrieve a CI verdict for the branch. The existing `Error` tests and acceptance tests remain for CI to verify.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Call onError with wrapped non-Error rejections while preserving the original cause and caller rejection","tdd_next":"Confirm existing Error-instance tests remain green in CI"}}