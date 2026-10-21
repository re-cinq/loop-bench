Committed and pushed `c281bb2`; the branch is clean and matches `origin/loop-bench/37`. `origin/main` was already merged.

The new per-call schema test passed. This round had **1 red test of mine** before correction and repaired **1 CI regression** from the prior round. I did not run acceptance tests, lint, or typecheck. The branch DoD now marks static compilation and dynamic schema caching complete.

Next: add the remaining unit tests and finish the documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Static schema compilation and per-call dynamic schema caching","tdd_next":"Complete the remaining unit tests and documentation updates"}}