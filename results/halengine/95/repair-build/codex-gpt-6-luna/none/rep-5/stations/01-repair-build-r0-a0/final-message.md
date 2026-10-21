Replaced the test’s `new Date()` timestamp with a fixed value, addressing the CI lint finding. Prettier reported the file unchanged. I did not run ESLint, as instructed.

Committed and pushed as `49ad03d`; `origin/main` was already merged, and the branch is up to date with its upstream. CI has not yet judged this commit.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Fixed the reported nondeterministic timestamp and pushed 49ad03d; ESLint was not rerun locally, so the build is not yet confirmed green."}}