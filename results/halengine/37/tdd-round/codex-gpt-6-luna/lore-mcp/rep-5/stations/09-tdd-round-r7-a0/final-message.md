Committed and pushed `6daeac0` (`Test enum tool input validation`). The branch is up to date with its upstream, and `origin/main` merged cleanly.

Added focused enum rejection coverage, updated the validation spec links, and recorded the facet in `.lore/dod.md`. The registry test file passed: 8 tests. The prior CI report’s missing spec link is now addressed. Lore could not retrieve CI failures for this branch.

No implementation code changed this round, so the added behavior test was already green; there was no initial red test. Regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject values outside a declared enum in registry input validation","tdd_next":"Remaining registry tests, spec links, and documentation"}}