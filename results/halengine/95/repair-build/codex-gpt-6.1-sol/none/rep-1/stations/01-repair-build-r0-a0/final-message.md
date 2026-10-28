Replaced the nondeterministic timestamp with a fixed value. Prettier passed. Pushed `6106a82`; branch is current with `main` and upstream, with a clean working tree. Lint was not rerun, as instructed; CI must confirm.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced new Date() in the acceptance test fixture with a fixed timestamp to address the reported lint error"}}