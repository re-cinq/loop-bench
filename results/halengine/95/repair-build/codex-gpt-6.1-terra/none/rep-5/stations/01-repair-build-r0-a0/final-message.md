Replaced the acceptance test’s current-time timestamp with a fixed value, addressing the CI lint finding. Formatted the changed file and pushed commit `69ab14a`. The branch is up to date with `origin/main` and its upstream.

The linter was not run locally, per the pod constraints; CI will verify the fix.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced nondeterministic test timestamp with a fixed value"}}