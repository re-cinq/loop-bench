Added a focused test for function-valued tool definitions whose schema changes between calls. The registry test file passed (7 tests). I also fixed the listed ESLint findings and added their spec links.

Committed and pushed as `81c591f`; the branch is up to date with `origin/main` and not ahead of its upstream. The supplied CI test log was truncated, and Lore could not retrieve more detail. No regressions were identified in this round; I wrote one new test.

Unrelated smells noticed: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Changing schemas returned by a function-valued tool definition","tdd_next":"Remaining registry tests, spec links, and documentation"}}