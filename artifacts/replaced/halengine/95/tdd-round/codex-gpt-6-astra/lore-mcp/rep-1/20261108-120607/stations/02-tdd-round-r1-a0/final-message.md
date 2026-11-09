Committed and pushed `07b4fca`. Completed one red-green-refactor round: null-prototype rejections now preserve their cause and caller identity. Repaired all reported CI findings.

Targeted file: 2 tests pass; 1 new test was red, 0 regressions observed. Branch is current with main and upstream. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve null-prototype rejections and repair reported CI findings","tdd_next":"Pin plain-object and undefined cause identity; confirm existing Error tests through CI"}}