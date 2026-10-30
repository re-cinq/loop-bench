Fixed and pushed the CI lint failure by replacing the nondeterministic `new Date()` test fixture with a fixed timestamp. Prettier and `git diff --check` passed; branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Acceptance test used a nondeterministic live timestamp"}}