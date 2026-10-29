Committed and pushed the round. The new test failed before the fix and passed afterward; it covers a rejection that cannot be converted to a string, plus `cause`, caller rejection, and existing `Error` identity. I also fixed CI’s deterministic-date lint finding without changing the acceptance test’s assertions. The branch is up to date with `main` and its upstream.

Red tests this round: **1 mine, 0 regressions**. No unrelated smells were changed. CI will judge the pushed branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"preserve non-coercible rejections while reporting them to onError","tdd_next":"acceptance green"}}