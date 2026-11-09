Fixed and pushed the legacy validator’s required-property path formatting in commit `c376f3b`. The focused test failed before the fix and passed afterward. The branch is up to date with `origin/main` and its upstream.

CI’s previous verdict reported one red test from the preceding round; it did not identify it as a pre-branch regression. This round’s new test was the only locally red test and is now green. The remaining facet is the unit tests and documentation listed in `.lore/dod.md`.

The requested coverage graph was unavailable in this environment. No unrelated changes were made.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize legacy required-property paths before JSON Pointer escaping","tdd_next":"Add remaining unit tests and update tool validation documentation"}}