Committed and pushed `4e8a67c`. Non-`Error` rejections now reach `onError` with their original cause; caller rejections remain unchanged.

One new test failed, then passed. Zero regressions reported; CI was unavailable. Acceptance tests remain for CI. Branch is current with main and fully pushed.

Next: object and `undefined` cause coverage. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize non-Error rejections for onError while preserving cause and caller rejection","tdd_next":"Pin plain-object and undefined rejection causes and caller identity"}}