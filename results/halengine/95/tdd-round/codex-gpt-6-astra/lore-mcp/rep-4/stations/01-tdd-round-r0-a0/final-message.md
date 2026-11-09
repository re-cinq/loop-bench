Committed and pushed `b5ead7b`; branch is clean and current with `main`.

One test went red, then green: string rejections now reach `onError` with their original cause. Caller rejection stays unchanged. No regressions reported; CI was unavailable.

Next: handle rejection values that cannot convert to strings. Recorded in the checklist; no unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving cause and caller rejection","tdd_next":"Handle rejected values that cannot be converted to strings"}}