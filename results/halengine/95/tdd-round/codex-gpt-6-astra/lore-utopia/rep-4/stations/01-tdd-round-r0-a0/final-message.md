Pushed one red-green-refactor round. Non-`Error` rejections now reach `onError` with their original `cause`; callers retain the original rejection.

One new test failed, then passed. No regressions observed; acceptance and existing tests await CI. Branch is clean, pushed, and current with `main`. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize non-Error rejections for onError while preserving cause and caller value","tdd_next":"Verify object and undefined causes and existing Error behavior against CI"}}