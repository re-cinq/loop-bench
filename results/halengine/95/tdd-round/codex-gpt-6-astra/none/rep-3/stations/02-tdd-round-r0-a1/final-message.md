Committed and pushed `5f02290`; branch is clean and current with `main`.

One new test failed as expected, then passed. Non-`Error` rejections now reach `onError` with their original cause. No regressions observed; CI remains unverified because Lore tools were unavailable. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving the caller rejection","tdd_next":"Pin object and undefined causes; confirm existing Error tests through CI"}}