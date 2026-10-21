Consolidated nested required and wrong-type path coverage into one registry test and updated its spec link. The registry test file passed: 7 tests.

The two nested-path CI failures didn’t reproduce in this checkout. I didn’t change implementation code. The duplicate-code lint finding is addressed by removing the duplicated fixture. The graph coverage query was unavailable in this session. No unrelated smells were identified.

Committed and pushed as `4fb6eaf`; the branch is up to date with `origin/main` and its upstream. Red tests written this round: 0; regressions from my changes: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"consolidated nested required and wrong-type path coverage","tdd_next":"remaining registry and orchestrator unit coverage"}}