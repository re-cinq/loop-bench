Fixed the CI-reported missing spec link and pushed commit `bda94c3`. The branch is up to date with `origin/main` and its upstream.

No tests ran locally. This repaired a traceability finding; the next facet, making the hook’s total-usage type explicit, remains open because the permitted test runner does not check types. The coverage graph tool was unavailable. CI reported zero red tests written in this round and zero test regressions; its failure was an ESLint finding. No unrelated smells were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Link the missing-usage acceptance test to its spec statement","tdd_next":"Make the public hook type explicitly identify total usage"}}