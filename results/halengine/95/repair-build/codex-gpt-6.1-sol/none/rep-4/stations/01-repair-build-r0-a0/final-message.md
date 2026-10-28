Fixed the reported lint finding by using a fixed fixture timestamp. Prettier passed. Committed and pushed `390661f`; branch is current with `origin/main` and upstream. CI will verify lint, as instructed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced nondeterministic new Date() in the onError acceptance fixture with a fixed timestamp"}}