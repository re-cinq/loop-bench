Committed and pushed `f76572e`. Non-Error rejections now reach `onError` with their original cause; caller rejections stay unchanged.

One new test failed, then passed after the fix and refactor. Zero regressions observed; acceptance and existing-test confirmation remain with CI. No unrelated smells identified. Branch is current with main and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize non-Error rejections for onError while preserving the original rejection","tdd_next":"Confirm existing Error-instance tests and acceptance tests through CI"}}