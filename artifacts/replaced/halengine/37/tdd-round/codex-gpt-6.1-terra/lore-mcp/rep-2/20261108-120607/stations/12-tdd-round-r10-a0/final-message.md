Committed and pushed the validator import and error-path repair in `1539ac1`. The branch is up to date with `origin/main` and its upstream.

The new focused test passed. CI’s previous verdict reported one red test from the ticket’s branch and zero pre-existing regressions; CI will judge the acceptance tests and build checks on this push. The broader unit tests and documentation remain for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported validator type imports and legacy error paths in rejection logs","tdd_next":"Remaining unit tests, spec links, and documentation"}}