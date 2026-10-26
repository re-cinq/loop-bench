Committed and pushed `481ad4a` to `loop-bench/144`; the branch is up to date with its upstream. The targeted validator test passed (4 tests). I did not run the acceptance suite.

The commit fixes the seven reported lint findings, but the two session-resume failures from the CI brief remain unresolved. The brief lacked enough detail to identify a safe fix, and I did not run those acceptance tests. `lore-query-trace` was unavailable.

Red tests: 0 written this round; 2 reported regressions remain.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair the seven CI-reported lint findings","tdd_next":"resolve the two reported session-resume failures and reach acceptance green"}}