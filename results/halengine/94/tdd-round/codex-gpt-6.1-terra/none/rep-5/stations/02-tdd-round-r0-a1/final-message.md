Moved `beforeSession` into the orchestrator’s protected block, so an `Error` it throws reaches `onError` and `afterSession`. The new cleanup test failed before the change and passed afterward. That was one red test written this round and zero known regressions; CI will judge the acceptance test and remaining checks.

Committed and pushed as `17edfcf`. The branch is up to date with `origin/main` and its upstream. The spec guarantee and changelog facets remain for the next round. The coverage graph tool was unavailable; no unrelated smells were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block","tdd_next":"Update the spec guarantee for beforeSession"}}