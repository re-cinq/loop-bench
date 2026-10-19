The DoD facets are all checked (`[x]`). The CI failures were lint errors from missing spec links — all three facets were already closed by the previous round. This round fixed the 4 ESLint errors: 3 missing spec links and 1 double-expect. All 8 tests pass and the branch is pushed.

0 regressions — the tests I wrote were mine (new `accumulateUsage` split tests replacing the double-expect one).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint: spec links for accumulateUsage tests and split double-expect","tdd_next":"acceptance green"}}