Committed and pushed `0feaf0d`. A `beforeSession` failure now reaches `onError` and `afterSession`, while the original error still reaches the caller. The spec and changelog describe the behavior.

The focused test failed before the implementation change and passed afterward: **1 red test for this round, 0 identified regressions**. The acceptance test was left to CI; Lore returned “branch not found” when asked for the previous CI verdict. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Route beforeSession failures through error and cleanup hooks","tdd_next":"acceptance green"}}