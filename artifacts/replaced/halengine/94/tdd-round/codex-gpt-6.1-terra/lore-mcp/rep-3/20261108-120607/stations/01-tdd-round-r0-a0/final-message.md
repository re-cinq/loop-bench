Moved `beforeSession` into the orchestrator’s error-handling block and documented the cleanup behavior for consumers. The new focused test passed after first failing as expected.

Committed and pushed `fd46984`; the branch is up to date with `origin/main` and its upstream. Lore could not provide the prior CI verdict, so regression counts are unknown. Locally, one test written this round was red before the fix and is now green. The unrelated `onError` non-`Error` gate and usage accounting remain out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Run error and cleanup hooks when beforeSession throws","tdd_next":"acceptance green"}}