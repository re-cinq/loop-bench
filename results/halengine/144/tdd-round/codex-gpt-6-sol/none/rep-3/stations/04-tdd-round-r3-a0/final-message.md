Committed and pushed the four CI lint repairs in `35433bc`. The branch is up to date with `main` and its upstream. No tests ran locally; CI will judge the push. Red tests: 0 written this round, 0 regressions reported.

The ticket and `.lore/dod.md` disagree on frame names and missing-store behavior; I left that discrepancy outside this lint repair.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI lint findings in validator dispatch and socket teardown","tdd_next":"acceptance green"}}