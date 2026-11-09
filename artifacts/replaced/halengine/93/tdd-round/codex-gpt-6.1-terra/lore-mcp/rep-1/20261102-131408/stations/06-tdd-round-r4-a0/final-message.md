Fixed the CI lint finding in the usage test and pushed commit `84356ff`. The branch is up to date with `origin/main` and its upstream.

No tests were run locally: this round repaired an existing test without adding one. The previous CI verdict reported no red tests—zero from this round and zero regressions. Lore’s coverage query returned HTTP 403, so coverage information was unavailable.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI early-return lint finding in usage test","tdd_next":"acceptance green"}}