Committed and pushed `1c9cbc3`; the branch is clean and up to date with `origin/main`. The registry test file passed: 12 tests. I fixed the CI annotations and added static invalid-schema registration coverage with a spec link.

The new test passed on its first run because the existing implementation already meets that behavior, so this round did not have a failing RED phase. The prior CI test failure details were truncated, and Lore could not retrieve that verdict for the branch. No acceptance tests were run.

Red tests written this round: 0; regressions: 0. Remaining facet: other registry tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"static invalid-schema registration coverage and reported CI annotation fixes","tdd_next":"remaining registry tests and documentation"}}