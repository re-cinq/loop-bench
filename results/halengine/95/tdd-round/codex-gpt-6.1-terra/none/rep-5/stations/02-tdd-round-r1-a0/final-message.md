Repaired the four reported CI findings and pushed commit `01eb453`. The cause-preservation test passes locally; CI will verify the acceptance tests and existing Error-instance checks. The branch is up to date with `origin/main` and its upstream.

The previous CI verdict reported no red tests: **0 ours, 0 regressions**. No unrelated smells were addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair reported lint and spec-link findings","tdd_next":"confirm existing Error-instance tests through CI"}}