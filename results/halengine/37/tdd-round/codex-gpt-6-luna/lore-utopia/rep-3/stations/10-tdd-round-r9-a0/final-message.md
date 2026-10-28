Fixed the two-`expect` lint failure and updated the shifted spec links. The targeted `registry.test.ts` passed; I made no new test this round. Commit `a005ef9` is pushed, and the branch is up to date with `origin/main` and its upstream.

The round brief’s test failure details were truncated, and Lore returned 404 for this branch, so I can’t determine whether CI reported failing tests or distinguish ours from regressions. Unrelated issue noticed: the broader unchecked facet still includes the orchestrator retry test and documentation updates; I left those untouched.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the reported registry test lint finding","tdd_next":"Complete remaining unit tests, orchestrator retry coverage, and documentation updates"}}