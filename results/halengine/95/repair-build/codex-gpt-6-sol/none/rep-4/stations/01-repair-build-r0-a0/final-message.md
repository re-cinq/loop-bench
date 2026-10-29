Fixed the CI lint finding by replacing the acceptance test’s live timestamp with a fixed value. Prettier and `git diff --check` passed. I committed and pushed the change; the branch is up to date with `origin/main` and its upstream. CI has not judged the new commit yet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced nondeterministic test timestamp with a fixed ISO value"}}