Committed and pushed `aaed530`. Non-`Error` rejections now reach `onError` with their original `cause`; caller rejections remain unchanged.

One new test went red → green and passed after review and formatting. Regressions observed: 0; CI confirmation remains pending. Branch is current with main and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize non-Error rejections for onError while preserving the caller rejection","tdd_next":"Pin undefined rejection preservation and confirm existing Error tests through CI"}}