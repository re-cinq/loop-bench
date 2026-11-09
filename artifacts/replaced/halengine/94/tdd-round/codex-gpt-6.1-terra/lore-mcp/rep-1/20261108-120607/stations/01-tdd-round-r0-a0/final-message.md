Moved `beforeSession` into the orchestrator’s error-handling block and documented the cleanup behavior for consumers. The new focused test passed after failing on the original behavior.

The round’s red test count was **1 new test and 0 known regressions**. Lore could not find a CI verdict for the branch, so acceptance remains for CI to judge. The unrelated non-`Error` rejection gate and tool-round usage accounting remain out of scope.

Committed and pushed as `ef20704`; the branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle beforeSession errors and document cleanup behavior","tdd_next":"acceptance green"}}