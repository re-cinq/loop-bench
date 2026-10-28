Committed and pushed `585a2cb`. Non-`Error` rejections now reach `onError` with their original value as `cause`; callers receive the unchanged rejection.

One new test went red, then green. No regressions observed; acceptance and existing tests remain for CI. Branch is synchronized with upstream and main.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize non-Error rejections for onError while preserving cause and caller rejection","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}