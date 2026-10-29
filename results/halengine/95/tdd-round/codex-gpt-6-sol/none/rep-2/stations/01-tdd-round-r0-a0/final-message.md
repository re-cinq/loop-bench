Committed and pushed the round. The new string rejection test failed before the fix and passed afterward; `onError` now receives an `Error` with the original rejection as its `cause`, while the caller receives the original value. I updated the spec link, changelog, and checklist.

Red tests this round: **1 written here, 0 regressions**. Acceptance and existing `Error` tests await CI. The coverage graph tool was unavailable; no unrelated smells were changed. The branch is up to date with `main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce non-Error rejections for onError while preserving the caller rejection","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}