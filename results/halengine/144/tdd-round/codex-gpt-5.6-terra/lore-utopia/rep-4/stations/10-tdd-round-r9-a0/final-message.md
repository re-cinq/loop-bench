Resolved the sole CI eslint finding by flattening the socket helper’s nested conditional. Formatted, committed (`584c4b5`), pushed, merged against `origin/main` (already current), and confirmed the branch is synced.

No tests ran locally: this was CI-lint repair only, and acceptance tests were not run. Red tests: 0 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI eslint guard-clause repair","tdd_next":"acceptance green"}}