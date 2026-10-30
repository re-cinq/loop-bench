Committed and pushed the round. Registration now rejects an invalid static tool schema with an error naming the tool. The new test failed before the change and passed afterward; no acceptance tests or broader checks were run locally. The branch is up to date with `main` and its upstream.

Red tests: **1 written this round, 0 regressions**. No unrelated issues were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"compile static tool schemas at registration and name the tool on invalid schema","tdd_next":"cache validators for function-valued tool definitions by schema object reference"}}