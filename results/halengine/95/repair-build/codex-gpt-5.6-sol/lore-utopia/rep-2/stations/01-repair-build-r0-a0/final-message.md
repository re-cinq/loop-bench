Fixed and pushed commit `b59c7e3`.

Replaced the nondeterministic `new Date()` test timestamp with a fixed ISO timestamp. Prettier and `git diff --check` passed; branch is synchronized with its upstream and `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"The acceptance test used a wall-clock timestamp; it now uses a fixed deterministic value."}}