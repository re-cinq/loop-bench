Fixed and pushed commit `5e940f1`.

Replaced the wall-clock timestamp in the acceptance test with a fixed ISO timestamp. Prettier and `git diff --check` passed; branch is synchronized with its upstream and `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Acceptance test used a nondeterministic new Date() timestamp"}}