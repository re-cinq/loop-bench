Committed and pushed the validator resolution and rejection logging repair as `2388b1b`. Rejection logs now include the expected type, and the focused test passed. The branch is up to date with `origin/main` and its upstream.

The CI excerpt named two red test files added by this ticket and no identified regressions; its test output was truncated, so the total number of affected files is unknown. CI will judge the pushed repair.

The next round should address the remaining unit tests, spec links, and documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Include the expected type in rejection logs and repair the reported validator resolution and duplicate setup","tdd_next":"Remaining unit tests, spec links, and documentation"}}