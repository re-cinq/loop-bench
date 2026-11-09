Fixed CI’s reported lint finding by using a fixed timestamp in the acceptance test. The change was formatted, committed, and pushed; the branch is up to date with `origin/main` and its upstream.

Lint and typecheck were not run locally as instructed. CI must verify the pushed commit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced the nondeterministic test timestamp with a fixed value"}}
