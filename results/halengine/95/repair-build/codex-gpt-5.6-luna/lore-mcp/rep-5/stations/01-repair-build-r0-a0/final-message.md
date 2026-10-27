Fixed the CI lint failure by replacing `new Date()` with a deterministic timestamp. Targeted acceptance tests pass (2/2), and changes are pushed. Main was already up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Made the acceptance test timestamp deterministic to satisfy re-lint/no-nondeterministic-tests."}}