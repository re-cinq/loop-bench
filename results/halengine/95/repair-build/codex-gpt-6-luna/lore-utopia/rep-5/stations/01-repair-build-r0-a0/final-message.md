Fixed the ESLint finding by replacing the test’s runtime timestamp with a fixed value. Prettier left the file unchanged. I did not rerun the linter; CI reported the specific finding and the ticket instructions say to fix it from the annotation.

Committed and pushed as `dd29650`. `origin/main` was already merged, and the branch is clean and up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Fixed the annotated nondeterministic timestamp and pushed it; the new CI build has not yet reported whether the lint check passes."}}