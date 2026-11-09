Moved `beforeSession` inside the orchestrator’s `try`, documented cleanup after a partial allocation, and added a consumer-facing changelog entry. Commit `c01cb6a` was pushed; the branch is up to date with `origin/main` and its upstream.

The new test failed before the change and passed afterward. That was **1 red test written this round and 0 known regressions**. Lore could not find a CI verdict for the branch, and the acceptance test was not run locally.

The test includes a spec anchor, but the repository’s test-list command does not expose a `spec` descriptor field. The separate non-`Error` handling and tool-round usage accounting issues remain out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"route beforeSession failures through error and cleanup hooks","tdd_next":"acceptance green"}}