Committed and pushed one round: static tool schemas now compile at registration, and invalid schemas fail with the tool name. The new focused test failed before the change and passed afterward. I did not run acceptance tests; this round observed one red test of my own and no regressions. The branch is up to date with `origin/main` and fully pushed.

The next facet is caching validators for function-valued definitions by schema object.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static tool schemas at registration","tdd_next":"Cache function-valued definition schemas by object reference"}}