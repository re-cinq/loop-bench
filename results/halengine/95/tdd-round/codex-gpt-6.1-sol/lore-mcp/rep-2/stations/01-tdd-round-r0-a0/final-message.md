Committed and pushed `1d4581f`; branch is current with main and upstream.

One round completed: the new test went red, then green, and passed after refactor review. Non-Error rejections now reach `onError` with their original cause; caller rejection stays unchanged.

Red tests: 1 mine; no regressions observed. Acceptance and regression checks remain for CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize non-Error rejections for onError while preserving the caller rejection","tdd_next":"Pin plain-object and undefined causes; confirm existing Error-instance regressions through CI"}}