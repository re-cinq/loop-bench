Fixed the four reported lint findings by linking the usage tests to the spec and splitting the two-assertion test. Commit `6a54573` is pushed, the branch is up to date with `origin/main`, and the working tree is clean.

Prettier and `git diff --check` passed. The linter was not run locally as instructed; CI will judge the pushed repair.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Added usage test spec links and split the test with two assertions"}}
