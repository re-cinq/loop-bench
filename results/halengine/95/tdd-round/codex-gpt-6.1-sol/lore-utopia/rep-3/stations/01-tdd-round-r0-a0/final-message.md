Committed and pushed `a6fb47b`; branch is current with main and upstream.

One new test went red, then green: non-`Error` rejections now reach `onError` with their cause preserved. Refactor review required no further changes. No regressions reported; acceptance and existing tests remain for CI. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize non-Error rejections for onError while preserving the original rejection","tdd_next":"Confirm existing Error-instance tests remain green through CI"}}