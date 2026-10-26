Implemented and pushed commit `7561ac2`.

- Aggregates usage across provider rounds.
- Adds `AggregatedUsageMetadata` public type.
- Updates spec, changelog, and DoD.
- Added focused regression test; red before fix, green after.
- No regressions observed; acceptance suite not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregate usage across rounds and document the new contract","tdd_next":"preserve the unchanged no-tool regression guard, then acceptance green"}}