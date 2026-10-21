Completed and pushed commit `e267dea` (`fix(orchestrator): complete onError rejection handling`). The branch is up to date with `origin/main` and its upstream.

The Error identity test I added passed. I also fixed the prior CI findings in the test timestamp and spec links, added the changelog entry, and ticked the remaining facets. No red tests were reported: **0 of mine, 0 regressions**. I couldn’t query coverage because `lore-query-trace` wasn’t available. No acceptance tests or broader checks were run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Confirm Error-instance handling and document the consumer-visible change","tdd_next":"acceptance green"}}