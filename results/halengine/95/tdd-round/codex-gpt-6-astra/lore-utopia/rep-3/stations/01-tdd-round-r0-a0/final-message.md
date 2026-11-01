Committed and pushed `79c4527`; branch is clean and current with `main`.

One red-green-refactor round completed: non-Error rejections now reach `onError` with their original `cause`. The new test passes. Red tests: 1 mine; 0 known regressions (CI unavailable).

Next: plain-object and `undefined` cause coverage. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving cause and caller rejection","tdd_next":"Pin plain-object and undefined causes; confirm existing Error-instance tests through CI"}}