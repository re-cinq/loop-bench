Moved `errorForHook` below its caller to address the CI lint finding, formatted the changed files, and pushed commit `73dcfe7`. The branch is up to date with `origin/main` and its upstream.

No tests were run locally for this ordering-only CI repair. The previous CI verdict reported zero red tests and zero regressions; CI still needs to confirm the existing `Error`-instance tests. No unrelated smells were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI lint finding by moving errorForHook below its caller","tdd_next":"Confirm existing Error-instance tests remain green in CI"}}