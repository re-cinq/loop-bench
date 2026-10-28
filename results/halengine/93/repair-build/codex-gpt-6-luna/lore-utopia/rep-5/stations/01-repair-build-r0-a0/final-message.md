Fixed all four eslint findings and pushed commit `ebce4c4`. The helper tests now link to the relevant spec statements, and the two undefined-side cases use one assertion. Formatted both changed files; `origin/main` was already merged, and the branch is clean and even with its upstream.

I did not run eslint locally, as instructed. CI will judge the pushed fix.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Added spec links to usage helper tests and combined assertions to clear the reported eslint findings"}}