Committed and pushed `b034374`. Non-`Error` rejections now reach `onError` with their original cause; caller rejections remain unchanged.

One new test failed, then passed. No regressions observed; acceptance and existing tests await CI. Branch is clean and current with `main`. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize non-Error rejections for onError while preserving original rejections","tdd_next":"Confirm existing Error-instance regression tests remain green in CI"}}