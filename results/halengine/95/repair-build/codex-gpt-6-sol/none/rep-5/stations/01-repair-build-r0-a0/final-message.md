Fixed the CI lint finding by replacing the test’s live timestamp with a fixed value. Prettier and `git diff --check` passed. The fix is committed and pushed; the branch is up to date with `origin/main` and has no unpushed commits. CI has not yet judged the new commit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced a non-repeatable test timestamp with a fixed value"}}