Fixed CI’s lone eslint finding by replacing the acceptance fixture’s runtime timestamp with a fixed ISO value. Committed and pushed `a786d80`; branch is merged with current `origin/main` and fully pushed.

No tests ran locally: this was a CI-reported lint repair, and local lint/acceptance runs are prohibited here. Red tests: 0 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI eslint nondeterministic Date finding","tdd_next":"acceptance green"}}