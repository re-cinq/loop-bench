Fixed the CI lint finding by replacing the forbidden mock-provider import with a local `AIProvider` stub. Updated the spec link and pushed commit `be5a2b4`; the branch is up to date with `origin/main` and its upstream.

No tests were run locally: this round repaired an existing test, and the instructions permit running only a test written in the current round. The reported CI verdict contained no red tests: 0 were ours and 0 were regressions. The existing Error-instance tests remain for CI to confirm. No unrelated smells were addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Remove the forbidden provider-layer import from the rejection conversion test","tdd_next":"Confirm existing Error-instance behavior and acceptance tests"}}