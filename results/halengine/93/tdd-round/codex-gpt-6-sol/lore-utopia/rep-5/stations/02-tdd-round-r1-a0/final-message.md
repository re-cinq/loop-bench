Committed and pushed the round. The new test failed on reused usage metadata, then passed after the aggregator captured each round’s values. I also fixed the CI spec-link and changelog findings. The branch is up to date with `main` and has no unpushed commits; CI will judge the acceptance tests.

Red tests: 1 written this round, 0 regressions. Unrelated smells: none noted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum reported provider usage without retaining a mutable round object","tdd_next":"acceptance green"}}