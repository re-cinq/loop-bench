Committed and pushed `58a6113` (`Fix turn usage metadata CI errors`); the branch is up to date with its upstream and `origin/main`.

The fix uses `TurnUsageMetadata` consistently in the orchestrator and addresses both ESLint findings. The `turnUsageType.test.ts` test passed. I did not run the acceptance tests or the full test job. The CI brief’s test failure was truncated before its failing assertion, so that failure remains unresolved. The lore trace query tool was unavailable.

This round wrote no new red test: **0 tests written this round; 0 regressions identified**. I could not confirm that CI is green. I also did not update `.lore/dod.md`, since its facets were already ticked and this round closed no new facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI type and eslint findings","tdd_next":"resolve the CI test failure from its complete report"}}