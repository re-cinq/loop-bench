Added a focused test for resolving function-valued tool schemas on each call. It passed; the existing implementation already handled this behavior, so no source change was needed. Refreshed the stale spec links and updated the DoD to leave tool-loop recovery and documentation work open.

The first test command ran zero tests because it lacked the repo’s ESM setup; the corrected single-test command passed. CI’s reported spec-anchor issue is fixed; I did not rerun lint. No unrelated smells were changed.

Committed and pushed `2ffd6ec`; `main` was already up to date, and the branch is not ahead of its upstream. Red tests this round: 0; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Function-valued schema resolution coverage","tdd_next":"Tool-loop recovery coverage and remaining documentation updates"}}