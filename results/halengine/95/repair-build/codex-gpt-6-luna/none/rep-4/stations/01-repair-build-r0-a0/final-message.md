Replaced `new Date()` in the acceptance test with a fixed timestamp. Prettier left the file unchanged. I did not rerun the linter or tests; CI’s reported lint finding is addressed. The commit was pushed, `origin/main` was already merged, and the branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced the nondeterministic acceptance-test timestamp with a fixed value"}}
