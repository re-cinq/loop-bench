Implemented and pushed commit `4d0b20d`. The registry test file passed (4 tests); the branch is clean and up to date with its upstream. The previous CI verdict had two ticket-specific test failures, which this round addressed. The main-branch trace showed no existing tests covering the registry, so there were **0 regressions against main**.

Closed the unit coverage facet for rejection paths and unchanged pass-through. Remaining tests and documentation updates are listed in `.lore/dod.md`. I did not run acceptance tests or other CI checks locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Registry unit coverage for rejection paths and unchanged pass-through","tdd_next":"Remaining unit tests and validation documentation updates"}}