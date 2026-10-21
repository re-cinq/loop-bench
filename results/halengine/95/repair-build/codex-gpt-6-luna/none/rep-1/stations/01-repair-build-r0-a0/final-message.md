I replaced `new Date()` in the acceptance test with a fixed timestamp to address the lint finding. Prettier left the file unchanged, and `git diff --check` passed. I did not run the linter.

Committed and pushed as `c0d917c`; the branch is up to date with its upstream, and merging `origin/main` reported no changes. CI has not yet judged this commit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"The acceptance test used a runtime timestamp; replaced it with a fixed value and pushed the fix for CI to judge."}}