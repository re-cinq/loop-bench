Committed and pushed `c67b8c1`; branch is current with main and upstream.

One new test went red → green. Non-`Error` rejections now reach `onError` with their original cause; caller values remain unchanged.

Regressions: none observed; CI unavailable. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize non-Error rejections for onError while preserving cause and caller value","tdd_next":"Pin object and undefined causes; confirm existing Error tests through CI"}}