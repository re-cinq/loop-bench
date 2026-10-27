Completed one red–green–refactor round for non-`Error` rejections. The hook now receives an `Error` with the original value in `cause`, while the caller still receives the original rejection. I updated the spec, changelog, and DoD checklist.

The test I added failed before the fix and passed after it. No acceptance or broader tests were run. The commit was pushed, and the branch is even with `origin/loop-bench/95`; merging `origin/main` found no changes. Lore could not return CI failures because it reported the branch was not found.

This round had **1 red test of mine and 0 regressions**. The existing `Error`-instance test facet remains for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce non-Error rejections for onError while preserving the caller rejection","tdd_next":"Confirm existing Error-instance tests remain green"}}