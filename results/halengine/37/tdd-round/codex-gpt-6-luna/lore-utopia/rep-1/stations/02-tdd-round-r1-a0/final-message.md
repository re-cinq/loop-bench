Implemented wrong-type input rejection with safe field/type reporting and no executor call. The new test went red, then green. I also fixed the reported type and lint findings, updated the spec citation and DoD, and committed and pushed `224a8ff`.

The branch is up to date with its upstream and `origin/main`. One red test was mine; zero regressions were observed in the focused run. The prior CI test failure remains unclassified: its details were truncated in the brief, and Lore returned 404 for this branch. I did not run acceptance tests or other checks.

Next facet: static schema compilation and validator caching.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"wrong-type rejection with safe field/type reporting","tdd_next":"static schema compilation and validator caching"}}