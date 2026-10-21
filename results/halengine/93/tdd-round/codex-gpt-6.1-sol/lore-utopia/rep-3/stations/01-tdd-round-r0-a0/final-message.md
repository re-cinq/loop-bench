Committed and pushed `39b4dbf`. Usage now sums across provider rounds and preserves missing usage. One new test passed after refactoring; acceptance tests were left to CI.

Initial red: one new test file; no regressions observed. CI and coverage queries returned HTTP 403. No unrelated smells identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum reported token fields while preserving undefined for unreported turns","tdd_next":"Make the public hook type explicitly describe total-turn usage"}}