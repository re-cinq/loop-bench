Committed and pushed `8a15628`; branch is current with `main` and upstream.

One new test failed as expected, then passed after the fix and formatting. Refactor review needed no further changes. Observed reds: 1 new test, 0 regressions; acceptance and regression tests await CI.

Next: pin object and `undefined` causes. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize non-Error rejections for onError while preserving the original cause and caller rejection","tdd_next":"Pin original cause identity for plain-object and undefined rejections"}}