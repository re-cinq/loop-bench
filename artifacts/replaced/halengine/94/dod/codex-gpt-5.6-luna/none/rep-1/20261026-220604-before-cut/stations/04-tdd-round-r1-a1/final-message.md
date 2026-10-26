All three CI failures from the round-brief were already fixed in commit `3c1d04a` (pushed):
1. Cross-layer `providers/mock` import replaced with inline stub
2. Two `expect` calls combined into one
3. Spec status downgraded from "Shipped" to "In Progress"

The branch is up to date with `origin/loop-bench/94`. All three DoD facets are ticked. There is nothing left to write — the acceptance test exists, the code fix is in place, and the ESLint issues are resolved.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}