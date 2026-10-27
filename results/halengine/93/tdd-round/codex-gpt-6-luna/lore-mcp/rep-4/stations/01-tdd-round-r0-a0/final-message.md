Added and tested `sumUsage` for token counts from reported provider calls. The one test I wrote failed on the missing export, then passed after implementation; zero regressions. I did not run acceptance tests. The hooks still need to use this helper, tracked in `.lore/dod.md`.

Committed and pushed `207fb3b`; the branch is up to date with `origin/main`. Lore returned 404 for CI failures on this branch, so its CI verdict is unknown.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"pure provider usage summation helper","tdd_next":"wire the total into the orchestrator hook and preserve undefined when no calls report usage"}}