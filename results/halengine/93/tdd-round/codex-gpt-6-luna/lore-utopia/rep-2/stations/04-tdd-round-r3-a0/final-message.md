The CI lint duplication is fixed in commit `26f3770` and pushed. `origin/main` was already merged, and the branch is clean and even with its upstream.

No test ran: this repair round added no test, and the prior round’s tests were outside the permitted test scope. The Lore coverage query was denied because its token lacks read scope. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the duplicate-code lint finding in usage tests","tdd_next":"acceptance green"}}