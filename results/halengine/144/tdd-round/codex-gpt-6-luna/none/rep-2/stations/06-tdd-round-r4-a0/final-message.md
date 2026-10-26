Refactored the session list limit check to address the CI lint finding. Commit `762236d` was pushed, and the branch is up to date with `origin/main` and its upstream.

No tests were run: this was a CI repair, with no new test written. The Lore trace query wasn’t available in this session. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Extract the session list limit predicate to satisfy the CI boolean-operator rule","tdd_next":"acceptance green"}}