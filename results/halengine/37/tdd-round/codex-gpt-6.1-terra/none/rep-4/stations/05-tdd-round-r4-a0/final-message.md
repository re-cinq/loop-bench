Fixed the two CI findings: nested required-property paths are normalized, and the test’s lint violation is removed. The new focused test failed before the fix and passed afterward. CI’s failed test was written on this branch; it reported **0 regressions**.

Committed and pushed `2162d58`. The branch is up to date with `origin/main` and its upstream. The remaining facet is the unit-test and documentation work in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"normalize nested validation paths and repair CI lint finding","tdd_next":"add remaining unit tests and update documentation"}}