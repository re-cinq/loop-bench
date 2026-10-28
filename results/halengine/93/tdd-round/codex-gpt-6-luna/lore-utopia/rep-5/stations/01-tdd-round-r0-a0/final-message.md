Implemented and pushed commit `b8027f1`. The hook now receives explicitly named `TotalUsageMetadata` summed across provider rounds; rounds without usage are skipped, and no usage remains `undefined`. Updated the hooks spec and ticked the completed DoD facets.

The test I added failed before the change and passed after it. **Red tests:** 1 written by me, 0 known regressions. I did not run acceptance tests. No unrelated smells noted. The branch is up to date with its upstream and `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Named and summed total usage across provider rounds","tdd_next":"Preserve the unchanged no-tool regression guard, then update the CHANGELOG with the consumer impact"}}