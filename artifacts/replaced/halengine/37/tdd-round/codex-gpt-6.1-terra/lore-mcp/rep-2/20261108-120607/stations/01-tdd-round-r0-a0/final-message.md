Static tool schemas now compile at registration, and invalid schemas throw an error naming the tool. The new test passed after first failing as expected. The round was committed and pushed; the branch is up to date with its upstream and `origin/main`.

The initial red test was ours: **1**, with **0 known regressions**. Lore could not retrieve a CI verdict for the branch. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static tool schemas at registration","tdd_next":"Cache dynamic schema validators and use validators during execution"}}