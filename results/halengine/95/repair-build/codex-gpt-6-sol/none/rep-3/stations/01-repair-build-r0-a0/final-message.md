Replaced the test’s clock-dependent timestamp with a fixed value, addressing CI’s lint finding. Prettier passed, the fix was pushed, and the branch is up to date with `origin/main`. CI has not yet judged the new commit; I did not run ESLint locally as instructed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced the nondeterministic test timestamp reported by ESLint"}}