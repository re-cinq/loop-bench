Committed and pushed `2d0e447`; branch is current with main and upstream.

One red-green-refactor round completed: the new string-rejection test failed, then passed after refactoring. Red tests: 1 mine; 0 regressions observed. Acceptance tests remain for CI.

Next: pin object and `undefined` causes. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize non-Error rejections for onError while preserving cause and caller rejection","tdd_next":"Pin plain-object and undefined causes and unchanged caller rejection"}}