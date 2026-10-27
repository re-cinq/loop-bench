Added one acceptance test for the `beforeSession` failure path and linked the spec guarantee to it. The test fails for the reported behavior: **“`calls: []`”**—the caller receives the original error, but `onError` and `afterSession` do not run.

Formatted the changed files, ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`, and committed and pushed as `18cf190`. `origin/main` was already merged, and the branch is clean and up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}