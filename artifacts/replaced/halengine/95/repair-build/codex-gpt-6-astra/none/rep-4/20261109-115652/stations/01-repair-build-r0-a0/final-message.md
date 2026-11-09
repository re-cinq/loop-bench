Replaced the nondeterministic timestamp with a fixed value and formatted the file. Committed and pushed `74bd285`; branch is current with `main` and upstream.

Lint/build were not rerun, as instructed. CI will validate the fix.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced new Date() in the acceptance test with a fixed timestamp to address the reported lint error"}}