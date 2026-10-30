Replaced the nondeterministic `new Date()` test timestamp with a fixed ISO timestamp. Prettier and `git diff --check` passed. Commit `b625d36` was pushed; the branch is current with `main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"The acceptance test used a nondeterministic current timestamp, now replaced with a fixed value"}}
