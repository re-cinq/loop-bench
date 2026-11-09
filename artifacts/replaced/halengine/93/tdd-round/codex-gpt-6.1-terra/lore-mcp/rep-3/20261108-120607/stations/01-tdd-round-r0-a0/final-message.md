Implemented and pushed usage accumulation across provider calls. The new test passed after first failing on the previous final-call-only behavior. One red test was mine; no regressions were reported, though Lore could not retrieve CI’s verdict for the branch.

The Jest test-list command does not currently expose stamped spec anchors as descriptor `spec` fields; I added that as an unchecked facet. The next round can address the public total-usage contract. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum reported token usage across provider rounds","tdd_next":"Make the public hook usage contract explicitly identify the turn total"}}