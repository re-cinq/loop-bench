Fixed the CI-reported descriptor test: it now imports the real module, and the focused test passes. Committed and pushed as `90bee4f`; the branch is up to date with `origin/main` and its upstream.

This was a CI repair, not a full red-green-refactor round: I rewrote an existing test and did not write a new failing test. The prior CI verdict reported **0 red tests and 1 lint failure**; there were no reported test regressions. CI will judge the push.

The next facet is to make the public hook usage type explicitly identify the turn total.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix the descriptor test to exercise the real module","tdd_next":"Make the public hook usage contract explicitly identify the turn total"}}