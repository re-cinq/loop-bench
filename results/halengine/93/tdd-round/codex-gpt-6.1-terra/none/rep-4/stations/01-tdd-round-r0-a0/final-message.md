Implemented and pushed usage summation across provider rounds, including rounds with missing usage. The focused test failed before the change and passed afterward; one red test was mine, and no regressions were observed in the test run. Acceptance tests remain for CI.

The branch is up to date with `origin/main` and its upstream. The Lore graph and CI verdict tools were unavailable, so existing coverage and the previous CI verdict could not be checked. The repository’s test-list script also does not emit a `spec` descriptor field; the new test has a spec anchor comment and a linked spec statement, but the descriptor is not established.

Next facet: make the public hook type explicitly describe total usage.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum reported token fields across provider rounds","tdd_next":"Make the public hook type explicitly describe total usage"}}