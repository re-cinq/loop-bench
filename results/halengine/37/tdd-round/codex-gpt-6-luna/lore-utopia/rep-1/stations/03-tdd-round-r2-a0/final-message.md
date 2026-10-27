Implemented nested required-field path reporting. The test failed first with `city` instead of `/address/city`, then passed after the fix; the executor was not called. Also fixed the prior CI lint and changelog findings.

Committed and pushed as `55a6bbf`; `origin/main` was already merged, and the branch is even with its upstream. One test was red during this round; zero test regressions were reported by the previous CI verdict.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"nested required-field paths in schema rejection messages","tdd_next":"complete the remaining documentation and unit-test facets, including schema compilation and caching"}}