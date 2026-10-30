Replaced the nondeterministic `new Date()` test fixture with a fixed ISO timestamp. Prettier passed, the commit was pushed, and the branch is current with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"The acceptance test used a nondeterministic timestamp that violated the ESLint repeatability rule"}}