Replaced the nondeterministic `new Date()` test fixture with a fixed ISO timestamp. Prettier passed, the fix was committed and pushed, and the branch is current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"The acceptance test used a nondeterministic current timestamp, violating re-lint/no-nondeterministic-tests"}