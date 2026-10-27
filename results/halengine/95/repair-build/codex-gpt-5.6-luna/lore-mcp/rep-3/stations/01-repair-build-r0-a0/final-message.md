Fixed the CI lint failure by replacing `new Date()` with a deterministic timestamp. Prettier passed, changes committed and pushed as `ffd1d8a`; branch is up to date with origin.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced nondeterministic new Date() in the acceptance test with a fixed timestamp"}}