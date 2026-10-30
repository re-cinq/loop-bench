Completed and pushed one red-green-refactor round. A new test exposed incorrect escaping of `~` in legacy dotted error paths; the fix passes all 11 tests in `registry.test.ts`. I also repaired both duplicate-code findings from the previous CI verdict and updated the spec links and checklist. The branch is up to date with `origin/main` and its upstream.

Red tests: 1 written this round; regressions: 0. The next round takes the remaining tests and documentation facet. CI will judge the acceptance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair duplicated legacy-validator setup and escape tildes in dotted legacy property paths","tdd_next":"Remaining unit tests, spec links, and documentation updates"}}