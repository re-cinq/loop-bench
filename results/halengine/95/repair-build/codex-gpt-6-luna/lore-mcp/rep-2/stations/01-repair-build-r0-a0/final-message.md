Fixed the lint finding by replacing `new Date()` in the acceptance test with a fixed timestamp. Prettier left the file unchanged. I did not rerun lint, as instructed.

Committed and pushed as `a48fa41`. Merging `origin/main` found no changes, and the branch is synced with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced a non-repeatable current timestamp in the acceptance test with a fixed ISO timestamp"}}