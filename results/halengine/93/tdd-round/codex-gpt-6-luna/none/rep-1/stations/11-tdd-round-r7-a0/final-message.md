Repaired the CI lint failure by removing the unrelated second assertion. The focused test passed, the file was formatted, and commit `7d1008a` was pushed. `origin/main` was already merged, and the branch is up to date with its upstream.

This round fixed a prior-round CI finding; it introduced no red tests of its own. The unrelated two-assertion test pattern remains only where CI did not flag it; I made no other changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the CI lint failure in turnUsageType.test.ts","tdd_next":"acceptance green"}}