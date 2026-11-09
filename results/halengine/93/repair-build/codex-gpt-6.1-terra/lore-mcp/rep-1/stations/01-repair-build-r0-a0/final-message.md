Fixed and pushed the four reported lint findings in commit `337da48`. The spec links to the three usage helper tests, and the test for an undefined operand now uses one assertion while checking both cases.

Prettier and `git diff --check` passed. The linter was not run locally, as instructed; CI must confirm the repair. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Added missing spec links and combined the usage helper test assertions"}}